#!/usr/bin/env node

// needed in order to use `const` and `let`
/*eslint strict: "off"*/
'use strict';

const _ = require('lodash');
const exec = require('child_process').exec;

const CLIEngine = require('eslint').CLIEngine;
const Checker = require('jscs');
const configFile = require('jscs/lib/cli-config');

const cli = new CLIEngine({
	configFile: '.eslintrc.yml'
});
const checker = new Checker();
const config = configFile.load('.jscsrc');

checker.registerDefaultRules();
checker.configure(config);

exec('git diff --cached --name-only --diff-filter=ACM', (error, stdout) => {
	if (error !== null) {
		throw error;
	}

	const files = _(stdout.split('\n')).filter((file) => _.endsWith(file, '.js')).value();

	if (files.length === 0) {
		process.exit(0);
	}

	const getEslintReport = function() {
		return new Promise(function(resolve, reject) {
			const report = cli.executeOnFiles(files);
			const formatter = cli.getFormatter();
			const errorReport = CLIEngine.getErrorResults(report.results);

			/*eslint no-magic-numbers: "off"*/
			if (errorReport.length > 0) {
				reject(formatter(report.results));
			} else {
				resolve([]);
			}
		});
	};

	const getJscsReport = function() {
		return new Promise(function(resolve, reject) {
			checker.checkFile(files[0]).then(function(results) {
				const jscsErrors = results.getErrorList();
				const colorizeOutput = true;

				if (jscsErrors.length > 0) {
					jscsErrors.forEach(function(err) {
						reject(results.explainError(err, colorizeOutput));
					});
				} else {
					resolve([]);
				}
			});
		});
	};

	return Promise.all([
		getEslintReport(),
		getJscsReport()
	]).then(function() {
		/*eslint no-console: "off"*/
		console.log('COMMIT SUCCEEDED\n');
	}).catch(function(errors) {
		/*eslint no-console: "off"*/
		console.log(errors);
		console.log('COMMIT FAILED: Your commit contains files that do not pass lint tests. Please fix the errors and try again.\n');

		process.exit(1);
	});
});

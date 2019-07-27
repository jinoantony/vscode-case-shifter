// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-case-shifter" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let subscriptions = context.subscriptions;
	subscriptions.push(vscode.commands.registerCommand('vscode-case-shifter.kebabCase', function () {
		replaceText(kebabCase);
	}));

	subscriptions.push(vscode.commands.registerCommand('vscode-case-shifter.camelCase', function () {
		replaceText(camelCase);
	}));

	subscriptions.push(vscode.commands.registerCommand('vscode-case-shifter.studlyCase', function () {
		replaceText(studlyCase);
	}));

	subscriptions.push(vscode.commands.registerCommand('vscode-case-shifter.snakeCase', function () {
		replaceText(snakeCase);
	}));
	
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

function replaceText(replaceCaseCommand) {
	let editor = vscode.window.activeTextEditor;

	if (editor) {
		let document = editor.document;
		let selection = editor.selection;
		let selectedWords = document.getText(selection);

		let convertedCase = replaceCaseCommand(selectedWords);

		editor.edit(editBuilder => {
			editBuilder.replace(selection, convertedCase);
		});
	}
}

function kebabCase(selectedWords, delimiter = '-') {
	selectedWords = selectedWords.replace(/[A-Z]/g, match => ' ' + match);
	selectedWords = selectedWords.replace(/_|-/g, ' ');
	return selectedWords.replace(/\b(\s+)\b/g, delimiter).trim().toLowerCase();
}

function snakeCase(selectedWords) {
	return kebabCase(selectedWords, '_');
}

function studlyCase(selectedWords) {
	return ucFirst(camelCase(selectedWords));
}

function camelCase(selectedWords) {

	var pattern = /[A-Z]|\s+[A-z]/g;
	selectedWords = selectedWords.replace(/_|-/g, ' ');
	return lcFirst(selectedWords.replace(pattern, match => match.trim().toUpperCase()));

}

function ucFirst(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function lcFirst(string) {
	return string.charAt(0).toLowerCase() + string.slice(1);
}

module.exports = {
	activate,
	deactivate
}

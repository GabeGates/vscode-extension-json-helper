
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed


/**
 * Recursively traverses the object deleting null, empty object, empty array
 * @param {*} obj 
 */
const removeEmpty = obj => {
    Object.keys(obj).forEach(key => {
        if (obj[key] == null) delete obj[key]; // delete
        else if (Object.keys(obj[key]).length === 0) delete obj[key]; // delete
        else if (obj[key] && typeof obj[key] === "object") removeEmpty(obj[key]); // recurse
    });
};

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('The extension "json-utility-helper" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.jsonSanitize', () => {
		// The code you place here will be executed every time your command is executed
        let editor = vscode.window.activeTextEditor;

        if (editor) {
			let document = editor.document;
			let selection = editor.selection;

            if(selection.isEmpty) {
                // select the entire document
                let firstLine = editor.document.lineAt(0);
                let lastLine = editor.document.lineAt(editor.document.lineCount - 1);
                selection = new vscode.Range(0, 
                    firstLine.range.start.character, 
                    editor.document.lineCount - 1, 
                    lastLine.range.end.character);
            }

            let selectedText = document.getText(selection);
            let replaceText = "";
            
            try {
                let jsonObject = JSON.parse(selectedText);

                removeEmpty(jsonObject);

                replaceText = JSON.stringify(jsonObject);
            } catch (e) {
                vscode.window.showInformationMessage('JSON is invalid, update the selection and try again.');
                return;
            }
            

            // Replace the selected text
			editor.edit(editBuilder => {
				editBuilder.replace(selection, replaceText);
			});

            // Display a message box to the user
            vscode.window.showInformationMessage('Successfully Ran JSON Sanitize!');
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
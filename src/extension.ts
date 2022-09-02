// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import GetFileInStr from "./getFileInStr";
import main from "./main";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "edk2-uni-formatter.keybinding",
      async (fileObj) => {
        GetFileInStr.keybinding(fileObj).then((fileStr: string[]) => {
          main(fileStr); //This is the entry point of the whole project
        });
      }
    )
  );
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "edk2-uni-formatter.formatUni",
      (...fileObj) => {
        GetFileInStr.context(fileObj).then((fileStr: string[]) => {
          main(fileStr); //This is the entry point of the whole project
        });
      }
    )
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}

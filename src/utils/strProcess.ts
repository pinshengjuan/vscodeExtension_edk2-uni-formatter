import * as vscode from "vscode";
import {
  CR,
  LF,
  CRLF,
  ONE_SPACE,
  HASH_LANGUAGE,
  PATTERN_TWO_QUOTE,
} from "../constants";

class StrProcess {
  public insertSpace(maxSpace: number) {
    let spaceCount: number = 0;
    let space: string = "";

    for (spaceCount = 0; spaceCount < maxSpace; spaceCount++) {
      space += ONE_SPACE;
    }

    return space;
  }

  public spaceOnConfig() {
    const config = vscode.workspace.getConfiguration("edk2-uni-formatter");
    const spaceConfig = config["spaceBetweenTokenAndLanguageCode"];

    return this.insertSpace(spaceConfig);
  }

  public getEolConfig() {
    const config = vscode.workspace.getConfiguration("edk2-uni-formatter");
    const eolConfig = config["endOfLineWith"];
    switch (eolConfig) {
      case "CR":
        return CR;
      case "LF":
        return LF;
      case "CRLF":
        return CRLF;
    }
  }

  public getIdentiName(line: string) {
    return line.split("#string")[1].trim().split(/\s+/)[0];
  }

  public overallIdentiVal(line: string) {
    const overall: string =
      HASH_LANGUAGE +
      ONE_SPACE +
      this.getLanguage(line) +
      ONE_SPACE +
      this.getIdentiVal(line) +
      this.getEolConfig();
    return overall;
  }

  private getLanguage(line: string) {
    return line.trim().split(HASH_LANGUAGE)[1].trim().split(/ /)[0].trim();
  }

  private getIdentiVal(line: string) {
    const identiValue: any = line
      .trim()
      .split(HASH_LANGUAGE)[1]
      .trim()
      .split(PATTERN_TWO_QUOTE);
    const overallLen: number = identiValue.length;
    let content: string = "";
    /**
     * usr for loop to avoid quotes inside quotes
     */
    for (let count = 1; count < overallLen - 2; count++) {
      content += identiValue[count].trim();
    }
    return content;
  }
}

export default new StrProcess();

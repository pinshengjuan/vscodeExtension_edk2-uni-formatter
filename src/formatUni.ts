import * as fs from "fs";
import * as readline from "readline";
import * as vscode from "vscode";
import {
  HASH_STRING,
  PATTERN_STRING,
  PATTERN_LANGUAGE,
} from "./constants";
import StrProcess from "./utils/strProcess";

/**
 *
 * @param file
 * @param encoding
 * @param maxSpace
 * @returns
 */
function formatFile(
  file: string,
  encoding: BufferEncoding,
  maxSpace: number
): Promise<any> {
  return new Promise((resolve) => {
    /**
     * create local variable
     */
    const config = vscode.workspace.getConfiguration("edk2-uni-formatter");
    const spaceOnConfigStr: string = StrProcess.spaceOnConfig();
    let content: string = "";
    let langLineSpace: string = "";
    let identiName: string;
    let identiNameLen: number;

    /**
     * create read stream & readline interface
     */
    const readStream = fs.createReadStream(file);
    readStream.setEncoding(encoding);
    const rl = readline.createInterface({
      input: readStream,
      crlfDelay: Infinity,
    });

    /**
     * if readstream error then resolve nothing
     */
    readStream.once("error", () => resolve(null));

    /**
     * readline event: `line` handler
     */
    rl.on("line", (line: string) => {
      let spaceBetween: string = "";

      if (line.match(PATTERN_STRING)) {
        /**
         * 這個判斷式處理開頭為#string的行
         */
        identiName = StrProcess.getIdentiName(line);
        identiNameLen = identiName.length; //計算 #string後面接的字串的長度(e.g., #string ACPI_STR, 會計算ACPI_STR的長度，也就是8)
        /**
         * insertSpace()將當前identiName後面的空白補得和該檔案內identiName長度最長者一樣
         */
        spaceBetween = StrProcess.insertSpace(maxSpace - identiNameLen);

        spaceBetween = spaceBetween + spaceOnConfigStr; //將identiName和#language中間加user定義的空白
        content +=
          HASH_STRING +
          identiName +
          spaceBetween +
          StrProcess.overallIdentiVal(line);
      } else if (line.trim().match(PATTERN_LANGUAGE)) {
        /**
         * 這段處理#language開頭的行
         */
        const langLineSpaceNum: number =
          maxSpace + HASH_STRING.length + config["spaceOnMaxTokenAndLan"];
        langLineSpace = StrProcess.insertSpace(langLineSpaceNum);
        content += langLineSpace + StrProcess.overallIdentiVal(line);
      } else if (line.trim() === "") {
        /**
         * 將只有Tab或/和space的行換成一換行符號
         */
        content += "\r\n";
      } else {
        /**
         * 非可辨識的開頭則不動
         */
        content += line + "\r\n";
      }
    });

    /**
     * readline event: `close` handler
     */
    rl.on("close", () => {
      // closing readline and readStream
      rl.close();
      readStream.destroy();

      // content will be resolved
      resolve(content);
    });
  });
}

export default formatFile;

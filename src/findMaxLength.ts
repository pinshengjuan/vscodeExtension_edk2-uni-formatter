import * as fs from "fs";
import * as readline from "readline";
import { PATTERN_STRING } from "./constants";
import StrProcess from "./utils/strProcess";

/**
 * Traverse the file to get the longest identify name's length
 * @param filepath
 * @param fileEncoding
 * @returns
 */
function findMaxLength(
  filepath: string,
  fileEncoding: BufferEncoding
): Promise<any> {
  return new Promise((resolve) => {
    /**
     * create local variable
     */
    let max: number = 0;
    let current: number = 0;

    /**
     * create read stream & readline interface
     */
    const readStream = fs.createReadStream(filepath);
    readStream.setEncoding(fileEncoding);
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
      if (line.match(PATTERN_STRING)) {
        current = StrProcess.getIdentiName(line).length;
        max = max < current ? current : max;
      }
    });

    /**
     * readline event: `close` handler
     */
    rl.on("close", () => {
      // closing readline and readStream
      rl.close();
      readStream.destroy();

      // maxLength will be resolved
      resolve(max);
    });
  });
}

export default findMaxLength;

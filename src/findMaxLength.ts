import * as fs from 'fs';
import * as readline from "readline";

function findMaxLength(filepath: string, fileEncoding: BufferEncoding): Promise<any> {
  return new Promise(resolve => {
    /**
     * create local variable
     */
      let maxLength = 0;
      let currentLength = 0;

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
     * readline event: `line` handler
     */
      readStream.once('error', _ => resolve(null));
      rl.on("line", (line: string) => {

        const patternString = new RegExp(/^#string/);
        if(line.match(patternString))
        {
          currentLength = line.split("#string")[1].trim().split(/\s+/)[0].length;
          if(currentLength > maxLength)
          {
            maxLength = currentLength;
          }
        }
      });
      
    /**
     * readline event: `close` handler
     */
      rl.on('close', () => {
        // closing readline and readStream
        rl.close();
        readStream.destroy();

        // maxLength will be resolved
        resolve(maxLength);
      });
  });
}

export default findMaxLength;

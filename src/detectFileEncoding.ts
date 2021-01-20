import { rejects } from 'assert';
import * as fs from 'fs';
import * as readline from "readline";

function detectFileEncoding(filepath: string): Promise<any> {
  return new Promise((resolve, reject) => {
    /**
     * create local variable
     */
      const chardet = require('chardet');
      const encodingType: string = chardet.detectFileSync(filepath);

    /**
     * Determine if it's utf16 encoded
     */
      if(encodingType === 'UTF-16LE')
      {
        resolve(encodingType);
      }
      else
      {
        reject('The file is not \'UTF16\' encoded\nProcess ended\n');
      }
  });
}

export default detectFileEncoding;

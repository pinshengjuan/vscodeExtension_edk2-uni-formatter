import { rejects } from 'assert';
import * as fs from 'fs';
import * as readline from "readline";

function detectFileEncoding(filepath: string): Promise<any> {
  return new Promise(resolve => {
    /**
     * create local variable
     */
      const chardet = require('chardet');
      const encodingType: BufferEncoding = chardet.detectFileSync(filepath);

    /**
     * resolve result
     */
      resolve(encodingType);
  });
}

export default detectFileEncoding;

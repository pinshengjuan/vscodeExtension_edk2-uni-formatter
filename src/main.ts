import { writeFile } from "fs";
import * as vscode from "vscode";
import detectFileEncoding from "./detectFileEncoding";
import findMaxLength from "./findMaxLength";
import formatFile from "./formatUni";
import writeUni from "./writeUni";

/**
 * 
 * @param file 
 */
function main(file: string)
{
  detectFileEncoding(file).then(function(encoding){
    // console.log('encoding right');
    findMaxLength(file, encoding).then(function(maxSpace){
      // console.log('return value of findMaxLength: ' + maxSpace);
      formatFile(file, encoding, maxSpace).then(function(content){
        // console.log(content);
        writeUni(file, encoding, content);
      });
    });
  });
}

export default main;
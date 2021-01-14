import { writeFile } from "fs";
import * as vscode from "vscode";
import detectFileEncoding from "./detectFileEncoding";
import findMaxLength from "./findMaxLength";
import formatFile from "./formatUni";
import writeUni from "./writeUni";

/**
 * 
 * @param filePath 
 */
function main(filePath: string)
{
  detectFileEncoding(filePath).then(function(fileEncoding){
    // console.log('encoding right');
    findMaxLength(filePath).then(function(maxStringLength){
      // console.log('return value of findMaxLength: ' + maxStringLength);
      formatFile(filePath, maxStringLength).then(function(fileString){
        // console.log(fileString);
        writeUni(filePath, fileString);
      });
    });
  }).catch(function(err){
    console.log(err);
  });
}

export default main;
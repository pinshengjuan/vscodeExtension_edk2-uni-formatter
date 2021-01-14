import * as fs from 'fs';
import * as readline from "readline";
import { ONE_SPACE, EIGHT_SPACES, HASH_STRING, HASH_LANGUAGE } from "./constants";

function formatFile(filepath: string, maxStringLength: number): Promise<any> {
  return new Promise(resolve => {
    /**
     * create local variable
     */
    let spaceLengthWithoutString: number = maxStringLength + (HASH_STRING.length) + (EIGHT_SPACES.length);
    let spaceLengthWithString: number;
    let spaceWithoutString: string = '';
    let genSpaceCurrentNum: number = 0;
    let fileString: string = '';
    let tempString: string;
    let stringName: string;
    let stringNameLength: number;
    let stringValue: string;

    /**
     * 產生只有#language行的切齊點
     */
    for(genSpaceCurrentNum=0 ; genSpaceCurrentNum<spaceLengthWithoutString ; genSpaceCurrentNum++) {
      spaceWithoutString += ONE_SPACE;
    }

    /**
     * create read stream & readline interface
     */
    const readStream = fs.createReadStream(filepath);
    readStream.setEncoding('utf16le');
    const rl = readline.createInterface({
      input: readStream,
      crlfDelay: Infinity,
    });

    /**
     * readline event: `line` handler
     */
      readStream.once('error', _ => resolve(null));
      rl.on("line", (line: string) => {

        const patternString = new RegExp(/^#string/); //開頭是#string
        const patternLanguage = new RegExp((/^#language/)); //開頭是#language
        const patternComment = new RegExp(/^\/\//); //開頭是//
        let spaceWithString: string = '';
        if(line.match(patternString)) //這個判斷式處理開頭為#string的行
        {
          stringName = line.split(' ')[1].trim().split('\t')[0]; //add .split('\t')[0] to avoid tab between stringName and #language
          stringNameLength = stringName.length;//計算 #string後面接的字串的長度(e.g., #string ACPI_STR, 會計算ACPI_STR的長度，也就是8)
          spaceLengthWithString = maxStringLength - stringNameLength; //Calculate spaces that needed between stringName and #language
          stringValue = line.trim().split(HASH_LANGUAGE)[1]; //!!!Notice!!! this string got ONE space ahead
          for(genSpaceCurrentNum = 0 ; genSpaceCurrentNum<spaceLengthWithString ; genSpaceCurrentNum++) {
            spaceWithString += ONE_SPACE;
          }// 此迴圈將當前stringName後面的空白補得和該檔案內stringName長度最長者一樣
          spaceWithString = spaceWithString + EIGHT_SPACES; //將stringName 和 #language中間加8個空白
          fileString = fileString + HASH_STRING + stringName + spaceWithString + HASH_LANGUAGE + stringValue + '\n';
        }
        else if(line.trim() === '') //將只有Tab或/和space的行換成一換行符號
        {
          fileString = fileString + '\n';
        }
        else if(line.trim().match(patternLanguage)) //處理開頭是一堆空白接#language的行
        {
          tempString = line.trim();
          fileString = fileString + spaceWithoutString + tempString + '\n';
        }
        else
        {
          fileString = fileString + line + '\n';
        }
      });
      
    /**
     * readline event: `close` handler
     */
      rl.on('close', () => {
        // closing readline and readStream
        rl.close();
        readStream.destroy();

        // fileString will be resolved
        resolve(fileString);
      });
  });
}

export default formatFile;

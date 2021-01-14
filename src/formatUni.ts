import * as fs from 'fs';
import * as readline from "readline";
import { ONE_SPACE, EIGHT_SPACES, HASH_STRING, HASH_LANGUAGE } from "./constants";

function formatFile(filepath: string, maxStringLength: number): Promise<any> {
  return new Promise(resolve => {
    /**
     * create local variable
     */
    let genSpaceCurrentNum: number = 0;
    const langLineMaxSpaceAheadNum: number = maxStringLength + (HASH_STRING.length) + (EIGHT_SPACES.length);
    let langLineMaxSpaceAhead: string = '';
    let identifierLineMaxSpaceBehind: number;
    let fileString: string = '';
    let identifierName: string;
    let identifierNameLength: number;
    let identifierValue: string;

    /**
     * 產生只有#language行的切齊點
     */
    for(genSpaceCurrentNum=0 ; genSpaceCurrentNum<langLineMaxSpaceAheadNum ; genSpaceCurrentNum++) {
      langLineMaxSpaceAhead += ONE_SPACE;
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
        let spacesBetweenIdentifierAndLang: string = '';
        if(line.match(patternString)) //這個判斷式處理開頭為#string的行
        {
          identifierName = line.split(' ')[1].trim().split('\t')[0]; //add .split('\t')[0] to avoid tab between identifierName and #language
          identifierNameLength = identifierName.length;//計算 #string後面接的字串的長度(e.g., #string ACPI_STR, 會計算ACPI_STR的長度，也就是8)
          identifierLineMaxSpaceBehind = maxStringLength - identifierNameLength; //Calculate spaces that needed between identifierName and #language
          for(genSpaceCurrentNum=0 ; genSpaceCurrentNum<identifierLineMaxSpaceBehind ; genSpaceCurrentNum++) {
            spacesBetweenIdentifierAndLang += ONE_SPACE;
          }// 此迴圈將當前identifierName後面的空白補得和該檔案內identifierName長度最長者一樣
          
          spacesBetweenIdentifierAndLang = spacesBetweenIdentifierAndLang + EIGHT_SPACES; //將identifierName 和 #language中間加8個空白
          identifierValue = line.trim().split(HASH_LANGUAGE)[1]; //!!!Notice!!! this string got ONE space ahead
          fileString = fileString + HASH_STRING + identifierName + spacesBetweenIdentifierAndLang + HASH_LANGUAGE + identifierValue + '\n';
        }
        else if(line.trim().match(patternLanguage)) //這段處理前面是一堆空白接#language的行
        {
          fileString = fileString + langLineMaxSpaceAhead + line.trim() + '\n';
        }
        else if(line.trim() === '') //將只有Tab或/和space的行換成一換行符號
        {
          fileString += '\n';
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

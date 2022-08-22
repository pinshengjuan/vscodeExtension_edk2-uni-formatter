import * as fs from 'fs';
import * as util from 'util';

/**
 * 
 * @param filepath 
 * @param fileEncoding 
 * @param fileString 
 */
function writeUni(filepath: string, fileEncoding: BufferEncoding, fileString: string){

  const writeFile = util.promisify(fs.writeFile);

  writeFile(filepath, fileString, { encoding: fileEncoding })
  .then(() => {
          console.log('File formatted!');
  })
  .catch(error => console.log(error));

}

export default writeUni;

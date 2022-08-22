import * as fs from 'fs';
import * as util from 'util';

function writeUni(filepath: string, fileEncoding: BufferEncoding, fileString: string){

  const writeFile = util.promisify(fs.writeFile);

  writeFile(filepath, fileString, { encoding: fileEncoding })
  .then(() => {
          console.log('File created!');
  })
  .catch(error => console.log(error));

}

export default writeUni;

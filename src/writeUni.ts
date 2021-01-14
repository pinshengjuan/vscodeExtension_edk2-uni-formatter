import * as fs from 'fs';
import * as util from 'util';

function writeUni(filepath: string, fileString: string){

  const writeFile = util.promisify(fs.writeFile);

  writeFile(filepath, fileString, { encoding: 'utf16le' })
  .then(() => {
          console.log('File created!');
  })
  .catch(error => console.log(error));

}

export default writeUni;

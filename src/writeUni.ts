import * as fs from "fs";
import * as util from "util";

/**
 *
 * @param file
 * @param fileEncoding
 * @param content
 */
function writeUni(
  file: string,
  fileEncoding: BufferEncoding,
  content: string,
  bom: string
) {
  const writeFile = util.promisify(fs.writeFile);

  writeFile(file, bom + content, { encoding: fileEncoding })
    .then(() => {
      console.log("File formatted!");
    })
    .catch((error) => console.log(error));
}

export default writeUni;

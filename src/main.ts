import detectEncoding from "./detectEncoding";
import detectBOM from "./detectBOM";
import findMaxLength from "./findMaxLength";
import formatFile from "./formatUni";
import writeUni from "./writeUni";

/**
 *
 * @param file
 */
function main(file: string) {
  detectEncoding(file).then(function (encoding) {
    // console.log('encoding: ' + encoding);
    detectBOM(file, encoding)
      .then((bom) => {
        // console.log('bom: ' + bom);
        findMaxLength(file, encoding).then(function (maxSpace) {
          // console.log('return value of findMaxLength: ' + maxSpace);
          formatFile(file, encoding, maxSpace).then(function (content) {
            writeUni(file, encoding, content, bom);
          });
        });
      })
      .catch((error) => console.log(error));
  });
}

export default main;

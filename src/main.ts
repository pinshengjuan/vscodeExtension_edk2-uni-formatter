import detectEncoding from "./detectEncoding";
import detectBOM from "./detectBOM";
import findMaxLength from "./findMaxLength";
import formatFile from "./formatUni";
import writeUni from "./writeUni";

/**
 *
 * @param files
 */
function main(files: string[]) {
  for (let fileCount in files) {
    detectEncoding(files[fileCount]).then(function (encoding) {
      // console.log('encoding: ' + encoding);
      detectBOM(files[fileCount], encoding)
        .then((bom) => {
          // console.log('bom: ' + bom);
          findMaxLength(files[fileCount], encoding).then(function (maxSpace) {
            // console.log('return value of findMaxLength: ' + maxSpace);
            formatFile(files[fileCount], encoding, maxSpace).then(function (
              content
            ) {
              writeUni(files[fileCount], encoding, content, bom);
            });
          });
        })
        .catch((error) => console.log(error));
    });
  }
}

export default main;

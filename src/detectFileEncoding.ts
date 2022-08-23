/**
 *
 * @param file
 * @returns
 */
function detectFileEncoding(file: string): Promise<any> {
  return new Promise((resolve) => {
    /**
     * create local variable
     */
    const chardet = require("chardet");
    /**
     * get file encoding
     */
    chardet.detectFile(file).then((encoding: BufferEncoding) => {
      /**
       * resolve encoding
       */
      resolve(encoding);
    });
  });
}

export default detectFileEncoding;

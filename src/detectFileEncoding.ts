/**
 *
 * @param filepath
 * @returns
 */
function detectFileEncoding(filepath: string): Promise<any> {
  return new Promise((resolve) => {
    /**
     * create local variable
     */
    const chardet = require("chardet");
    /**
     * get file encoding
     */
    chardet.detectFile(filepath).then((encodingType: BufferEncoding) => {
      /**
       * resolve encoding
       */
      resolve(encodingType);
    });
  });
}

export default detectFileEncoding;

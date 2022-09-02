/**
 *
 * @param file
 * @returns
 */
function detectEncoding(file: string): Promise<any> {
  return new Promise((resolve) => {
    /**
     * create local variable
     */
    const chardet = require("chardet");
    let encodingWorkaround: BufferEncoding;
    /**
     * get file encoding
     */
    chardet.detectFile(file).then((encoding: BufferEncoding) => {
      /**
       * add workaround for ISO-8859-1 treat as UTF-8
       */
      if (encoding.toString() === "ISO-8859-1") {
        encodingWorkaround = "utf8";
        resolve(encodingWorkaround);
      }
      /**
       * resolve encoding
       */
      resolve(encoding);
    });
  });
}

export default detectEncoding;

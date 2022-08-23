import { readFile } from "fs";

/**
 *
 * @param file
 * @param encoding
 * @returns
 */
function detectBOM(file: string, encoding: BufferEncoding): Promise<any> {
  return new Promise((resolve, reject) => {
    readFile(file, "binary", (err, contents) => {
      // const fc = contents.charCodeAt(0).toString(16);
      let bom: string = "";

      switch (encoding.toString()) {
        case "ISO-8859-1": // UTF-8 without BOM(ANSI)
          bom = "";
          break;
        case "UTF-16BE": //UTF-16 Big-Endian
          reject("not supported encoding");
          break;
        case "UTF-8": //UTF-8 with BOM
        case "UTF-16LE": //UTF-16 Little-Endian
          bom = "\uFEFF";
          break;
      }
      resolve(bom);
    });
  });
}

export default detectBOM;

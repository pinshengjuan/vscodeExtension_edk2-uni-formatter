import { readFile } from "fs";

/**
 *
 * @param file
 * @returns
 */
function readContent(file: string): Promise<any> {
  return new Promise((resolve) => {
    readFile(file, "binary", (err, contents) => {
      const fc = contents.charCodeAt(0).toString(16);
      console.log(fc);
      switch (fc) {
        case "efbbbf": // UTF-8
          console.log("efbbbf");
          break;
        case "feff": // UTF-16 (BE) + UTF-32 (BE)
          console.log("feff");
          break;
        case "fffe": // UTF-16 (LE)
          console.log("fffe");
          break;
        case "fffe0000": // UTF-32 (LE)
          console.log("fffe0000");
          break;
        case "2B2F76": // UTF-7
          console.log("2B2F76");
          break;
        case "f7644c": // UTF-1
          console.log("f7644c");
          break;
        case "dd736673": // UTF-EBCDIC
          console.log("dd736673");
          break;
        case "efeff": // SCSU
          console.log("efeff");
          break;
        case "fbee28": // BOCU-1
          console.log("fbee28");
          break;
        case "84319533": // GB-18030
          console.log("84319533");
          break;
        default:
          console.log("none");
      }
      resolve(contents);
    });
  });
}

export default readContent;

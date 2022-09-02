/**
 *
 */
class GetFileInStr {
  public context(fileObj: any): Promise<any> {
    return new Promise((resolve) => {
      const fileStr: string[] = [];
      let fileCount: number = 0;
      for (fileCount = 0; fileCount < fileObj[1].length; fileCount++) {
        fileStr.push(fileObj[1][fileCount].fsPath);
      }

      resolve(fileStr);
    });
  }
}

export default new GetFileInStr();

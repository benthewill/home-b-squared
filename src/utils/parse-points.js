export function parseForTexts(unparsed) {
  let contentRowsArr = [""];
  let numLines = unparsed.length;

  let processedLine = 0;

  for (let [index, line] of unparsed.entries()) {
    let num = line.line_number;
    let indent = line.indent_level;
    let content = String(line.content);

    if (num == 0) {
      contentRowsArr[0] += content;
    } else if (num != 0 && indent == 0) {
      let nextLine = processedLine + 1;
      let nextRow = contentRowsArr[nextLine];
      if (nextRow === undefined) {
        contentRowsArr.push("");
      }
      contentRowsArr[nextLine] += content;
      processedLine += 1;
    } else if (num != 0 && indent != 0) {
      contentRowsArr[processedLine] += " ";
      contentRowsArr[processedLine] += content;
    }
  }

  const cleanedRowsArr = contentRowsArr.filter((line) => line != "");
  // console.log(cleanedRowsArr);
  return cleanedRowsArr;
}

export function parseForSlides(unparsed) {
  let contentRowsArr = [];

  let numLines = unparsed.length;
  let findProperLength = unparsed.filter((item) => {
    return item.indent_level == 0;
  });

  for (let i = 0; i < findProperLength.length; i++) {
    contentRowsArr.push([]);
  }

  let processedLine = 0;
  // console.log(contentRowsArr);

  for (let [index, line] of unparsed.entries()) {
    let num = line.line_number;
    let indent = line.indent_level;
    let content = String(line.content);
    // console.log(content);

    if (num == 0) {
      contentRowsArr[0].push(content);
    } else if (num != 0 && indent == 0) {
      let nextLine = processedLine + 1;
      contentRowsArr[nextLine].push(content);
      processedLine += 1;
    } else if (num != 0 && indent != 0) {
      contentRowsArr[processedLine].push(content);
    }
  }

  return contentRowsArr;
}

const csvParser = function (content) {
  let rows = content.split("\r\n");

  const headers = rows.shift().split(",");

  rows = rows.map(function (row) {
    let object = {};

    let splittedLine = row.split(",");

    headers.forEach((key, index) => {
      object[key] = splittedLine[index];
    });

    return object;
  });

  return rows;
};

module.exports = csvParser;

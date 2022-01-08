const fs = require("fs");

const csvParser = require("./CsvHelper");

function transformFileToBase64(path) {
  try {
    const buffer = fs.readFileSync(path, "base64");

    return buffer;
  } catch (error) {
    return error;
  }
}

function parseCsvFileToObject(path) {
  try {
    const csvContent = fs.readFileSync(path, "utf-8");

    return csvParser(csvContent);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  transformFileToBase64: transformFileToBase64,
  parseCsvFileToObject: parseCsvFileToObject,
};

const { ipcMain } = require("electron");

const { PythonShell } = require("python-shell");

const { parseCsvFileToObject } = require("./helpers/FileHelper");

const SCRIPT_PATH = "main/script.py";

ipcMain.on("process-data", async (event, path) => {
  const fileContent = parseCsvFileToObject(path);

  const args = JSON.stringify({ data: fileContent });

  PythonShell.run(SCRIPT_PATH, { args }, function (err, results) {
    if (err) throw err;

    const result = JSON.parse(results[0]);

    console.log(result);

    event.reply("process-data", result);
  });
});

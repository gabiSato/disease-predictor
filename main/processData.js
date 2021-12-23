const { ipcMain } = require("electron");

const { PythonShell } = require("python-shell");

const { parseCsvFileToObject } = require("./helpers/FileHelper");

ipcMain.on("process-data", async (event, path) => {
  const fileContent = parseCsvFileToObject(path);

  const data = JSON.stringify({ data: fileContent });

  PythonShell.run("main/script.py", { args: [data] }, function (err, results) {
    if (err) throw err;

    console.log(results);

    event.reply("process-data", JSON.parse(results[0]));
  });
});

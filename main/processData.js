const { ipcMain } = require("electron");

const { PythonShell } = require("python-shell");
const csv = require("csv-parser");
const fs = require("fs");
const { spawn } = require("child_process");

ipcMain.on("process-data", (event, path) => {
  console.log(path);
  const fileContent = [];

  // let shell = new PythonShell("public/script.py", { mode: "json" });

  fs.createReadStream(path)
    .pipe(csv())
    .on("data", (data) => fileContent.push(data))
    .on("end", () => {
      const chunks = [];

      // const python = spawn("python", [
      //   "public/script.py",
      //   JSON.stringify({ data: fileContent }),
      // ]);

      // python.stdout.on("data", (chunk) => chunks.push(chunk));

      // python.stdout.on("end", () => {
      //   try {
      //     const data = JSON.parse(Buffer.concat(chunks).toString());

      //     console.log(data);
      //   } catch (e) {
      //     // Handle the error
      //     console.log(e);
      //   }
      // });

      // python.on("close", (code) => {
      //   console.log(`child process close all stdio with code ${code}`);
      //   // send data to browser
      //   // res.send(dataToSend)
      // });
      PythonShell.run(
        "main/script3.py",
        { args: [JSON.stringify({ data: fileContent })] },
        function (err, results) {
          if (err) throw err;

          console.log(results);

          event.reply("process-data", JSON.parse(results[0]));
        }
      );
    });
  // shell.send({ args: [1, 2, 3] });

  // shell.on("message", function (message) {
  //   console.log("results: ", message);
  // });

  // shell.end(function (err, code, signal) {
  //   if (err) throw err;
  //   // console.log("The exit code was: " + code);
  //   // console.log("The exit signal was: " + signal);
  //   console.log("finished");
  // });

  // const options = {
  //   mode: "text",
  //   pythonOptions: ["-u"], // get print results in real-time
  //   // scriptPath: "public",
  //   args: [10],
  // };
});

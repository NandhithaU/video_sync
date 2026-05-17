const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

const adbPath = path.join(
  __dirname,
 "../tools/platform-tools-latest-windows/platform-tools/adb.exe");

app.get("/devices", (req, res) => {

  const command = `"${adbPath}" devices`;

  exec(command, (err, stdout, stderr) => {

    if (err) {
      return res.status(500).json({
        error: err.message
      });
    }

    const lines = stdout.split("\n");

    const devices = lines
      .slice(1)
      .filter(line => line.includes("device"))
      .map(line => line.split("\t")[0]);

    res.json(devices);
  });
});

app.post("/open-video", (req, res) => {

  const { url, devices } = req.body;

  devices.forEach(device => {

    const command =
      `"${adbPath}" -s ${device} shell am start -a android.intent.action.VIEW -d "${url}"`;

    exec(command);
  });

  res.json({
    success: true
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
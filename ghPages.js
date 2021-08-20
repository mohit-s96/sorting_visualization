var ghpages = require("gh-pages");
const { exec } = require("child_process");

exec("npm run build", (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  ghpages.publish("dist", function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Success");
    }
  });
});

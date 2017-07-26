const express = require("express"),
    expressStaticGzip = require("express-static-gzip");

const app = express();

app.use("/", expressStaticGzip("dist"));

app.listen(3000, () => {
    console.log("App listening on port 3000");
});
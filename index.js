const express = require("express"),
    expressStaticGzip = require("express-static-gzip");

const app = express();

const port = process.env.PORT || 8080;

app.use("/", expressStaticGzip("dist"));

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
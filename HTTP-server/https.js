const https = require("https");
const fs = require("fs")

const options = {
    key: fs.readFileSync("/path/to/key.pem"),
    cert: fs.readFileSync("/path/to/cert.pem")
};

https
    .createServer(optionis, (req, res) => {
        res.en("Ok")
    })
    .listen(8000)
Security from CSRF

npm i -S csurf

const csurf = require("csurf")
app.use(csrf({ cookie: true }))
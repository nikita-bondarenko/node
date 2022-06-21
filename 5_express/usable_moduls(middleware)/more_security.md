Больше защиты от атак 

npm i -S helmet

const helmet = require("helmet")
app.use(helmet())
app.use(helmet().xssFilter())
app.use(helmet().frameguard())
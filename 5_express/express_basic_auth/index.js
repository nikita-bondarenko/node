const express = require("express")
const basicAuth = require("express-basic-auth")

const app = express()

app.use(
    basicAuth({
        realm: "Web.",
        challenge: true,
        users: {
            admin: process.env.PASSWORD,
        }
    })
)

app.get("/", (req, res) => {
    res.send("Welcome")
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`  Listening on http://localhost:${port} `)
})
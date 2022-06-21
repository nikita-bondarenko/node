const express = require("express")
const nunjucks = require("nunjucks")

const app = express()

nunjucks.configure("views", {
    autoescape: true,
    express: app
})

app.set('view engine', 'njk')

app.use(express.json()
    // (req, res, next) => {
    // if (!req.headers['content-type'] ||
    //     !req.headers['content-type'].match(/json/)
    // ) {
    //     return next()
    // }

    // let data = ""
    // req.on('data', chunk => {
    //     data += chunk
    // })
    // req.on("end", () => {
    //     try {
    //         req.body = data ? JSON.parse(data) : {}
    //         next()
    //     } catch (err) {
    //         res.status(400).send(err.message)
    //     }
    // })
    // }
)
app.use(express.static("public"))

let count = 0;

app.post("/inc", (req, res) => {

    const data = req.body
    count += data.value || 1;
    res.json({ count })


})

const uikitCss = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.14.3/dist/css/uikit.min.css" />'

const escapeHTML = html => html.replace(/</g, '&lt;').replace(/>/g, '&gt').replace(/'/g, '&quot;')

app.get("/", (req, res) => {
    const counts = [];
    for (let i = 0; i < count; i++) {
        counts.push(99 - i)
    }
    res.render('index', { count, uikitCss, counts })
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(` Listening to http://localhost:${port}`)
})
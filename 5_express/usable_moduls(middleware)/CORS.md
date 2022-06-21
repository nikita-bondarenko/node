CORS

npm i -S cors

const cors = require("cors")
app.use(cors())
app.use("/api", cors())
app.get("/api/products", cors(), (req, res) => {
    res.json({
        msg: "CORS works for a Single Route"
    })
})
Обработка ошибок

app.use((err, req, res, next) => {
    console.error(err)
    res.status(400).send(err.message)
})
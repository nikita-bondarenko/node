const { customAlphabet } = require("nanoid")

const randomId = customAlphabet("1234567890abcdef", 10)()
console.log(randomId)
const { nanoid } = require("nanoid/async");

(async function () {
    const randomId = await nanoid()
    console.log(randomId)
})()

const axios = require('axios')
const argsArray = process.argv.slice(2)
const getData = async (array) => {
    const result = {}
    const res = await Promise.all(array.map(name => axios
        .get(`https://swapi.dev/api/people/?search=${name}`)
        .catch(err => {

            return {
                data: { count: 0, next: null, previous: null, results: [] }
            }
        })
        .then(res => {
            if (!res.data.count) console.log(`No results found for '${name}'`)
            return res
        })))

    result.quantity = res.reduce((acc, item) => acc + item.data.count, 0)
    result.data = res.reduce((arr, item) => {

        if (item.data.results.length) {
            const dataArray = item.data.results.reduce((array, elem) => [...array, { name: elem.name, height: elem.height }], [])
            dataArray.forEach(elem => arr.push(elem))
        }
        return arr
    }
        ,
        [])

    const namesSorted = result.data.map((item) => item.name).sort()
    const heightsSorted = result.data.sort((a, b) => Number(a.height) < Number(b.height) ? 1 : -1)
    if (namesSorted.length) {
        console.log(
            `Total results: ${result.quantity}.
All: ${namesSorted.join(', ')}.
Min height: ${heightsSorted.slice(-1)[0].name}, ${heightsSorted.slice(-1)[0].height} cm.
Max height: ${heightsSorted[0].name}, ${heightsSorted[0].height} cm.`
        )
    }

}
if (argsArray.length < 1) {
    console.error('No arguments are found')
    process.exit(1)
}

getData(argsArray)


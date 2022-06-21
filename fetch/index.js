const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((data) => {
        data.slice(0, 10).forEach((post) => {
            console.log(`# ${post.title}
        ------------------
        ${post.body}
        
        `)
        })
    })
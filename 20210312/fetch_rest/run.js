const R = require('ramda')
const fetch = require('node-fetch')

const URL_USERS = 'https://jsonplaceholder.typicode.com/users'
const URL_POSTS = 'https://jsonplaceholder.typicode.com/posts'

const get = url => fetch(url).then(r => r.json())

const reducer = (r, d) => {
    const userId = d.userId
    const prev = r[userId] || []
    return {
        ...r,
        [userId]: [...prev, d.title]
    }
}

Promise.all([get(URL_USERS), get(URL_POSTS)]).then(([users, posts]) => {
    const user = posts.reduce(reducer, {})

    console.log(users.map(d => ({
        nom_utilisateur: d.username,
        ville: d.address.city,
        nom_compagnie: d.company.name,
        titre: user[d.id]
    })))
})

// const parsePosts = R.map(R.pick(['userId', 'title']));
// const parseUsers = R.pick(['username', 'address', 'city', 'company', 'name']);

// const posts = async () => {
//     let fetchContent = await fetch(URL_POSTS);
//     let posts_json = await fetchContent.json();
//     return parsePosts(posts_json);
// }

// const

// const users = async () => {
//     let fetchContent = await fetch(URL_USERS);
//     let users_json = await fetchContent.json();
//     return parseUsers(users_json);
// }

// const run = async () => {
//     let parsed_posts = await posts()
//     let parsed_users = await users()
//     let parsed = parsed_users.parsed_posts;
//     console.log(parsed);
// }

// run();
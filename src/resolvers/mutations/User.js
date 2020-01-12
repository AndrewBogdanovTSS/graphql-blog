import uuidv4 from 'uuid/v4'

function create(parent, {data}, {db}) {
    let {users} = db
    const {email} = data
    const emailTaken = users.some(user => user.email === email)
    if (emailTaken) throw new Error('Email already taken')
    const user = {
        id: uuidv4(),
        ...data
    }
    users.push(user)
    return user
}

function update(parent, {id, data}, {db}) {
    const user = db.users.find(user => user.id === id)
    if (!user) throw new Error('No user found')
    if (data.email) {
        const emailTaken = db.users.some(user => user.email === data.email)
        if (emailTaken) throw new Error('Email is already in use')
        user.email = data.email
    }
    if(data.name === 'string') user.name = data.name
    if(typeof data.age !== 'undefined') user.age = data.age
}

function del(parent, {id}, {db}) {
    let {users, posts, comments} = db
    const index = users.findIndex(user => user.id === id)
    if (index === -1) throw new Error('No user found')
    posts = posts.filter(post => {
        const match = post.author === id
        if (match) comments = comments.filter(comment => comment.post !== post.id)
        return !match
    })
    comments = comments.filter(comment => comment.author !== id)
    return users.splice(index, 1)[0]
}

export default {
    createUser: create,
    updateUser: update,
    deleteUser: del
}

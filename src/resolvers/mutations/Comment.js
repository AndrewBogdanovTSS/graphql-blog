import uuidv4 from 'uuid/v4'

function update(parent, {id, data}, {db}) {
    const {text} = data
    const comment = db.comments.find(comment => comment.id === id)
    if (!comment) throw new Error('No comment found')
    if(text === 'string') comment.text = text
}

function create(parent, {data}, {pubSub, db}) {
    let {users, posts, comments} = db
    const {author, post} = data
    const isUser = users.some(({id}) => id === author)
    if (!isUser) throw new Error('User with such id doesn\'t exist')
    const isPost = posts.some(({id, published}) => id === post && published)
    if (!isPost) throw new Error('Post with such id doesn\'t exist')
    const comment = {
        id: uuidv4(),
        ...data
    }
    comments.push(comment)
    pubSub.publish(`comment ${post}`, {comment})
    return comment
}

function del(parent, {id}, {db}) {
    let {comments} = db
    const index = comments.findIndex(comment => comment.id === id)
    if (index === -1) throw new Error('No such comment found')
    return comments.splice(index, 1)[0]
}

export default {
    createComment: create,
    updateComment: update,
    deleteComment: del
}

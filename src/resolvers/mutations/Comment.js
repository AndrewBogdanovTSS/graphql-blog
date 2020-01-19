import uuidv4 from 'uuid/v4'

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
    pubSub.publish(`comment ${post}`, {
        comment: {mutation: 'created', data: comment}
    })
    return comment
}

function update(parent, {id, data}, {db, pubSub}) {
    const {text} = data
    const comment = db.comments.find(comment => comment.id === id)
    if (!comment) throw new Error('No comment found')
    if(typeof text === 'string') comment.text = text
    pubSub.publish(`comment ${comment.post}`, {
        comment: {mutation: 'updated', data: comment}
    })
    return comment
}

function del(parent, {id}, {db, pubSub}) {
    let {comments} = db
    const index = comments.findIndex(comment => comment.id === id)
    const [deletedComment] = comments.splice(index, 1)
    if (!deletedComment) throw new Error('No such comment found')
    pubSub.publish(`comment ${deletedComment.post}`, {
        comment: {mutation: 'deleted', data: deletedComment}
    })
    return deletedComment
}

export default {
    createComment: create,
    updateComment: update,
    deleteComment: del
}

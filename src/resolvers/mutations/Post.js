import {v4} from 'uuid'

function create(parent, {data}, {pubSub, db}) {
    let {users, posts} = db
    const {author} = data
    const isUser = users.some(user => user.id === author)
    if (!isUser) throw new Error('User with such id doesn\'t exist')
    const post = {
        id: v4(),
        comments: [],
        ...data
    }
    posts.push(post)
    if (data.published) pubSub.publish('post', {post: {mutation: 'created', data: post}})
    return post
}

function update(parent, {id, data}, {db, pubSub}) {
    const {title, body, published} = data
    const post = db.posts.find(post => post.id === id)
    const originalPost = {...post}
    if (!post) throw new Error('No post found')
    if (typeof title === 'string') post.title = title
    if (typeof body === 'string') post.body = body
    if (typeof published === 'boolean') {
        post.published = published
        if (originalPost.published && !post.published) {
            pubSub.publish('post', {
                post: {
                    mutation: 'deleted',
                    data: originalPost
                }
            })
        } else if (!originalPost.published && post.published) {
            pubSub.publish('post', {
                post: {
                    mutation: 'created',
                    data: post
                }
            })
        } else if (post.published) {
            pubSub.publish('post', {
                post: {
                    mutation: 'updated',
                    data: post
                }
            })
        }
    }
    return post
}

function del(parent, {id}, {pubSub, db}) {
    let {comments, posts} = db
    const index = posts.findIndex(post => post.id === id)
    const [post] = posts.splice(index, 1)
    if (!post) throw new Error('No such post found')
    comments = comments.filter(({post}) => post !== id)
    if (post.published) pubSub.publish('post', {post: {mutation: 'deleted', data: post}})
    return post
}

export default {
    createPost: create,
    updatePost: update,
    deletePost: del
}

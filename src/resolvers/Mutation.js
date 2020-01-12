import uuidv4 from 'uuid/v4'

export default {
  createUser(parent, {data}, {db}) {
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
  },
  updateUser(parent, {id, data}, {db}) {
    const user = db.users.find(user => user.id === id)
    if (!user) throw new Error('No user found')
    if (data.email) {
      const emailTaken = db.users.some(user => user.email === data.email)
      if (emailTaken) throw new Error('Email is already in use')
      user.email = data.email
    }
    if(data.name === 'string') user.name = data.name
    if(typeof data.age !== 'undefined') user.age = data.age
  },
  deleteUser(parent, {id}, {db}) {
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
  },
  createPost(parent, {data}, {pubSub, db}) {
    let {users, posts} = db
    const {author} = data
    const isUser = users.some(user => user.id === author)
    if (!isUser) throw new Error('User with such id doesn\'t exist')
    const post = {
      id: uuidv4(),
      comments: [],
      ...data
    }
    posts.push(post)
    if(data.published) pubSub.publish('post', {post: {mutation: 'created', data: post}})
    return post
  },
  updatePost(parent, {id, data}, {db}) {
    const {title, body, published} = data
    const post = db.posts.find(post => post.id === id)
    if (!post) throw new Error('No post found')
    if(title === 'string') post.title = title
    if(body === 'string') post.body = body
    if(published === 'boolean') post.published = published
  },
  deletePost(parent, {id}, {pubSub, db}) {
    let {comments, posts} = db
    const index = posts.findIndex(post => post.id === id)
    const [post] = posts.splice(index, 1)
    if (!post) throw new Error('No such post found')
    comments = comments.filter(({post}) => post !== id)
    if(post.published) pubSub.publish('post', {post: {mutation: 'deleted', data: post}})
    return post
  },
  updateComment(parent, {id, data}, {db}) {
    const {text} = data
    const comment = db.comments.find(comment => comment.id === id)
    if (!comment) throw new Error('No comment found')
    if(text === 'string') comment.text = text
  },
  createComment(parent, {data}, {pubSub, db}) {
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
  },
  deleteComment(parent, {id}, {db}) {
    let {comments} = db
    const index = comments.findIndex(comment => comment.id === id)
    if (index === -1) throw new Error('No such comment found')
    return comments.splice(index, 1)[0]
  }
}

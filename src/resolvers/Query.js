export default {
  users(parent, {query}, {db}) {
    const {users} = db
    if (!query) return users
    return users.filter(user => user.name.toLowerCase().includes(query.toLowerCase()))
  },
  posts(parent, {query}, {db}) {
    const {posts} = db
    if (!query) return posts

    return posts.filter(post => {
      const isTitleMatch = post.title.toLowerCase().includes(query.toLowerCase())
      const isBodyMatch = post.body.toLowerCase().includes(query.toLowerCase())
      return isTitleMatch || isBodyMatch
    })
  },
  comments: (parent, {authorId}, {db}) => {
    const {comments} = db
    console.log('authorId:', authorId)
    if (!authorId) return comments
    return comments.filter(comment => comment.author.toLowerCase().includes(authorId.toLowerCase()))
  }
}

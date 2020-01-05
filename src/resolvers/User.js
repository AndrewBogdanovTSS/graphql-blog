export default {
  posts: ({id}, _, {db}) => db.posts.filter(post => post.author === id),
  comments: ({id}, _, {db}) => db.comments.filter(comment => comment.author === id)
}

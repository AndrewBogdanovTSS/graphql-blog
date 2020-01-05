export default {
  author: (p, _, {db}) => db.users.find(user => user.id === p.author),
  post: (p, _, {db}) => db.posts.find(post => post.id === p.post)
}

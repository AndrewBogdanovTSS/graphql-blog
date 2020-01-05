export default {
  author: ({author}, args, {db}) => db.users.find(user => user.id === author),
  comments: ({id}, args, {db}) => db.comments.filter(comment => comment.post === id)
}

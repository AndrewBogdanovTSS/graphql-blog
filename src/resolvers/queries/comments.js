export default (parent, {authorId}, {db}) => {
    const {comments} = db
    if (!authorId) return comments
    return comments.filter(comment => comment.author.toLowerCase().includes(authorId.toLowerCase()))
}

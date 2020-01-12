export default (parent, {query}, {db}) => {
    const {posts} = db
    if (!query) return posts

    return posts.filter(post => {
        const isTitleMatch = post.title.toLowerCase().includes(query.toLowerCase())
        const isBodyMatch = post.body.toLowerCase().includes(query.toLowerCase())
        return isTitleMatch || isBodyMatch
    })
}

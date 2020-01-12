export default {
    comment: {
        subscribe(parent, {postId}, {pubSub, db}, info) {
            const post = db.posts.find(post => post.id === postId && post.published)
            if (!post) throw new Error('No post found')

            return pubSub.asyncIterator(`comment ${postId}`)
        }
    },
    post: {
        subscribe(parent, args, {pubSub}, info) {
            return pubSub.asyncIterator('post')
        }
    }
}

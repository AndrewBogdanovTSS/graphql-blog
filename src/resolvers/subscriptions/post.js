export default {
    subscribe(parent, args, {pubSub}, info) {
        return pubSub.asyncIterator('post')
    }
}

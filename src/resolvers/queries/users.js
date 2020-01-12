export default (parent, {query}, {db}) => {
    const {users} = db
    if (!query) return users
    return users.filter(user => user.name.toLowerCase().includes(query.toLowerCase()))
}

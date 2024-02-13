const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.length == 0 ? 0 : blogs.reduce((prev, cur) => prev + cur.likes, 0)
}

module.exports = {
    dummy,
    totalLikes
}

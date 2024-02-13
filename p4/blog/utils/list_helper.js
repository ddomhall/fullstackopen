const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.length == 0 ? 0 : blogs.reduce((prev, cur) => prev + cur.likes, 0)
}

const favouriteBlog = (blogs) => {
    return blogs.reduce((prev, cur) => prev.likes >= cur.likes ? {
        title: prev.title,
        author: prev.author,
        likes: prev.likes
    } : {
            title: cur.title,
            author: cur.author,
            likes: cur.likes
        }, blogs[0])
}

const mostBlogs = (blogs) => {
    return 0
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}

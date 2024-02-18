import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, removeBlog, user }) => {
    const [expanded, setExpanded] = useState()

    return (
        <div>
            <div>title: {blog.title}</div>
            <div>author: {blog.author}</div>
            {expanded ?
                <>
                    <div>likes: {blog.likes}</div>
                    <div>user: {blog.user.name}</div>
                    <button onClick={() => setExpanded(false)}>hide</button>
                </>
                : <button onClick={() => setExpanded(true)}>expand</button>}
            <button onClick={() => likeBlog(blog.id)}>like</button>
            {blog.user.username === user.username && <button onClick={() => removeBlog(blog.id)}>remove</button>}
        </div>
    )}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    likeBlog: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired,
    user: PropTypes.object
}

export default Blog

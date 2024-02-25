import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Form from './components/Form'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState()
    const [errorMessage, setErrorMessage] = useState()

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')))
    }, [])

    useEffect(() => {
        getBlogs()
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setErrorMessage()
        }, 2500)
    }, [errorMessage])

    function getBlogs() {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }

    function addBlog(data) {
        blogService.create(data, user).then(res => {
            getBlogs(blogs)
            setErrorMessage(`${res.title} by ${res.author} added`)
        }).catch(err => setErrorMessage(err.response.data.error))
    }

    function likeBlog(id) {
        const blog = blogs.find(b => b.id === id)
        blogService.update(id, { ...blog, likes: blog.likes + 1 }, user)
        getBlogs(blogs)
    }

    function removeBlog(id) {
        if (window.confirm('are you sure?')) {
            blogService.remove(id, user)
            getBlogs(blogs)
        }
    }

    function logIn(data) {
        loginService.login(data).then(res => {
            setUser(res)
            setErrorMessage(`logged in as ${res.username}`)
            localStorage.setItem('user', JSON.stringify(res))
        }).catch(err => setErrorMessage(err.response.data.error))
    }

    function logOut() {
        setUser()
        localStorage.removeItem('user')
    }

    return (
        <>
            {user ?
                <>
                    <h2>blogs</h2>
                    <Form errorMessage={errorMessage} formAction={addBlog} fields={['title', 'author']} title={'add blog'} />
                    {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
                        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} user={user}/>
                    )}
                    <div>
                        <button onClick={logOut}>log out</button>
                    </div>
                </> : <>
                    <h2>log in</h2>
                    <Form errorMessage={errorMessage} formAction={logIn} fields={['username', 'password']} title={'log in'} />
                </>}
        </>
    )
}

export default App

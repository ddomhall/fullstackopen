import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState()

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )  
        setUser(JSON.parse(localStorage.getItem('user')))
    }, [])

    function logIn(e) {
        e.preventDefault()
        loginService.login({username: e.target.username.value, password: e.target.password.value}).then(res => {
            setUser(res)
            localStorage.setItem('user', JSON.stringify(res))
        })
        e.target.reset()
    }

    function logOut() {
        setUser()
        localStorage.removeItem('user')
    }

    function addBlog(e) {
        e.preventDefault()
        const newBlog = {
            title: e.target.title.value,
            author: e.target.author.value
        }
        blogService.create(newBlog, user.token)
    }

    return (
        <>
            {user ? 
                <>
                    <h2>blogs</h2>
                    <form onSubmit={addBlog}>
                        <input name='title' placeholder='title' />
                        <input name='author' placeholder='author' />
                        <input type='submit' value='add blog' />
                    </form>
                    {blogs.map(blog =>
                        <Blog key={blog.id} blog={blog} />
                    )}
                    <button onClick={logOut}>log out</button>
                </> : <>
                    <h2>log in</h2>
                    <form onSubmit={logIn}>
                        <input name='username' placeholder='username' />
                        <input name='password' placeholder='password' />
                        <input type='submit' value='log in' />
                    </form>
                </>}
        </>
    )
}

export default App

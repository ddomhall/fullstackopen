import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState()
    const [errorMessage, setErrorMessage] = useState()
    const [showLoginForm, setShowLoginForm] = useState()
    const [showBlogForm, setShowBlogForm] = useState()

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
        }).catch(err => {
                setErrorMessage(err.response.data.error)
                setTimeout(() => {
                    setErrorMessage()
                }, 3000)
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
        blogService.create(newBlog, user.token).then(res => {
            setBlogs(blogs.concat(newBlog))
            setErrorMessage(`${res.title} by ${res.author} added`)
            setTimeout(() => {
                setErrorMessage()
            }, 3000)
        }).catch(err => {
                setErrorMessage(err.response.data.error)
                setTimeout(() => {
                    setErrorMessage()
                }, 3000)
            })
    }

    return (
        <>
            {user ? 
                <>
                    <h2>blogs</h2>
                    {showBlogForm ? 
                        <>
                            <button onClick={() => setShowBlogForm(false)}>cancel</button>
                            <div>{errorMessage}</div>
                            <form onSubmit={addBlog}>
                                <input name='title' placeholder='title' />
                                <input name='author' placeholder='author' />
                                <input type='submit' value='add blog' />
                            </form>
                        </>
                        : <button onClick={() => setShowBlogForm(true)}>add blog</button>}
                    {blogs.map(blog =>
                        <Blog key={blog.id} blog={blog} />
                    )}
                    <button onClick={logOut}>log out</button>
                </> : <>
                    <h2>log in</h2>
                    {showLoginForm ? 
                        <>
                            <button onClick={() => setShowLoginForm(false)}>cancel</button>
                            <div>{errorMessage}</div>
                            <form onSubmit={logIn}>
                                <input name='username' placeholder='username' />
                                <input name='password' placeholder='password' />
                                <input type='submit' value='log in' />
                            </form>
                        </>
                        : <button onClick={() => setShowLoginForm(true)}>log in</button>}
                </>}
        </>
    )
}

export default App

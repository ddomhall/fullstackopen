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
    }, [])

    function handleSubmit(e) {
        e.preventDefault()
        loginService.login({username: e.target.username.value, password: e.target.password.value}).then(res => setUser(res))
    }

    return (
        <>
            <button onClick={() => setUser(!user)}>test</button>
            {user ? 
                <>
                    <h2>blogs</h2>
                    {blogs.map(blog =>
                        <Blog key={blog.id} blog={blog} />
                    )}
                </> : <>
                    <h2>log in</h2>
                    <form onSubmit={handleSubmit}>
                        <input name='username' placeholder='username' />
                        <input name='password' placeholder='password' />
                        <input type='submit' value='log in' />
                    </form>
                </>}
        </>
    )
}

export default App

import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import storageService from "./services/storage";
import {
    createInfo,
    createError,
    removeMessage,
} from "./reducers/messageReducer.js";
import { useDispatch, useSelector } from "react-redux";

import LoginForm from "./components/Login";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState("");
    //const [info, setInfo] = useState({ message: null });

    const blogFormRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        const user = storageService.loadUser();
        setUser(user);
    }, []);

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs));
    }, []);

    const info = useSelector((store) => store.messages);

    //const //notifyWith = (message, type = "info") => {
    //  setInfo({
    //    message,
    //    type,
    //  });

    //  setTimeout(() => {
    //    setInfo({ message: null });
    //  }, 3000);
    //};

    const login = async (username, password) => {
        try {
            const user = await loginService.login({ username, password });
            setUser(user);
            storageService.saveUser(user);
            dispatch(createInfo("welcome!"));
            setTimeout(() => {
                dispatch(removeMessage());
            }, 3000);
        } catch (e) {
            dispatch(createError("wrong username or password"));
            setTimeout(() => {
                dispatch(removeMessage());
            }, 3000);
        }
    };

    const logout = async () => {
        setUser(null);
        storageService.removeUser();
        dispatch(createInfo("logged out"));
        setTimeout(() => {
            dispatch(removeMessage());
        }, 3000);
    };

    const createBlog = async (newBlog) => {
        const createdBlog = await blogService.create(newBlog);
        dispatch(
            createInfo(
                `A new blog '${newBlog.title}' by '${newBlog.author}' added`,
            ),
        );
        setTimeout(() => {
            dispatch(removeMessage());
        }, 3000);
        setBlogs(blogs.concat(createdBlog));
        blogFormRef.current.toggleVisibility();
    };

    const like = async (blog) => {
        const blogToUpdate = {
            ...blog,
            likes: blog.likes + 1,
            user: blog.user.id,
        };
        const updatedBlog = await blogService.update(blogToUpdate);
        dispatch(
            createInfo(
                `A like for the blog '${blog.title}' by '${blog.author}'`,
            ),
        );
        setTimeout(() => {
            dispatch(removeMessage());
        }, 3000);
        setBlogs(blogs.map((b) => (b.id === blog.id ? updatedBlog : b)));
    };

    const remove = async (blog) => {
        const ok = window.confirm(
            `Sure you want to remove '${blog.title}' by ${blog.author}`,
        );
        if (ok) {
            await blogService.remove(blog.id);
            dispatch(
                createInfo(
                    `The blog' ${blog.title}' by '${blog.author} removed`,
                ),
            );
            setTimeout(() => {
                dispatch(removeMessage());
            }, 3000);
            setBlogs(blogs.filter((b) => b.id !== blog.id));
        }
    };

    if (!user) {
        return (
            <div>
                <h2>log in to application</h2>
                <Notification info={info} />
                <LoginForm login={login} />
            </div>
        );
    }

    const byLikes = (b1, b2) => b2.likes - b1.likes;

    return (
        <div>
            <h2>blogs</h2>
            <Notification info={info} />
            <div>
                {user.name} logged in
                <button onClick={logout}>logout</button>
            </div>
            <Togglable buttonLabel="new note" ref={blogFormRef}>
                <NewBlog createBlog={createBlog} />
            </Togglable>
            <div>
                {blogs.sort(byLikes).map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        like={() => like(blog)}
                        canRemove={user && blog.user.username === user.username}
                        remove={() => remove(blog)}
                    />
                ))}
            </div>
        </div>
    );
};

export default App;

import Blog from "./Blog";
import NewBlog from "./NewBlog";
import Togglable from "./Togglable";

export default function Blogs({
  blogs,
  user,
  blogFormRef,
  createBlog,
  like,
  remove,
}) {
  const byLikes = (b1, b2) => b2.likes - b1.likes;

  return (
    <>
      <h2>blogs</h2>
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
    </>
  );
}

import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const style = {
    marginBottom: 2,
    padding: 5,
    borderStyle: "solid",
    borderRadius: 5,
  };

  return (
    <div style={style} className="blog">
      <Link to={"/blogs/" + blog.id}>
        {blog.title} {blog.author}
      </Link>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    url: PropTypes.string,
    likes: PropTypes.number,
  }),
};

export default Blog;

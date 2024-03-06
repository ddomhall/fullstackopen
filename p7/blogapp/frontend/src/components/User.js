import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function User({ users }) {
  const id = useParams().id;
  const user = users.find((u) => u.id === id);

  if (!user) {
    return null;
  }

  return (
    <>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((b) => (
          <li key={b.id}>
            <Link to={"/blogs/" + b.id} className="underline">
              {b.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

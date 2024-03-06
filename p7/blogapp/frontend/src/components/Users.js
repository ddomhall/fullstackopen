import { Link } from "react-router-dom";

export default function Users({ users }) {
  return (
    <>
      <h2>users</h2>
      <table className="w-full">
        <thead className="border-b">
          <tr>
            <th>username</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>
                <Link to={"/users/" + u.id} className="underline">
                  {u.username}
                </Link>
              </td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

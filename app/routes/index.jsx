import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div>
      <h1>Hello World</h1>
      <nav>
        <ul>
          <li>
            <Link to="/about">Ir a About</Link>
          </li>
          <li>
            <Link to="/posts">Lista de posts</Link>
          </li>
          <li>
            <Link to="/posts/create">Crear un post</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

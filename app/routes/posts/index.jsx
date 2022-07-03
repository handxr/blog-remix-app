import { useLoaderData } from "@remix-run/react";
import { db } from "../../services/db";
export const loader = async () => {
  const posts = await db.post.findMany();
  return {
    posts,
  };
};

export default function Index() {
  const { posts } = useLoaderData();
  return (
    <>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </>
  );
}

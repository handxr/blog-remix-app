import { useLoaderData, useParams } from "@remix-run/react";
import { db } from "../../services/db";

export const loader = async ({ params }) => {
  const post = await db.post.findUnique({
    where: {
      id: params.postId,
    },
  });
  return { post };
};

export function ErrorBoundary({ error }) {
  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
    </div>
  );
}

export default function SinglePost() {
  const { post } = useLoaderData();
  return (
    <>
      <h2>Post title of {post.title}</h2>
      <p>{post.content}</p>
    </>
  );
}

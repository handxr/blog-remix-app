import { Form, useActionData, useTransition } from "@remix-run/react";
import { redirect, json } from "@remix-run/node";
import { db } from "../../services/db";

const badRequest = (data) => {
  return json(data, { status: 400 });
};

export const action = async ({ request }) => {
  const form = await request.formData();
  const title = form.get("title");
  const content = form.get("content");

  const fieldErrors = {
    title: !title ? "Title is required" : null,
    content: !content ? "Content is required" : null,
  };

  const hasErrors = Object.values(fieldErrors).some(Boolean);

  const fields = { title, content };

  if (hasErrors) {
    return badRequest({ fieldErrors, fields });
  }

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

  const post = await db.post.create({
    data: {
      title,
      content,
    },
  });

  return redirect(`/posts/${post.id}`);
};

export function ErrorBoundary({ error }) {
  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
    </div>
  );
}

export default function CreatePost() {
  const transition = useTransition();
  const actionData = useActionData();

  const { fieldErrors } = actionData ?? {};

  return (
    <>
      <h2>Create new post</h2>
      <Form method="POST" disabled={transition.state === "submitting"}>
        <div>
          <label htmlFor="title">Title</label>
          <br />
          <input type="text" name="title" id="title" placeholder="Post title" />
          {fieldErrors?.title && (
            <p style={{ color: "red" }}>{fieldErrors.title}</p>
          )}
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <br />
          <textarea name="content" id="content" placeholder="Post content" />
          {fieldErrors?.content && (
            <p style={{ color: "red" }}>{fieldErrors.content}</p>
          )}
        </div>
        <button type="submit">
          {transition.state === "submitting" ? "Submitting..." : "Submit"}
        </button>
      </Form>
    </>
  );
}

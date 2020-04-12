import React from "react";
import BaseLayout from "../../components/layouts/BaseLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
const Portfolio = (props) => {
  const router = useRouter();

  return (
    <BaseLayout>
      <h1>portfolio</h1>
      <p>{router.query.id}</p>
      <p>{props.post.body}</p>
      <h1>{props.post.title}</h1>
    </BaseLayout>
  );
};

Portfolio.getInitialProps = async (context) => {
  const postId = context.query.id;
  let post = {};
  // console.log("context", context);
  try {
    post = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
  } catch (e) {
    console.log(e);
  }
  return {
    post: post.data, // will be passed to the page component as props
  };
};

export default Portfolio;

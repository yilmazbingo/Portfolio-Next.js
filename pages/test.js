import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

const Test = (props) => {
  const router = useRouter();
  console.log("props", props);

  return (
    <BaseLayout>
      <h1>Test</h1>
      {props.post.title}
    </BaseLayout>
  );
};

Test.getInitialProps = async (context) => {
  const testId = context.query.id;
  let post = {};
  try {
    post = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${testId}`
    );
    console.log(post.data);
    return {
      post: post.data,
      yilmaz: "bir", // will be passed to the page component as props
    };
  } catch (e) {
    console.log(e);
  }
  // return {
  //   post: post.data, // will be passed to the page component as props
  // };
};

export default Test;

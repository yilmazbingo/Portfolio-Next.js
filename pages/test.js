import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

const Test = (props) => {
  console.log("props in test", props);
  const router = useRouter();

  return (
    <BaseLayout>
      <h1>Test</h1>
    </BaseLayout>
  );
};

// Test.getInitialProps = async (context) => {
//   console.log("context", context);
//   const testId = context.query.id;
//   let post = {};
//   try {
//     post = await axios.get(
//       `https://jsonplaceholder.typicode.com/posts/${testId}`
//     );
//     console.log(post.data);
//     return {
//       post: post.data,
//       yilmaz: "bir", // will be passed to the page component as props
//     };
//   } catch (e) {
//     console.log(e);
//   }
//   // return {
//   //   post: post.data, // will be passed to the page component as props
//   // };
// };

export default Test;

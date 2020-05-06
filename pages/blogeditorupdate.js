import React, { useState } from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import withAuth from "../components/hoc/withAuth";
import SlateEditor from "../components/slate-editor/Editor";
import { getBlogById, updateBlogAction } from "../actions/blogActions";

const BlogEditorUpdate = (props) => {
  const [isSaving, setSaving] = useState(false);
  const { blog } = props;

  return (
    <BaseLayout title="Yilmaz Bingol-Portfolio-">
      <BasePage title="write your story" className="blog-editor-page">
        <SlateEditor initialValue={blog.story} blog={blog}></SlateEditor>
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth("siteOwner")(BlogEditorUpdate);
BlogEditorUpdate.getInitialProps = async ({ query }) => {
  //we have to implement a new route
  const blogId = query.id;
  let blog = {};
  try {
    blog = await getBlogById(blogId);
  } catch (e) {
    console.error(e);
  }
  return { blog };
};

import React from "react";
import BaseLayout from "../components/layouts/BaseLayout";
import BasePage from "../components/BasePage";
import withAuth from "../components/hoc/withAuth";
import SlateEditor from "../components/slate-editor/Editor";

const BlogEditor = (props) => {
  return (
    <BaseLayout {...props.auth}>
      <BasePage title="write your story" className="blog-editor-page">
        <SlateEditor></SlateEditor>
      </BasePage>
    </BaseLayout>
  );
};

export default withAuth("siteOwner")(BlogEditor);

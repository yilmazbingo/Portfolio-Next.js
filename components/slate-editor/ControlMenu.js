import React, { useState } from "react";
import { Button } from "reactstrap";
import { createBlog } from "../../actions/blogActions";
import { serialize } from "./serialize";
import { Router } from "../../routes";
import { getTitle } from "../slate-editor/utils";

const ControlMenu = (props) => {
  const { editor } = props;
  const [isSaving, setSaving] = useState(false);

  // const saveBlog = async () => {
  //   let lockId = Math.floor(1000 + Math.random() * 9000);
  //   const blog = {};
  //   const text = serialize(editor);
  //   blog.title = getTitle(props).title;
  //   blog.subTitle = getTitle(props).subtitle;
  //   blog.story = text;
  //   setSaving(true);
  //   try {
  //     const createdBlog = await createBlog(blog, lockId);
  //     console.log("crea", createdBlog);
  //     setSaving(false);
  //     Router.pushRoute(`/blogs/${createdBlog._id}/edit`);
  //   } catch (err) {
  //     setSaving(false);
  //     const message = err || "Server Error";
  //     console.error(message);
  //   }
  // };
  return (
    <div className="control-menu">
      <h1 className="title">wirte your story</h1>
      <div className="status-box"> {isSaving ? "Saving" : "Saved"} </div>
      <Button disabled={isSaving} onClick={props.save} color="success">
        Save
      </Button>
    </div>
  );
};

export default ControlMenu;

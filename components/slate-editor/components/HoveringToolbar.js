import React, { useRef, useEffect } from "react";
import { useSlate, ReactEditor } from "slate-react";
import { Portal, Menu } from "../Components";
import { css } from "emotion";
import FormatButton from "./FormatButton";
import { Range, Editor } from "slate";

const HoveringToolbar = () => {
  const ref = useRef();
  //useSlate is a hook
  const editor = useSlate();
  //When a ref is passed to an element in render, a reference to the node becomes accessible at the current attribute of the ref.
  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;
    // console.log("editor", editor);

    if (!el) {
      return;
    }

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ""
    ) {
      el.removeAttribute("style");
      return;
    }

    const domSelection = window.getSelection();
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();
    el.style.opacity = 1;
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
    el.style.left = `${
      rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
    }px`;
  });
  return (
    <Portal>
      <Menu
        ref={ref}
        className={css`
          padding: 8px 7px 6px;
          position: absolute;
          z-index: 1;
          top: -10000px;
          left: -10000px;
          margin-top: -6px;
          opacity: 0;
          background-color: #222;
          border-radius: 4px;
          transition: opacity 0.75s;
        `}
      >
        <FormatButton format="bold" icon="format_bold" />
        <FormatButton format="italic" icon="format_italic" />
        <FormatButton format="underlined" icon="format_underlined" />
      </Menu>
    </Portal>
  );
};

export default HoveringToolbar;

// {props.blog ? (
//   <button onClick={updateBlog}>Update</button>
// ) : (
//   <ControlMenu editor={editor} value={value}></ControlMenu>
// )}

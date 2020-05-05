import React, { useCallback, useMemo, useState, useEffect } from "react";
import isHotkey from "is-hotkey";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import { Editor, Transforms, createEditor, Node } from "slate";
import { withHistory } from "slate-history";
import { defaultValue } from "./dafaultValue";
import { deserialize } from "./deserialize";
import HoveringToolbar from "./components/HoveringToolbar";
import { Button, Icon, Toolbar } from "./Components";
import ControlMenu from "./ControlMenu";
import { toggleFormat, isFormatActive } from "./utils";
import { updateBlogAction } from "../../actions/blogActions";
import { serialize } from "../slate-editor/serialize";
import { createBlog } from "../../actions/blogActions";
import { Router } from "../../routes";
import { getTitle } from "../slate-editor/utils";
import { toast } from "react-toastify";

//------------------SLATE DOES NOT CONNECT TO THE REDUX--------------------
const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const SlateEditor = (props) => {
  const [value, setValue] = useState(defaultValue);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const { blog } = props;

  const [isSaving, setSaving] = useState(false);

  const saveBlog = async () => {
    let lockId = Math.floor(1000 + Math.random() * 9000);
    const blog = {};
    const text = serialize(editor);
    blog.title = getTitle(editor).title;
    blog.subTitle = getTitle(editor).subtitle;
    blog.story = text;
    setSaving(true);
    try {
      const createdBlog = await createBlog(blog, lockId);
      console.log("crea", createdBlog);
      setSaving(false);
      Router.pushRoute(`/blogs/${createdBlog._id}/edit`);
    } catch (err) {
      setSaving(false);
      const message = err || "Server Error";
      console.error(message);
    }
  };

  //----------UPDATE THE BLOG----------------------
  const updateBlog = () => {
    const newBlog = {};
    newBlog.title = value[0].children[0] ? value[0].children[1] : null;
    newBlog.subTitle = value[0].children[1] ? value[0].children[1] : null;
    newBlog.story = serialize(editor);
    setSaving(true);
    console.log("yilmaz");
    updateBlogAction(newBlog, blog._id)
      .then((updatedBlog) => {
        setSaving(false);
        toast.success("blog is saved");

        console.log("upgraded blog", updatedBlog);
      })
      .catch((err) => {
        setSaving(false);
        const message = err.message || "Server Error";
        toast.error(message);
        console.error(message);
      });
    console.log("yilmaz");
  };

  //-----------------------------SET THE INITIAL VALUE------------------------------
  useEffect(() => {
    const valueFromProps = props.initialValue;
    const document = new DOMParser().parseFromString(
      valueFromProps,
      "text/html"
    );
    const deserialized = deserialize(document.body);
    const initialValue = valueFromProps ? deserialized : defaultValue;
    setValue(initialValue);
  }, []);

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <Toolbar>
        <MarkButton format="bold" icon="format_bold" />
        <MarkButton format="italic" icon="format_italic" />
        <MarkButton format="underline" icon="format_underlined" />
        <MarkButton format="code" icon="code" />
        <BlockButton format="heading-one" icon="looks_one" />
        <BlockButton format="heading-two" icon="looks_two" />
        <BlockButton format="block-quote" icon="format_quote" />
        <BlockButton format="numbered-list" icon="format_list_numbered" />
        <BlockButton format="bulleted-list" icon="format_list_bulleted" />
      </Toolbar>
      <HoveringToolbar />
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        onDOMBeforeInput={(event) => {
          switch (event.inputType) {
            case "formatBold":
              return toggleFormat(editor, "bold");
            case "formatItalic":
              return toggleFormat(editor, "italic");
            case "formatUnderline":
              return toggleFormat(editor, "underline");
          }
        }}
        onKeyDown={(event) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              event.preventDefault();
              const mark = HOTKEYS[hotkey];
              toggleMark(editor, mark);
            }
          }
          if (
            !isSaving &&
            event.which === 83 &&
            (event.ctrlKey || event.metaKey)
          ) {
            event.preventDefault();
            saveBlog();
            return;
          }
        }}
      ></Editable>
      {props.blog ? (
        <button onClick={updateBlog}>Update</button>
      ) : (
        <ControlMenu
          editor={editor}
          value={value}
          save={saveBlog}
        ></ControlMenu>
      )}
    </Slate>
  );
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) => LIST_TYPES.includes(n.type),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === format,
  });

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

export default SlateEditor;

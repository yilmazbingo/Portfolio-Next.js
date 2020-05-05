import { Editor, Transforms } from "slate";

export const toggleFormat = (editor, format) => {
  const isActive = isFormatActive(editor, format);
  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: Text.isText, split: true }
  );
};

export const isFormatActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n[format] === true,
    mode: "all",
  });
  return !!match;
};

// export const getTitle = (props) => {
//   const firstBlock = props.editor.children[0].children[0];
//   const secondBlock = props.editor.children[0].children[1];
//   const title = firstBlock && firstBlock.text ? firstBlock.text : "No  Title";
//   const subtitle =
//     secondBlock && secondBlock.text ? secondBlock.text : "No Subtitle";

//   return {
//     title,
//     subtitle,
//   };
// };

export const getTitle = (editor) => {
  const firstBlock = editor.children[0].children[0];
  const secondBlock = editor.children[0].children[1];
  const title = firstBlock && firstBlock.text ? firstBlock.text : "No  Title";
  const subtitle =
    secondBlock && secondBlock.text ? secondBlock.text : "No Subtitle";

  return {
    title,
    subtitle,
  };
};

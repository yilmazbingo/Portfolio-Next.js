import { Node, Text } from "slate";
import escapeHtml from "escape-html";

export const serialize = (node) => {
  if (Text.isText(node)) {
    return escapeHtml(node.text);
  }

  const children = node.children.map((n) => serialize(n)).join("");

  switch (node.type) {
    case "quote":
      return `<blockquote><p>${children}</p></blockquote>`;
    case "paragraph":
      return `<p>${children}</p>`;
    case "link":
      return `<a href="${escapeHtml(node.url)}">${children}</a>`;
    case "bulleted-list":
      return <ul>{children}</ul>;
    case "list-item":
      return <li>{children}</li>;
    case "numbered-list":
      return <ol>{children}</ol>;
    case "heading-one":
      return <h1>{children}</h1>;
    case "heading-two":
      return <h2>{children}</h2>;
    default:
      return children;
  }
};

import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import "./renderMarkdown.scss";

function RenderMarkdown({ content }) {
  return (
    <div className="article-container">
      <ReactMarkdown children={content} rehypePlugins={[rehypeRaw]} />
    </div>
  );
}

export default RenderMarkdown;

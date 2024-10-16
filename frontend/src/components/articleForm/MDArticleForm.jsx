import React, { useState } from "react";
import MDEditor, { commands } from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { FaEye } from "react-icons/fa";

const customPreviewCommand = {
  name: "custom-preview",

  keyCommand: "custom-preview",

  buttonProps: { "aria-label": "Generate Preview" },

  icon: <FaEye />,
};

function MDArticleForm() {
  const [value, setValue] = React.useState("**Hello world!!!**");
  return (
    <MDEditor
      value={value}
      onChange={(val) => setValue(val || "")}
      commands={[
        // customBoldCommand,
        commands.bold,
        commands.italic,
        commands.link,
        customPreviewCommand,
      ]}
    />
  );
  //   return (
  //     <div className="">
  //       <MDEditor
  //         value={value}
  //         onChange={setValue}
  //         commands={[
  //           commands.bold,
  //           commands.italic,
  //           commands.link,
  //           // Add or remove commands as needed
  //         ]}
  //       />
  //     </div>
  //   );

  //   return (
  //     <MDEditor
  //       value={value}
  //       onChange={(val) => setValue(val || "")}
  //   commands={[
  //     commands.bold,
  //     commands.italic,
  //     commands.link,
  //     // Add or remove commands as needed
  //   ]}
  //     />
  //   );
}

export default MDArticleForm;

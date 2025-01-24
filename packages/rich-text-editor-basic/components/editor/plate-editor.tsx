"use client";

import { ParagraphPlugin, Plate } from "@udecode/plate/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { useCreateEditor } from "@/components/editor/use-create-editor";
import { Editor, EditorContainer } from "@/components/plate-ui/editor";

const defaultValue = [
  {
    children: [{ text: "Basic Editor" }],
    type: "h1",
  },
  {
    children: [{ text: "Heading 2" }],
    type: "h2",
  },
  {
    children: [{ text: "Heading 3" }],
    type: "h3",
  },
  {
    children: [{ text: "This is a blockquote element" }],
    type: "blockquote",
  },
  {
    children: [
      { text: "Basic marks: " },
      { bold: true, text: "bold" },
      { text: ", " },
      { italic: true, text: "italic" },
      { text: ", " },
      { text: "underline", underline: true },
      { text: ", " },
      { strikethrough: true, text: "strikethrough" },
      { text: "." },
    ],
    type: ParagraphPlugin.key,
  },
];

export const PlateEditor = () => {
  const editor = useCreateEditor({
    defaultValue,
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate
        editor={editor}
        onChange={(newValue) => {
          console.log("new >>", newValue);
        }}>
        <EditorContainer>
          <Editor placeholder="Type..." variant="demo" />
        </EditorContainer>
      </Plate>
    </DndProvider>
  );
};

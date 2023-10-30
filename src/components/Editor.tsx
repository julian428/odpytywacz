import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import MenuBar from "./ManuBar";
import { useState } from "react";

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  Image,
];

export default function Editor({ content }: { content: string }) {
  const [editorContent, setEditorContent] = useState(content);
  return (
    <>
      <input type="hidden" name="editor-content" value={editorContent} />
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={content}
        children={null}
        onUpdate={(editor) => {
          setEditorContent(editor.editor.getHTML());
        }}
        editorProps={{
          attributes: {
            class: "p-2 outline-none max-w-none prose prose-xl",
          },
        }}
      ></EditorProvider>
    </>
  );
}

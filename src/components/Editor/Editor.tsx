import { EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import MenuBar from "./MenuBar/MenuBar";

const extensions = [
  StarterKit,
  TextAlign.configure({
    types: ["headings", "paragraph"],
  }),
];

export default function Editor({ content }: { content: string }) {
  const editorClass =
    "rounded-b-xl text-white px-2 pt-1 bg-white bg-opacity-20 outline-none border border-2 border-accent w-full h-96 prose";
  return (
    <EditorProvider
      slotBefore={<MenuBar />}
      extensions={extensions}
      content={content}
      editorProps={{
        attributes: { class: editorClass },
      }}
    >
      {""}
    </EditorProvider>
  );
}

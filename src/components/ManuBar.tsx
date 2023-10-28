import { useCurrentEditor } from "@tiptap/react";
import {
  BiBold,
  BiCodeAlt,
  BiCodeBlock,
  BiItalic,
  BiListOl,
  BiListUl,
  BiStrikethrough,
} from "react-icons/bi";
import { GoHorizontalRule } from "react-icons/go";
import { LuHeading1, LuHeading2, LuHeading3 } from "react-icons/lu";

export default function MenuBar() {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <ul className="menu menu-xs items-center bg-neutral sticky top-0 z-10 [&_li>*]:rounded-none menu-horizontal border-b border-base-100">
      <li>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`text-2xl ${
            editor.isActive("heading", { level: 2 }) && "text-primary"
          }`}
        >
          <LuHeading1 />
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`text-2xl ${
            editor.isActive("heading", { level: 3 }) && "text-primary"
          }`}
        >
          <LuHeading2 />
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={`text-2xl ${
            editor.isActive("heading", { level: 4 }) && "text-primary"
          }`}
        >
          <LuHeading3 />
        </button>
      </li>
      <li className="border h-full m-0 border-base-100 mx-2"></li>
      <li>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`text-2xl ${editor.isActive("bold") && "text-primary"}`}
        >
          <BiBold />
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`text-2xl ${editor.isActive("italic") && "text-primary"}`}
        >
          <BiItalic />
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`text-2xl ${editor.isActive("strike") && "text-primary"}`}
        >
          <BiStrikethrough />
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={`text-2xl ${editor.isActive("code") && "text-primary"}`}
        >
          <BiCodeAlt />
        </button>
      </li>
      <li className="border h-full m-0 border-base-100 mx-2"></li>
      <li>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`text-2xl ${
            editor.isActive("bulletList") && "text-primary"
          }`}
        >
          <BiListUl />
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`text-2xl ${
            editor.isActive("orderedList") && "text-primary"
          }`}
        >
          <BiListOl />
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <GoHorizontalRule />
        </button>
      </li>
      <li className="border h-full m-0 border-base-100 mx-2"></li>
      <li>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`text-2xl ${
            editor.isActive("codeBlock") && "text-primary"
          }`}
        >
          <BiCodeBlock />
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`text-2xl ${
            editor.isActive("blockquote") && "text-primary"
          }`}
        >
          &ldquo; &rdquo;
        </button>
      </li>
    </ul>
  );
}

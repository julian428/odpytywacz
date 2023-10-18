import { useCurrentEditor } from "@tiptap/react";
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  BulletListIcon,
  ImageIcon,
  ItalicIcon,
  LinkIcon,
  OrderedListIcon,
  PencilLineIcon,
  TableIcon,
  TextColorIcon,
} from "../../../lib/icons";
import ActionButton from "./ActionButton";

export default function MenuBar() {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  const editorHelper = () => editor.chain().focus();

  return (
    <nav className="bg-accent flex gap-1 text-black p-2 rounded-t-xl text-xl">
      <div className="divider divider-vertical"></div>
      <ActionButton click={() => editorHelper().setTextAlign("left").run()}>
        <AlignLeftIcon />
      </ActionButton>
      <ActionButton click={() => editorHelper().setTextAlign("center").run()}>
        <AlignCenterIcon />
      </ActionButton>
      <ActionButton click={() => editorHelper().setTextAlign("right").run()}>
        <AlignRightIcon />
      </ActionButton>
      <div className="divider divider-vertical"></div>
      <ActionButton
        click={() => editorHelper().toggleBold().run()}
        active={editor.isActive("bold")}
      >
        <BoldIcon />
      </ActionButton>
      <ActionButton
        click={() => editorHelper().toggleItalic().run()}
        active={editor.isActive("italic")}
      >
        <ItalicIcon />
      </ActionButton>
      <ActionButton>
        <TextColorIcon />
      </ActionButton>
      <ActionButton>
        <PencilLineIcon />
      </ActionButton>
      <div className="divider divider-vertical"></div>
      <ActionButton className="text-2xl">
        <BulletListIcon />
      </ActionButton>
      <ActionButton>
        <OrderedListIcon />
      </ActionButton>
      <div className="divider divider-vertical"></div>
      <ActionButton>
        <LinkIcon />
      </ActionButton>
      <ActionButton>
        <ImageIcon />
      </ActionButton>
      <ActionButton>
        <TableIcon />
      </ActionButton>
    </nav>
  );
}

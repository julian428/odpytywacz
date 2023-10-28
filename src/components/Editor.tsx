import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";

interface Props {
  content?: string;
  saveContent?: string;
  saveParams?: any[];
}

export default function Editor({ content, saveContent, saveParams }: Props) {
  const [saving, setSaving] = useState(false);
  const delay = 5000;
  let delaySave: any;

  const saveContentManager = (event: any, editor: any) => {
    if (saving) {
      clearTimeout(delaySave);
    } else {
      setSaving(true);
    }
    delaySave = setTimeout(async () => {
      const savingFunc = new Function("return " + saveContent)();
      await savingFunc(editor, ...(saveParams || []));
      setSaving(false);
    }, delay);
  };
  return (
    <div className="prose w-full">
      <CKEditor
        data={content}
        editor={ClassicEditor}
        onChange={saveContentManager}
      />
    </div>
  );
}

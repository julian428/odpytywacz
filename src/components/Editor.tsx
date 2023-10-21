import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface Props {
  content?: string;
}

export default function Editor({ content }: Props) {
  return (
    <div className="prose">
      <CKEditor data={content} editor={ClassicEditor} />
    </div>
  );
}

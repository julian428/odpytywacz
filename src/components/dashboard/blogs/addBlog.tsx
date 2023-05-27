import SubmitToast from "@/components/ui/serverSubmit";
import { AddIcon } from "@/lib/icons";

export default function AddBlog() {
  return (
    <SubmitToast message="Dostępne w krótce">
      <AddIcon className="w-14 h-14 text-color1" />
    </SubmitToast>
  );
}

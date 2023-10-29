import { InfoIcon } from "@lib/icons";

interface Props {
  tip: string;
}

export default function Tooltip({ tip }: Props) {
  return (
    <div
      className="tooltip tooltip-left tooltip-info"
      data-tip={tip || "no tip"}
    >
      <button type="button" className="btn btn-circle btn-ghost btn-xs text-lg">
        <InfoIcon />
      </button>
    </div>
  );
}

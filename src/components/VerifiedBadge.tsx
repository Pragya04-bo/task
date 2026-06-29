import { CheckCircle2 } from "lucide-react";

interface VerifiedBadgeProps {
  verified: boolean;
  className?: string;
}

export function VerifiedBadge({ verified, className = "w-4 h-4" }: VerifiedBadgeProps) {
  if (!verified) return null;
  return (
    <span title="Verified Creator" className="inline-flex items-center text-sky-500 fill-sky-500 ml-1.5 align-middle">
      <CheckCircle2 className={`${className} fill-current text-white`} />
    </span>
  );
}

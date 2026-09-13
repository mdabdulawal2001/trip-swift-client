import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SectionTitle({
  title,
  action,
  href,
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="font-bold text-slate-900 dark:text-white">
        {title}
      </h2>

      <Link
        href={href}
        className="inline-flex items-center gap-1 text-xs font-semibold text-sky-500 hover:text-sky-600"
      >
        {action}

        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
export default function ProgressRow({
  label,
  value,
  progress,
}) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="font-medium text-slate-600 dark:text-slate-300">
          {label}
        </span>

        <span className="font-bold text-slate-900 dark:text-white">
          {value}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className="h-full rounded-full bg-sky-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
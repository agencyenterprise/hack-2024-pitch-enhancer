interface OptimizedScriptAreaProps {
  script: string;
}

export default function OptimizedScriptArea({
  script,
}: OptimizedScriptAreaProps) {
  if (!script) return null;

  return (
    <div className="w-full max-w-2xl p-6 bg-gray-500/30 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">
          Optimized 3-Minute Script
        </h2>
      </div>
      <div className="text-white whitespace-pre-wrap">{script}</div>
    </div>
  );
}

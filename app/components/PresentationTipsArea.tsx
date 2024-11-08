interface PresentationTipsAreaProps {
  tips: string;
}

export default function PresentationTipsArea({
  tips,
}: PresentationTipsAreaProps) {
  if (!tips) return null;

  return (
    <div className="w-full max-w-2xl p-6 bg-gray-500/30 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Presentation Tips</h2>
      </div>
      <p className="text-white">{tips}</p>
    </div>
  );
}

interface TranscriptionAreaProps {
  transcription: string;
}

export default function TranscriptionArea({
  transcription,
}: TranscriptionAreaProps) {
  if (!transcription) return null;

  return (
    <div className="w-full max-w-2xl p-6 bg-gray-500/30 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Transcription</h2>
      </div>
      <p className="text-white">{transcription}</p>
    </div>
  );
}

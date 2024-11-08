interface WordCountAreaProps {
  wordCount: Array<{ word: string, count: number }>;
}

export default function WordCountArea({ wordCount }: WordCountAreaProps) {
  if (!wordCount) return null;

  const topWords = wordCount.slice(0, 4);

  return (
    <div className="w-full max-w-2xl mt-8 p-6 bg-gray-500/30 rounded-lg">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white">Word Counts</h2>
        <p className="text-white mt-2">This are the four words that most appear in your presentation.</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {topWords.map(({ word, count }, index) => (
          <div 
            key={index}
            className="bg-gray-600/50 p-4 rounded-lg flex flex-col items-center justify-center"
          >
            <span className="text-lg font-semibold text-white mb-2">{word}</span>
            <span className="text-2xl font-bold text-white">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

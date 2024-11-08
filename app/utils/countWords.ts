export function countWords(text: string): Array<{ word: string, count: number }> {
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove punctuation
    .split(/\s+/)            // Split on whitespace
    .filter(word => word.length > 0); // Remove empty strings

  let wordCount: Record<string, number> = {};

  words.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });
  
  // Convert to array of objects and sort
  return Object.entries(wordCount)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count);
}

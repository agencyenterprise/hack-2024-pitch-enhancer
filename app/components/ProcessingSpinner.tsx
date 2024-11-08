import { useState, useEffect } from "react";

const processingMessages = [
  {
    loading_message: "Analyzing your presentation style...",
    partial_load_complete: "Found: Expert TED talk hand-waving",
  },
  {
    loading_message: "Detecting speech patterns...",
    partial_load_complete: "Located: 17 nervous coffee sips",
  },
  {
    loading_message: "Evaluating pace and timing...",
    partial_load_complete: "Speed: Auctioneer meets sloth",
  },
  {
    loading_message: "Identifying key talking points...",
    partial_load_complete: "Source: Your palm notes",
  },
  {
    loading_message: "Measuring voice modulation...",
    partial_load_complete: "Range: Mouse whisper to fog horn",
  },
  {
    loading_message: "Examining presentation structure...",
    partial_load_complete: "Status: Death by PowerPoint",
  },
  {
    loading_message: "Checking for filler words...",
    partial_load_complete: "Um count: ∞",
  },
  {
    loading_message: "Analyzing engagement factors...",
    partial_load_complete: "Audience status: Shopping online",
  },
  {
    loading_message: "Processing vocal clarity...",
    partial_load_complete: "Mic technique: Either eating or avoiding it",
  },
  {
    loading_message: "Evaluating presentation flow...",
    partial_load_complete: "Style: Chaos with transitions",
  },
  {
    loading_message: "Calculating hand gestures...",
    partial_load_complete: "Result: Invisible orchestra conductor",
  },
  {
    loading_message: "Monitoring audience reactions...",
    partial_load_complete: "Activity: Buzzword bingo in progress",
  },
  {
    loading_message: "Assessing eye contact...",
    partial_load_complete: "Target acquired: Ceiling fan",
  },
  {
    loading_message: "Analyzing slide density...",
    partial_load_complete: "Warning: Text overflow detected",
  },
  {
    loading_message: "Measuring confidence levels...",
    partial_load_complete: "Status: Human pretzel",
  },
  {
    loading_message: "Scanning technical setup...",
    partial_load_complete: "Problem: Projector winning",
  },
  {
    loading_message: "Evaluating audience questions...",
    partial_load_complete: "Type: Comments in disguise",
  },
  {
    loading_message: "Processing presentation attire...",
    partial_load_complete: "Look: Forgot until 5 minutes ago",
  },
  {
    loading_message: "Analyzing time management...",
    partial_load_complete: "Progress: Still on title slide",
  },
  {
    loading_message: "Measuring rapport building...",
    partial_load_complete: "Status: Weather talk overload",
  },
];

const ProcessingSpinner = () => {
  const [currentMessageObj, setCurrentMessageObj] = useState(
    processingMessages[0]
  );
  const [showPartialComplete, setShowPartialComplete] = useState(false);

  useEffect(() => {
    // Show loading message for 5 seconds, then show partial complete
    const messageInterval = setInterval(() => {
      // Get new random message and reset to loading state
      const newMessage =
        processingMessages[
          Math.floor(Math.random() * processingMessages.length)
        ];
      setCurrentMessageObj(newMessage);
      setShowPartialComplete(false);

      // After 5 seconds, show the partial complete message
      const partialTimer = setTimeout(() => {
        setShowPartialComplete(true);
      }, 3000);

      return () => clearTimeout(partialTimer);
    }, 5000); // Total cycle time: 7 seconds (5s loading + 2s partial complete)

    return () => clearInterval(messageInterval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-300"></div>
      <p className="text-red-300 text-sm animate-pulse">
        {showPartialComplete
          ? currentMessageObj.partial_load_complete
          : currentMessageObj.loading_message}
      </p>
    </div>
  );
};

export default ProcessingSpinner;

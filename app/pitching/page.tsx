"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import tealEllipse from "../../images/ellipse-3.png";
import pinkEllipse from "../../images/ellipse-4.png";
import {
  MicrophoneIcon,
  StopIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

import "../globals.css";
import TranscriptionArea from "../components/TranscriptionArea";
import PresentationTipsArea from "../components/PresentationTipsArea";
import { countWords } from "../utils/countWords";
import WordCountArea from "../components/WordCountArea";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProcessingSpinner from "../components/ProcessingSpinner";
import OptimizedScriptArea from "../components/OptimizedScriptArea";

enum View {
  Transcription = "transcription",
  Tips = "tips",
  WordCount = "wordCount",
  OptimizedScript = "optimizedScript",
}

const views = [
  View.Transcription,
  View.Tips,
  View.WordCount,
  View.OptimizedScript,
];

const Home: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob>();
  const [transcription, setTranscription] = useState<string | null>(null);
  const [presentationTips, setPresentationTips] = useState<string | null>(null);
  const [wordCount, setWordCount] = useState<Array<{
    word: string;
    count: number;
  }> | null>(null);
  const [currentView, setCurrentView] = useState<View>(View.Transcription);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [isProcessingTips, setIsProcessingTips] = useState<boolean>(false);
  const [optimizedScript, setOptimizedScript] = useState<string | null>(null);
  const [isGeneratingScript, setIsGeneratingScript] = useState<boolean>(false);

  useEffect(() => {
    if (!audioBlob) return;
    transcribeAudio(audioBlob);
  }, [audioBlob]);

  useEffect(() => {
    if (!transcription) return;
    setWordCount(countWords(transcription));
    getPresentationTips(transcription);
  }, [transcription]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white text-xl"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  // Only render the main content if authenticated
  if (!session) {
    return null;
  }
  const requestMicrophonePermission = async (): Promise<boolean> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      return true;
    } catch (error) {
      console.error("Microphone access denied:", error);
      alert("Please enable microphone access in your browser settings.");
      return false;
    }
  };

  const startRecording = async () => {
    const hasMicrophonePermission = await requestMicrophonePermission();
    if (!hasMicrophonePermission) {
      setIsRecording(false);
      return;
    }

    setIsRecording(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
        setAudioBlob(audioBlob);
      };

      mediaRecorderRef.current.start();
    } catch (error) {
      console.error("Error starting recording:", error);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  const clearRecording = () => {
    setAudioUrl(null);
    setTranscription(null);
    setPresentationTips(null);
    audioChunksRef.current = [];
  };

  const transcribeAudio = async (audioBlob: Blob) => {
    const formData = new FormData();
    const audioFile = new File([audioBlob], "audio.wav", { type: "audio/wav" });
    formData.append("file", audioFile);
    formData.append("model", "whisper-1");
    formData.append("type", "transcribe");

    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setTranscription(data.text);
    } catch (error) {
      console.error("Error transcribing audio:", error);
      alert("There was an error transcribing the audio.");
    }
  };

  const getPresentationTips = async (transcribedText: string) => {
    setIsProcessingTips(true);
    const formData = new FormData();
    formData.append("transcription", transcribedText);
    formData.append("type", "tips");

    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setPresentationTips(data);
    } catch (error) {
      console.error("Error getting presentation tips:", error);
      alert("There was an error getting presentation tips.");
    } finally {
      setIsProcessingTips(false);
    }
  };

  const handleNextView = () => {
    const nextIndex = (views.indexOf(currentView) + 1) % views.length;
    setCurrentView(views[nextIndex]);
  };

  const handlePreviousView = () => {
    const previousIndex =
      (views.indexOf(currentView) - 1 + views.length) % views.length;
    setCurrentView(views[previousIndex]);
  };

  const generateOptimizedScript = async () => {
    if (!transcription || !presentationTips) return;
    setIsGeneratingScript(true);

    const formData = new FormData();
    formData.append("type", "optimize");
    formData.append("transcription", transcription);
    formData.append("tips", presentationTips);

    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setOptimizedScript(data.optimizedScript);
      setCurrentView(View.OptimizedScript);
    } catch (error) {
      console.error("Error generating optimized script:", error);
      alert("There was an error generating the optimized script.");
    } finally {
      setIsGeneratingScript(false);
    }
  };

  return (
    <div className="relative ">
      <Image
        src={tealEllipse}
        alt="teal gradient, background decoration"
        className="absolute left-0 top-0 -z-10 opacity-60"
      />
      <Image
        src={pinkEllipse}
        alt="pink gradient, background decoration"
        className="absolute right-0 top-[20%] -z-10 opacity-60"
      />

      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          <h1 className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gray-500/30 border border-gray-200/30 backdrop-blur-sm">
            <MicrophoneIcon className="h-8 w-8 text-red-300" />
            <p>
              <span className="font-bold text-white text-3xl">Pitch</span>{" "}
              <span className="font-thin text-red-300 text-3xl">Enhancer</span>
            </p>
          </h1>

          <h2 className="text-white text-4xl font-bold max-w-2xl leading-relaxed">
            Transform Your Presentations with
            <span className="text-red-300"> AI-Powered </span>
            Feedback
          </h2>

          <p className="text-gray-300 max-w-xl mx-auto">
            Record your presentation and get instant, intelligent feedback to
            improve your public speaking skills.
          </p>

          {!isRecording && !audioUrl && (
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="pt-12"
            >
              <ArrowDownIcon className="h-8 w-8 text-red-300 mx-auto" />
            </motion.div>
          )}
        </motion.div>

        {/* Recording Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 space-y-8 flex items-center flex-col"
        >
          <button
            onClick={isRecording ? stopRecording : startRecording}
            className="p-16 bg-red-400/80 rounded-full hover:bg-red-600 transition-all hover:scale-105 relative group"
          >
            <div className="absolute inset-0 -m-2 rounded-full bg-gray-500/30 animate-pulse"></div>
            <div className="absolute inset-0 -m-4 rounded-full bg-red-400/20 group-hover:bg-red-600/20 transition-all"></div>
            {isRecording ? (
              <StopIcon className="h-8 w-8 text-white" />
            ) : (
              <MicrophoneIcon className="h-8 w-8 text-white" />
            )}
          </button>

          {/* Audio Controls */}
          {audioUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="flex gap-4 w-full ">
                <button
                  onClick={playAudio}
                  disabled={isRecording}
                  className="px-6 py-2 bg-gray-500/30 rounded-full text-white hover:bg-gray-500/50 transition-colors w-1/2"
                >
                  Play Audio
                </button>
                <button
                  onClick={clearRecording}
                  className="px-6 py-2 bg-gray-500/30 rounded-full text-white hover:bg-gray-500/50 transition-colors w-1/2"
                >
                  Clear
                </button>
              </div>
              <audio src={audioUrl} controls className="mt-4" />
            </motion.div>
          )}
        </motion.div>

        {/* Results Section */}
        {transcription && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl mt-12 p-6 bg-gray-500/10 backdrop-blur-sm rounded-2xl border border-gray-200/10"
          >
            <div className="flex items-center gap-4 py-8">
              <button
                onClick={handlePreviousView}
                className="p-2 bg-gray-500/30 rounded-full text-red-300 hover:text-red-400 hover:bg-gray-500/50 transition-colors"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>

              {currentView === "transcription" ? (
                <TranscriptionArea transcription={transcription || ""} />
              ) : currentView === View.Tips ? (
                <div className="flex-1">
                  {isProcessingTips ? (
                    <div className="flex items-center justify-center h-full">
                      <ProcessingSpinner />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <PresentationTipsArea tips={presentationTips || ""} />
                      <button
                        onClick={generateOptimizedScript}
                        disabled={isGeneratingScript}
                        className="w-full px-6 py-3 bg-red-400/80 rounded-lg text-white hover:bg-red-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isGeneratingScript ? (
                          <>
                            <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
                            <span>Generating Script...</span>
                          </>
                        ) : (
                          <>
                            <span>Generate 3-Minute Optimized Script</span>
                            <ChevronRightIcon className="h-5 w-5" />
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              ) : currentView === View.WordCount ? (
                <WordCountArea wordCount={wordCount || []} />
              ) : (
                <OptimizedScriptArea script={optimizedScript || ""} />
              )}

              <button
                onClick={handleNextView}
                className="p-2 bg-gray-500/30 rounded-full text-red-300 hover:text-red-400 hover:bg-gray-500/50 transition-colors"
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Home;

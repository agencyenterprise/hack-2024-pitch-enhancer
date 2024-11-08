"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import tealEllipse from "../images/ellipse-3.png";
import pinkEllipse from "../images/ellipse-4.png";
import {
  MicrophoneIcon,
  StopIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";

import "./globals.css";
import TranscriptionArea from "./components/TranscriptionArea";
import PresentationTipsArea from "./components/PresentationTipsArea";
import { countWords } from "./utils/countWords";
import WordCountArea from "./components/WordCountArea";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

enum View {
  Transcription = "transcription",
  Tips = "tips",
  WordCount = "wordCount",
}

const views = [View.Transcription, View.Tips, View.WordCount];

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
        <div className="text-white text-xl">Loading...</div>
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
      setPresentationTips(data.choices[0].message.content);
    } catch (error) {
      console.error("Error getting presentation tips:", error);
      alert("There was an error getting presentation tips.");
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

  return (
    <div>
      <Image
        src={tealEllipse}
        alt="teal gradient, background decoration"
        className="absolute left-0 top-0 -z-10"
      />
      <Image
        src={pinkEllipse}
        alt="pink gradient, background decoration"
        className="absolute right-0 top-[20%] -z-10"
      />
      <div className="flex flex-col items-center min-h-screen mt-20 px-4">
        <h1 className="flex items-center gap-3 px-6 py-3 rounded-full bg-gray-500/50 border border-gray-200">
          <MicrophoneIcon className="h-8 w-8 text-red-300" />
          <p>
            <span className="font-bold text-white text-2xl">Present</span>{" "}
            <span className="font-thin text-red-300 text-2xl">Better</span>
          </p>
        </h1>

        <h2 className="text-white text-2xl mt-24 font-bold">
          Record your presentation and <br />
          get tips on how to improve it!
        </h2>

        <button
          onClick={isRecording ? stopRecording : startRecording}
          className="p-16 bg-red-400 rounded-full hover:bg-red-600 transition-colors mt-16 relative"
        >
          <div className="absolute inset-0 -m-2 rounded-full bg-gray-500/30 animate-pulse"></div>
          {isRecording ? (
            <StopIcon className="h-8 w-8 text-white" />
          ) : (
            <MicrophoneIcon className="h-8 w-8 text-white" />
          )}
        </button>
        {audioUrl && (
          <>
            <button onClick={playAudio} disabled={isRecording}>
              Play Audio
            </button>
            <button onClick={clearRecording}>Clear Recording</button>
            <audio src={audioUrl} controls />
          </>
        )}
        {transcription && (
          <div className="w-full max-w-2xl mt-8 flex items-center gap-4">
            <button
              onClick={handlePreviousView}
              className="p-2 bg-gray-500/30 rounded-full text-red-300 hover:text-red-400"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>

            {currentView === "transcription" ? (
              <TranscriptionArea transcription={transcription || ""} />
            ) : currentView === View.Tips ? (
              <PresentationTipsArea tips={presentationTips || ""} />
            ) : (
              <WordCountArea wordCount={wordCount || []} />
            )}

            <button
              onClick={handleNextView}
              className="p-2 bg-gray-500/30 rounded-full text-red-300 hover:text-red-400"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

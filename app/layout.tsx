import Script from "next/script";

import "./globals.css";

import type { Metadata } from "next";
import Header from "./components/Header";
import { AuthProvider } from "./providers";

export const metadata: Metadata = {
  title: {
    template: "%s - Speech Meter",
    default:
      "Speech Meter - Analyze your accent and improve your pronunciation",
  },
  description:
    "Speech Meter - Analyze your accent and improve your pronunciation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta property="og:image" content="<generated>" />
        <meta property="og:image:type" content="<generated>" />
        <meta property="og:image:width" content="<generated>" />
        <meta property="og:image:height" content="<generated>" />

        <meta name="twitter:image" content="<generated>" />
        <meta name="twitter:image:type" content="<generated>" />
        <meta name="twitter:image:width" content="<generated>" />
        <meta name="twitter:image:height" content="<generated>" />
        <Script src="https://scripts.simpleanalyticscdn.com/latest.js"></Script>
      </head>
      <body className="min-h-full bg-[#20163C] h-full">
        <AuthProvider>
          <Header />
          <main className="min-h-full">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
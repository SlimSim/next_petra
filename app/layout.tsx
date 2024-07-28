"use client";

import '@/app/ui/global.css';
import { Toaster } from "@/components/ui/sonner"
import { AudioPlayerProvider } from '@/contexts/AudioPlayerContext';
import { useEffect } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js').then(
          function (registration) {
            console.log('Service Worker registration successful with scope: ', registration.scope);
          },
          function (err) {
            console.log('Service Worker registration failed: ', err);
          }
        );
      });
    }
  }, []);
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=3"
        ></meta>
      </head>
      <body>
        <AudioPlayerProvider>
          <main>{children}</main>
          <Toaster />
        </AudioPlayerProvider>
      </body>
    </html>
  );
}

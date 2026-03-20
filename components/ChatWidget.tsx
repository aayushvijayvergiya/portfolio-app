"use client";

import React, { useEffect, useRef, useState } from "react";

const HF_SPACE_URL = "https://aayush2012-alter-ego.hf.space";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  // Track whether the iframe has been added to the DOM (first open)
  const [isMounted, setIsMounted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const woken = useRef(false);

  // Ping the HF Space the moment the portfolio loads — wakes it from sleep
  // before the user even clicks the chat button.
  useEffect(() => {
    if (woken.current) return;
    woken.current = true;
    fetch(HF_SPACE_URL, { mode: "no-cors" }).catch(() => {});
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    if (!isMounted) setIsMounted(true);
  };

  const handleToggle = () => (isOpen ? setIsOpen(false) : handleOpen());

  return (
    <>
      {/* ── Chat panel ──────────────────────────────────────────────────── */}
      {/* Stays in DOM after first open; hidden via opacity/scale so the
          iframe isn't destroyed (and re-fetched) on every toggle. */}
      <div
        className={`fixed bottom-24 right-6 sm:right-8 z-50 flex flex-col rounded-xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
        style={{ width: "min(380px, calc(100vw - 2rem))", height: "550px" }}
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-800 flex-shrink-0">
          <div className="flex items-center gap-2">
            {/* Live indicator */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-white text-sm font-medium">
              Chat with my AI twin
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded"
            aria-label="Close chat"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="relative flex-1 overflow-hidden">
          {/* Spinner — visible until iframe fires onLoad */}
          {isMounted && !isLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-900 z-10 gap-4">
              <div className="w-8 h-8 border-[3px] border-gray-200 border-t-gray-700 dark:border-gray-700 dark:border-t-gray-300 rounded-full animate-spin" />
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center leading-relaxed px-6">
                Waking up my alter ego...
                <br />
                <span className="text-xs opacity-60">
                  HF Spaces doze off when idle ☕
                </span>
              </p>
            </div>
          )}

          {/* iframe — only inserted on first open, then persisted */}
          {/* Width slightly overflows the overflow-hidden parent to clip the
              native iframe scrollbar, which can't be styled cross-origin. */}
          {isMounted && (
            <iframe
              src={HF_SPACE_URL}
              title="Chat with Aayush's AI twin"
              frameBorder="0"
              style={{ width: "calc(100% + 20px)", height: "100%" }}
              onLoad={() => setIsLoaded(true)}
            />
          )}
        </div>
      </div>

      {/* ── Floating bubble button ───────────────────────────────────────── */}
      <button
        onClick={handleToggle}
        className="fixed bottom-6 right-6 sm:right-8 z-50 w-14 h-14 rounded-full bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 shadow-lg flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-95"
        aria-label={isOpen ? "Close chat" : "Chat with my AI twin"}
      >
        {/* Attention pulse — shown only when panel is closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full animate-ping bg-gray-700 dark:bg-gray-300 opacity-25 pointer-events-none" />
        )}

        {/* Icon: X when open, chat bubble when closed */}
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
            <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-1z" />
          </svg>
        )}
      </button>
    </>
  );
}

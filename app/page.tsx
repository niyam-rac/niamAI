"use client";

import { useChat } from "ai/react";
import clsx from "clsx";
import Image from "next/image";
import { useRef } from "react";
import Textarea from "react-textarea-autosize";
import {
  GithubIcon,
  LoadingCircle,
  SendIcon,
  UserIcon,
  VercelIcon,
} from "./icons";

const examples = [
  "i need help",
  "whats up bro",
  "euta geet sunau ta",
  "recipie vana ta euta, khana pakaunu paryo",
  "freaking bored, tell me some plan for today?",
  "hasauna yaar bro, make me laugh",
  "What is the meaning of life?",
];

export default function Chat() {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, input, setInput, handleSubmit, isLoading } = useChat({
    onResponse: (response) => {
      if (response.status === 429) {
        window.alert("You have reached your request limit for the day.");
        return;
      }
    },
  });

  const disabled = isLoading || input.length === 0;

  return (
    <main className="flex flex-col items-center justify-between pb-40 bg-black">
      {messages.length > 0 ? (
        messages.map((message, i) => (
          <div
            key={i}
            className={clsx(
              "flex w-full items-center justify-center border-b border-gray-700 py-8",
              message.role === "user" ? "bg-gray-800" : "bg-gray-900",
            )}
          >
            <div className="flex w-full max-w-screen-md items-start space-x-4 px-5 sm:px-0">
              <div
                className={clsx(
                  message.role === "assistant"
                    ? "bg-white p-1.5 text-black"
                    : "bg-red-600 text-white p-1.5 shadow-glow",
                )}
              >
                {message.role === "user" ? (
                  <UserIcon />
                ) : (
                  <Image
                    src="/niam.png"
                    alt="niyam"
                    width={36}
                    height={36}
                  />
                )}
              </div>
              <div className="prose prose-p:leading-relaxed mt-1 w-full break-words text-white">
                {message.content}
              </div>
            </div>
          </div>
        ))
      ) : (
<div className="border-gray-700 sm:mx-0 mx-5 mt-20 max-w-screen-md rounded-md border sm:w-full bg-gray-800" style={{ boxShadow: '0 0 10px #f916f0' }}>
<div className="flex flex-col space-y-4 p-7 sm:p-10">
            <Image
              src="/niam.png"
              alt="Shooketh"
              width={40}
              height={40}
              className="h-20 w-20"
            />
            <h1 className="text-lg font-semibold text-white">
              Hi! Rainbow’s feeling a bit jealous for u    🌈” ✨
            </h1>
            <p className="text-gray-400">
            म तपाईंलाई रंगीन उत्तर दिनेछु!”         </p>
          </div>
          <div className="flex flex-col space-y-4 border-t border-gray-700 bg-gray-900 p-7 sm:p-10">
            {examples.map((example, i) => (
              <button
                key={i}
                className="rounded-md border border-gray-600 bg-gray-700 px-5 py-3 text-left text-sm text-gray-300 transition-all duration-75 hover:border-red-500 hover:text-gray-100 active:bg-gray-600"
                onClick={() => {
                  setInput(example);
                  inputRef.current?.focus();
                }}
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="fixed bottom-0 flex w-full flex-col items-center space-y-3 from-transparent via-gray-100 to-gray-100 p-5 pb-3 sm:px-0">
      <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="relative w-full max-w-screen-md rounded-xl border border-gray-200 bg-white px-4 pb-2 pt-3 shadow-lg sm:pb-3 sm:pt-4"
        >
            <Textarea
            ref={inputRef}
            tabIndex={0}
            required
            rows={1}
            autoFocus
            placeholder="Send a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                formRef.current?.requestSubmit();
                e.preventDefault();
              }
            }}
            spellCheck={false}
            className="w-full pr-10 focus:outline-none"
          />
          <button
            className={clsx(
              "absolute inset-y-0 right-3 my-auto flex h-8 w-8 items-center justify-center rounded-md transition-all",
              disabled
                ? "cursor-not-allowed bg-gray-700"
                : "bg-red-600 hover:bg-red-700",
            )}
            disabled={disabled}
          >
            {isLoading ? (
              <LoadingCircle />
            ) : (
              <SendIcon
                className={clsx(
                  "h-4 w-4",
                  input.length === 0 ? "text-gray-400" : "text-white",
                )}
              />
            )}
          </button>
        </form>
        <p className="text-center text-xs text-gray-400">
          "Life is short. Smile while you still have teeth. Hahaha!" V2
        </p>
      </div>
    </main>
  );
}

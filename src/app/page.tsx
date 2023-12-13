"use client";

import { Editor } from "novel";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  const [data, setData] = useState("");
  const [prompt, setPrompt] = useState("");
  const [assist, setAssist] = useState(true);

  return (
    <div className="flex justify-end">
      <Toaster />
      <Editor
        defaultValue={""}
        className={`h-[100vh] ${assist ? "basis-1/2" : "basis-full"}`}
        onUpdate={(edit) => {
          const text = edit?.getText();
          setData(text as string);
        }}
      />
      <div
        className={`bg-black text-white rounded-tl-2xl 
        ${assist ? "basis-1/2" : "basis-0"}
         `}
      >
        <textarea
          className="p-4 bg-white border border-2 rounded-tl-xl border-black block w-full text-black overflow-auto"
          placeholder={`${assist ? "What you want to do?" : ""}`}
          onChange={(e) => {
            e.preventDefault();
            setPrompt(e.target.value);
          }}
        ></textarea>
        <div className="relative right-12 top-4 inline-block">
          <div>
            <button
              className={`border p-1 bg-gray-100 hover:bg-gray-200 rounded-lg ${
                assist ? "rotate-180" : ""
              } `}
              onClick={(e) => {
                e.preventDefault();
                setAssist(!assist);
              }}
            >
              <ArrowIcon />
            </button>
          </div>
          <div className="my-2">
            <button
              className="p-1 hover:bg-gray-200 rounded-lg border border-black border-2"
              onClick={(e) => {
                e.preventDefault();
                let contentTokens = document.getElementById("content-tokens");
                if (contentTokens == undefined) {
                  return;
                }
                contentTokens.innerHTML = "<p>Loading...</p>";

                toast.success("Submitted!", {
                  position: "bottom-right",
                });

                fetch("/api/chat", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ content: data, prompt }),
                })
                  .then(async (response) => {
                    toast.success("Getting response...", {
                      position: "bottom-right",
                    });

                    const reader = response.body?.getReader();
                    if (reader == undefined) {
                      return;
                    }

                    let haveResponse = false;
                    for await (const chunk of readChunks(reader)) {
                      const token = new TextDecoder().decode(chunk);
                      let spanElement = document.createElement("span");
                      spanElement.innerText = token;

                      contentTokens?.appendChild(spanElement);
                      haveResponse = true;
                    }

                    if (haveResponse) {
                      let newLineElement = document.createElement("span");
                      newLineElement.innerText = "\n";

                      contentTokens?.appendChild(newLineElement);
                    }
                  })
                  .catch((error) => {
                    toast.error(error, {
                      position: "bottom-right",
                    });
                  });
              }}
            >
              <ImproveIcon />
            </button>
          </div>
        </div>
        <div id="content-tokens" className="py-4 px-2 text-md"></div>
      </div>
    </div>
  );
}

function readChunks(reader: ReadableStreamDefaultReader<Uint8Array>) {
  return {
    async *[Symbol.asyncIterator]() {
      let readResult = await reader.read();
      while (!readResult.done) {
        yield readResult.value;
        readResult = await reader.read();
      }
    },
  };
}

const ArrowIcon = () => (
  <svg
    width="25"
    height="25"
    viewBox="0 0 15 15"
    fill="none"
    className="text-black"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    ></path>
  </svg>
);

const ImproveIcon = () => (
  <svg
    width="25"
    height="25"
    viewBox="0 0 15 15"
    className="text-green-500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.67129 3.14634C4.47603 3.34161 4.47603 3.65819 4.67129 3.85345L7.14616 6.32833C7.34142 6.52359 7.65801 6.52359 7.85327 6.32833L10.3281 3.85345C10.5234 3.65819 10.5234 3.34161 10.3281 3.14634L7.85327 0.671471C7.65801 0.476209 7.34142 0.476209 7.14616 0.671471L4.67129 3.14634ZM7.49971 5.26766L5.73195 3.4999L7.49971 1.73213L9.26748 3.4999L7.49971 5.26766ZM8.67129 7.14634C8.47603 7.34161 8.47603 7.65819 8.67129 7.85345L11.1462 10.3283C11.3414 10.5236 11.658 10.5236 11.8533 10.3283L14.3281 7.85345C14.5234 7.65819 14.5234 7.34161 14.3281 7.14634L11.8533 4.67147C11.658 4.47621 11.3414 4.47621 11.1462 4.67147L8.67129 7.14634ZM11.4997 9.26766L9.73195 7.4999L11.4997 5.73213L13.2675 7.4999L11.4997 9.26766ZM4.67129 11.8535C4.47603 11.6582 4.47603 11.3416 4.67129 11.1463L7.14616 8.67147C7.34142 8.47621 7.65801 8.47621 7.85327 8.67147L10.3281 11.1463C10.5234 11.3416 10.5234 11.6582 10.3281 11.8535L7.85327 14.3283C7.65801 14.5236 7.34142 14.5236 7.14616 14.3283L4.67129 11.8535ZM5.73195 11.4999L7.49971 13.2677L9.26748 11.4999L7.49971 9.73213L5.73195 11.4999ZM0.671288 7.14649C0.476026 7.34175 0.476026 7.65834 0.671288 7.8536L3.14616 10.3285C3.34142 10.5237 3.65801 10.5237 3.85327 10.3285L6.32814 7.8536C6.5234 7.65834 6.5234 7.34175 6.32814 7.14649L3.85327 4.67162C3.65801 4.47636 3.34142 4.47636 3.14616 4.67162L0.671288 7.14649ZM3.49972 9.26781L1.73195 7.50005L3.49972 5.73228L5.26748 7.50005L3.49972 9.26781Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    ></path>
  </svg>
);

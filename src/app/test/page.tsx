"use client";

import { useState, useEffect } from "react";
import { getWordCount } from "../utils/getWordCount";
import Timer from "../Timer";

export default function Test() {
	const [text, setText] = useState("");

	const [word, setWord] = useState(0);
	const [backspace, setBackspace] = useState(0);
	const [deleteCount, setDeleteCount] = useState(0);

	const [spelling, setSpelling] = useState(false);

	const [fontSz, setFontSz] = useState(16);

	useEffect(() => {
		setText(localStorage.getItem("text") || "")

		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === "Backspace") {
				setBackspace((b) => b + 1);
			}

			if (e.key === "Delete") {
				setDeleteCount((d) => d + 1);
			}
		}

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	});

	return (
		<div className="relative h-screen w-screen flex ">
			<div className="absolute top-4 right-4 p-4 border rounded-lg bg-[#ECECEC]">
				<div className="flex items-enter justify-between mb-4 text-lg font-mono">
					<div className="flex items-center gap-2">
						<button
							className="border border-black rounded px-1 bg-gray-200 hover:bg-gray-300 text-sm"
							onClick={() => {
								setFontSz((f) => f + 10);
							}}
						>
							A+
						</button>

						<button
							className="border border-black rounded px-1 bg-gray-200 hover:bg-gray-300 text-sm"
							onClick={() => {
								setFontSz((f) => f - 10);
							}}

						>
							A-
						</button>
					</div>
					<Timer />
				</div>
				<div className="flex items-center justify-center gap-4 text-lg">
					<p>
						Backspace:{" "}
						<strong className="font-mono">{backspace}</strong>
					</p>
					<p>
						Delete:{" "}
						<strong className="font-mono">{deleteCount}</strong>
					</p>
					<p>
						Words: <strong className="font-mono">{word}</strong>
					</p>
				</div>

				<div className="mt-4 flex items-center justify-center gap-4">
						<button className="py-1 px-2 rounded bg-blue-400" onClick={() => {
							localStorage.setItem("text", "");
							setText("")
						}}>Clear Text</button>

						<button className={`py-1 px-2 rounded ${spelling === true ? "bg-green-400" : "bg-red-400"}`} onClick={() => {
							setSpelling(!spelling);
						}}>{spelling === true ? "Hide" : "Show"} Spellings</button>
				</div>
			</div>

			<textarea
				style={{
					fontSize: `${fontSz}px`,
				}}
				placeholder="Start Writing..."
				className={`h-full w-full p-8`}
				value={text}
				onChange={(e) => {
					setText(e.target.value);
					setWord(getWordCount(e.target.value));
					localStorage.setItem("text", e.target.value)
				}}

				autoComplete="off"
				autoCorrect="off"
				autoCapitalize="off"
				spellCheck={spelling}

				rows={100}
				cols={100}
			/>
		</div>
	);
}

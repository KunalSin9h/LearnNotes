import Image from "next/image";

export default function Index() {
	return (
		<div className="flex flex-col h-screen w-screen justify-center items-center gap-16">
			<p className="font-bold text-4xl">Learn Notes</p>
			<div className="flex items-center justify-around w-[40%]">
				<div className="flex flex-col items-center justify-center gap-4">
					<Image
						src="/test.png"
						alt="Test Icon"
						height={180}
						width={180}
					/>
					<a
						href="/test"
						className="font-bold text-2xl hover:text-green-500"
					>
						Attempt Test
					</a>
				</div>
				<div className="flex flex-col items-center justify-center gap-4">
					<Image
						src="/test.png"
						alt="Test Icon"
						height={180}
						width={180}
					/>
					<a
						href="/practice"
						className="font-bold text-2xl hover:text-green-500"
					>
						Do Practice
					</a>
				</div>
			</div>
		</div>
	);
}

import Image from "next/image";
import "./dots.css";

export default function Index() {
	return (
		<div className="flex flex-col justify-center items-center h-screen w-screen">
			<div className="flex flex-col justify-center items-center gap-16 p-32 w-[60%] backdrop-blur-sm bg-green-100/10">
				<p className="font-bold text-4xl">Learn Notes</p>
				<div className="flex items-center justify-around w-[100%]">
					<a
						href="/test"
						className="group flex flex-col items-center justify-center gap-4 hover:border p-8 rounded hover:border-2 border-blue-400 hover:bg-blue-400/10 cursor-pointer"
					>
						<Image
							src="/testing.png"
							alt="Test Icon"
							height={180}
							width={180}
						/>
						<p className="font-bold text-2xl group-hover:text-blue-800">
							Attempt Test
						</p>
					</a>
					<a
						href="/practice"
						className="group flex flex-col items-center justify-center gap-4 hover:border p-8 rounded hover:border-2 border-yellow-400 hover:bg-yellow-400/10 cursor-pinter cursor-pointer"
					>
						<Image
							src="/practice.png"
							alt="Practice Icon"
							height={180}
							width={180}
						/>
						<p className="font-bold text-2xl group-hover:text-yellow-600">
							Do Practice
						</p>
					</a>
				</div>
			</div>
		</div>
	);
}

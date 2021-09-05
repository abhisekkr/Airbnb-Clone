import Image from "next/image";

function LargeCard({ img, title, description, buttonText }) {
	return (
		<div className="relative py-16 cursor-pointer">
			<div className="relative h-96 min-w-[300px]">
				<Image
					src={img}
					layout="fill"
					objectFit="cover"
					className="rounded-2xl"
				/>
			</div>
			<div className="absolute top-36 left-12">
				<h3 className="text-4xl font-semibold mb-3 text-white">{title}</h3>
				<p className="text-md w-64 text-white">{description}</p>
				<button className="text-sm bg-white px-4 py-2 rounded-lg mt-5">
					{buttonText}
				</button>
			</div>
		</div>
	);
}

export default LargeCard;

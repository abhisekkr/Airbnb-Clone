import Image from "next/image";

function DiscoverCard({ items, urlPrefix }) {
	return (
		<div>
			<div className="flex space-x-3 overflow-scroll scrollbar-hide  pl-3 -ml-3 ">
				{items.map((item) => (
					<div
						className="cursor-pointer hover:scale-105 trasition transform duration-300 ease-out py-5 "
						key={item.img}>
						<div className="relative h-96 w-96">
							<Image
								src={urlPrefix + item.img}
								layout="fill"
								className="rounded-xl "
							/>
						</div>
						<div className="mt-2">
							<h3 className="text-2xl ">{item.title}</h3>
							<p>{item.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default DiscoverCard;

import Image from "next/image";
import { HeartIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";
import router, { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import { bookNow, removeStay, selectItems } from "../slices/bookSlice";
import { useSession } from "next-auth/client";

function ResultCard({ img, location, title, description, star, price, total }) {
	const items = useSelector(selectItems);
	const [session] = useSession();
	const dispatch = useDispatch();

	const continueTobooking = () => {
		dispatch(
			bookNow({
				img,
				title,
				description,
				price,
				total,
			})
		);
	};

	const createCheckoutSession = () => {
		router.push("/book");
	};

	return (
		<div className="flex py-7 px-2 border-b cursor-pointer  hover:shadow-lg pr-4 transition duration-200 ease-out">
			<div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0 ">
				<Image
					src={img}
					layout="fill"
					objectFit="cover"
					className="rounded-2xl hover:scale-110 hover:duration-300 ease-in"
				/>
			</div>
			<div className="flex flex-col flex-grow pl-5">
				<div className="flex justify-between">
					<p className="text-gray-500">{location}</p>
					<HeartIcon className="h-7 cursor-pointer active:text-red-700 " />
				</div>
				<h4 className="text-xl cursor-pointer">{title}</h4>
				<div className="border-b w-10 pt-2" />

				<p className="text-gray-500 text-sm flex-grow pt-2">{description}</p>

				<div className="flex justify-between items-end pt-5">
					<p className="flex items-center">
						<StarIcon className="h-5  text-red-400" />
						{star}
					</p>

					<div>
						<p className="text-lg text-right lg:text-2xl font-semibold pb-2">
							{price}
						</p>
						<p className="text-sm text-right font-extralight text-gray-500">
							{total}
						</p>
						{items.length > 0 ? (
							<>
								{items.map((item) => {
									if (item.title == title) {
										return (
											<button
												onClick={createCheckoutSession}
												className="bg-red-400 p-2 text-white rounded-lg mt-1 w-32 active:scale-95 transition duration-200 ease-out">
												{!session ? "Sign In to book" : "Continue to Book"}
											</button>
										);
									} else {
										return (
											<button
												className="bg-red-400 p-2 text-white rounded-lg mt-1 w-32 active:scale-95 transition duration-200 ease-out"
												onClick={continueTobooking}>
												{!session ? "Sign In to Book" : "Book now"}
											</button>
										);
									}
								})}
							</>
						) : (
							<button
								onClick={continueTobooking}
								className="bg-red-400 p-2 text-white rounded-lg mt-1 w-32 active:scale-95 transition duration-200 ease-out">
								{!session ? "Sign In to Book" : "Book Now"}
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ResultCard;

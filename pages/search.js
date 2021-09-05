import { useRouter } from "next/dist/client/router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { format } from "date-fns";
import ResultCard from "../components/ResultCard";
import Map from "../components/Map";
import { getSession } from "next-auth/client";
import Login from "../components/Login";

function Search({ session, searchResults }) {
	if (!session) return <Login />;

	const router = useRouter();
	//ES6 Destructuring
	const { location, startDate, endDate } = router.query;
	const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
	const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
	const range = `${formattedStartDate} - ${formattedEndDate}`;

	return (
		<div>
			<Header placeholder={`${location} | ${range}`} />
			<main className="flex">
				<section className="flex-grow pt-14 px-6">
					<p className="">
						300+ Stays from{" "}
						<span className="bg-red-400 text-white">{range}</span>
					</p>
					<h1 className="text-3xl font-semibold mt-2 mb-6">
						Stays in {location}
					</h1>

					<div className="hidden md:inline-flex space-x-3 mb-5 whitespace-nowrap text-gray-800">
						<p className="button">Instant Book</p>
						<p className="button">button Price</p>
						<p className="button">Type of Place</p>
						<p className="button">Cancellation Flexibility</p>
						<p className="button">More Filters</p>
					</div>
					<p className="mb-3 pb-5 border-b">
						Review COVID-19 travel restrictions before you book.{"  "}
						<span className="cursor-pointer underline">Learn more</span>
					</p>
					<div className="flex flex-col">
						{searchResults.map(
							({ img, location, title, description, star, price, total }) => (
								<ResultCard
									key={img}
									img={img}
									location={location}
									title={title}
									description={description}
									star={star}
									price={price}
									total={total}
								/>
							)
						)}
					</div>
				</section>
				<section className="hidden lg:inline-flex xl:inline-flex xl:min-w-[600px]">
					<Map searchResults={searchResults} />
				</section>
			</main>
			<div className="flex ">
				<div className=" flex space-x-6 px-6 pt-8 pb-8 items-center mx-auto">
					<p className="pageCountActive">1</p>
					<p className="pageCount">2</p>
					<p className="pageCount">3</p>
					<p className="pageCount">4</p>
					<p className="pageCount">5</p>
					<p>.</p>
					<p>.</p>
					<p className="pageCount">15</p>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default Search;

export async function getServerSideProps(context) {
	const session = await getSession(context);
	const searchResults = await fetch("https://links.papareact.com/isz").then(
		(res) => res.json()
	);

	return {
		props: {
			session,
			searchResults,
		},
	};
}

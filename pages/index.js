import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import SmallCard from "../components/SmallCard";
import MediumCard from "../components/MediumCard";
import LargeCard from "../components/LargeCard";
import largeCardImage from "../public/images/tryHosting1.jpg";
import DiscoverCard from "../components/DiscoverCard";
import { discover } from "../data";
import Footer from "../components/Footer";
import { getSession } from "next-auth/client";
import Login from "../components/Login";

export default function Home({ exploreData, cardsData, session }) {
	if (!session) return <Login />;

	return (
		<>
			<div className="">
				<Head>
					<title>Airbnb Clone</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Header />
				<Banner />

				<main className="max-w-7xl mx-auto px-8 sm:px-16">
					<section className="pt-6">
						<h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>
						{/* Pull some data from a server - API endpoints */}
						{/* destructuring img distance and location inside map */}
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{exploreData?.map(({ img, distance, location }) => (
								<SmallCard
									key={img}
									img={img}
									location={location}
									distance={distance}
								/>
							))}
						</div>
					</section>

					<section>
						<h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
						<div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">
							{cardsData?.map(({ img, title }) => (
								<MediumCard key={img} img={img} title={title} />
							))}
						</div>
					</section>

					<section>
						<h2 className="text-4xl font-semibold  py-8">
							Discover things to do
						</h2>
						<DiscoverCard {...discover} />
					</section>

					<LargeCard
						img={largeCardImage}
						title="Try hosting"
						description="Earn extra income and unlock new oppurtunities by sharing your space."
						buttonText="Learn more"
					/>
				</main>
				<Footer />
			</div>
		</>
	);
}

// The way we include Static site rendering is by declaring a async function , async function because it will kind of do bunch of Network work before it actually reaches the browser.this function works in files inside pages folder, basically index.js

export async function getServerSideProps(context) {
	const exploreData = await fetch("https://links.papareact.com/pyp").then(
		(res) => res.json()
	);
	const cardsData = await fetch("https://links.papareact.com/zp1").then((res) =>
		res.json()
	);
	const session = await getSession(context);

	return {
		props: {
			exploreData,
			cardsData,
			session,
		},
	};
}

//it does a sserver side rendering , gets the user , return it as a prop

//Context is the request that came through when the user tried to go to sonnySangha.com

//sunny makes a request to go to sunnySangha.com whatever your NextJs application is  , sunny makes the request it hits the server , the server then just got the users session , which means are they loggedIn or not, now the user is waiting at this point , so the server has that information , so what it does is basically prepares the page and that session information , it passes it to the component as a prop and then all these information gets rendered on users browser

// There are two types of rendering:
// 1- static rendering
// 2- Server side rendering

// in case of homeScreen the data is not going to change much the images or headers are going to remain same so here we can use STATIC RENDERING.Banner

// But in case of some News site or social media site where data is continuously getting changed, in that case we should use SERVER SIDE RENDERING.- which means every request that comes in, it is gonna regenerate the page

// When we do static rendering , it prepares it once, it caches on a server and anytime the user comes , it kind of keep delivering the same copy.

// It is very important when we are using map , we should always pass key so that the map function stops after rendering after it renders all the element , else if we dont pass key it will rerender all the elements.

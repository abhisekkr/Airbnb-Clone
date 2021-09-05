import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useState } from "react";
import getCenter from "geolib/es/getCenter";
import Image from "next/image";

function Map({ searchResults }) {
	const [selectedLocation, setSelectedLocation] = useState({});

	const coordinates = searchResults.map((result) => ({
		longitude: result.long,
		latitude: result.lat,
	}));

	const center = getCenter(coordinates);

	const [viewport, setViewport] = useState({
		width: "100%",
		height: "100%",
		latitude: center.latitude,
		longitude: center.longitude,
		zoom: 11,
	});

	return (
		<ReactMapGL
			mapStyle="mapbox://styles/abbhisekk/cks8daknm30at17pere9wrsg7"
			mapboxApiAccessToken={process.env.mapbox_key}
			{...viewport}
			onViewportChange={(nextViewport) => setViewport(nextViewport)}>
			{searchResults.map((result) => (
				<div key={result.long}>
					<Marker
						longitude={result.long}
						latitude={result.lat}
						offsetLeft={-20}
						offsetTop={-10}>
						<p
							onClick={() => setSelectedLocation(result)}
							className="text-2xl cursor-pointer animate-bounce">
							📌
						</p>
					</Marker>
					{selectedLocation.long === result.long ? (
						<Popup
							onClose={() => setSelectedLocation({})}
							closeOnClick={true}
							latitude={result.lat}
							longitude={result.long}
							className="z-10">
							<div className="flex flex-col">
								<h2 className="text-md">{result.title}</h2>
								<div className=" relative h-40 w-100%">
									<Image
										src={result.img}
										layout="fill"
										objectFit="cover"
										className="rounded-lg"
									/>
								</div>
							</div>
						</Popup>
					) : (
						false
					)}
				</div>
			))}
		</ReactMapGL>
	);
}

export default Map;

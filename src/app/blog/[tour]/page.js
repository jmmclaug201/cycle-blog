import {redirect} from "next/navigation.js"

import lineSliceAlong from "@turf/line-slice-along"
import {marked} from "marked";

import {readTour} from "lib/db.js"
import ClientPage from "./clientpage.js"

// Montour Trail: localhost:3000/blog/64adc13893fc813b852392b5
export default async function Page({params}) {
  // Attempt to load tour from backend
  const tourId = params.tour;
  let tour;
  try {
    tour = await readTour(tourId);
    // Note to self: somehow i should delete tour._id;
  } catch(error) {
    console.dir(error);
    redirect("/")
  }

  // Precompute different line slices for each highlight
  const lineSlices = tour.post.map((section) => 
    (section.start !== section.end ? 
      lineSliceAlong(tour.route, section.start, section.end, {units: 'miles'}) :
      undefined)
  );

  // Precompute markdown for each text section
  for(const section of tour.post) {
    section.text = marked.parse(section.text);
  }
  
  return (
    <ClientPage tour={tour} lineSlices={lineSlices}/>
  );
}
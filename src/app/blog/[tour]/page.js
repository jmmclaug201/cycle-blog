import {redirect} from "next/navigation.js"

import {readTour} from "lib/db.js"
import BlogMap from "../blogmap.js"
import PostSection from "./postsection.js"

// Montour Trail: localhost:3000/blog/64adc13893fc813b852392b5
export default async function Page({params}) {
  const tourId = params.tour;
  let tour;
  try {
    tour = await readTour(tourId);
  } catch(error) {
    redirect("/blog")
  }

  // To Do: Map post array to new <PostSection> tag
  return (
    <div className="flex">
      <div className="basis-3/5 h-screen">
        <BlogMap id={"tourMap"} route={tour.route}/>
      </div>
      <div className="basis-2/5 bg-red-100">
        <h2>
          {tour.title}
        </h2>
        <div>
          {tour.post.map((section, index) => (
            <PostSection key={index} text={section.text}/>
          ))}
        </div>
      </div>
    </div>
  );
}
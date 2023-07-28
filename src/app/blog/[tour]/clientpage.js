'use client'

import {useState} from "react";

import BlogMap from "../blogmap.js"
import PostSection from "./postsection.js"

export default function ClientPage({tour, lineSlices}) {
  const [focus, setFocus] = useState(undefined);

  return (
    <div className="flex">
      <div className="basis-1/2 h-screen">
        <BlogMap id={"tourMap"} route={tour.route} lineSlices={lineSlices} highlight={focus}/>
      </div>
      <div className="basis-1/2 p-8 h-screen overflow-y-scroll">
        <h2 className="text-3xl">
          {tour.title}
        </h2>
        <div className="text-md">
          {tour.post.map((section, index) => (
            <PostSection
              key={index} 
              text={section.text}
              onHover = {() => setFocus(index)}
              onLeave = {() => setFocus(undefined)}/>
          ))}
        </div>
      </div>
    </div>
  );
}
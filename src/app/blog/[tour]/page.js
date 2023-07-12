import {readTour} from "lib/db.js";
import BlogMap from "../blogmap.js"

export default async function Page({tour}) {
  let x = await readTour("64adc13893fc813b852392b5");
  console.log(x);
  return (
    <div className="flex">
      <div className="basis-3/5 h-screen">
        <BlogMap id={"tourMap"} route={x.route.coordinates}/>
      </div>
      <div className="basis-2/5 bg-red-100">
        Lorem Ipsum According to all known laws of aviation, there is no way a bee should be able to fly.
      </div>
    </div>
  );
}
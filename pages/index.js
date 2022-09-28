import Link from "next/link";
import { createContext, useEffect } from "react";

export default function Home() {
  useEffect(() => {
    sessionStorage.setItem("score", 0);
  });
  return (
    <div className="homePage">
      <div className="home-wrapper text-2xl lg:text-4xl leading-5 ">
        <div>
          <h1 className="">Choose</h1>
        </div>
        <div className="selection-wrapper">
          <div className="normal">
            <div>
              <Link href="/version/rock-paper-scissors" className="table-caption">
                Rock Paper Scissors
              </Link>
            </div>
          </div>
          <div className="star-trek-twist">
            <div>
              <Link href="/version/rock-paper-scissors-starTrek" className="table-caption">
                Rock Paper Scissors with Star Trek Twist
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

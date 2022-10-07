import { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { StarTrekOptions } from "../../options";
import Link from "next/link";
import { houseChose, rules } from "./rock-paper-scissors";
import { screenWidth } from "../_app";
const pentagon = require("../../images/bg-pentagon.svg");

const RockPaperScissorsStarTrek = () => {
  const screen = useContext(screenWidth);
  const [score, setScore] = useState();
  const [selected, setSelected] = useState();
  const [winner, setWinner] = useState();
  const [PcSelected, setPcSelected] = useState();
  const mount = useRef(false);
  useEffect(() => {
    if (mount.current) sessionStorage.setItem("score", score);
    else {
      const s = sessionStorage.getItem("score");
      setScore(s ? s : 0);
      mount.current = true;
    }
  }, [score]);
  return (
    <div className="bonus-game p-5">
      {screen && (
        <div className="wrapper">
          <div className="title-score">
            <div className="title">
              <p>ROCK PAPER SCISSORS LIZARD SPOCK</p>
            </div>
            <div className="score">
              <h1>SCORE</h1>
              <h1 className="text-4xl">{score}</h1>
            </div>
          </div>
          {!selected ? (
            <div className="selection">
              <div className="relative">
                <figure className="pentagon-wrapper">
                  <Image
                    src={pentagon}
                    alt="pentagon"
                    height={screen > 500 ? 400 : 200}
                    width={screen > 500 ? 400 : 200}
                  ></Image>
                </figure>
                {Object.keys(StarTrekOptions).map((o, index) => {
                  return (
                    <div
                      key={index}
                      id={o}
                      className="img-wrapper absolute"
                      style={{
                        background: `radial-gradient(${StarTrekOptions[o].color1}, ${StarTrekOptions[o].color2})`,
                      }}
                      onClick={() => {
                        setSelected(o);
                        setTimeout(() => {
                          const h = houseChose(o, 3);
                          setPcSelected(h[1]);
                          setWinner(h[0]);
                          if (h[0] === "Player1") setScore(parseInt(score) + 1);
                        }, 1000);
                      }}
                    >
                      <figure>
                        <Image
                          src={StarTrekOptions[o].img}
                          alt={o}
                          height={screen > 500 ? 70 : 35}
                          width={screen > 500 ? 70 : 35}
                        ></Image>
                      </figure>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="match relative">
              <div className="match-wrapper">
                <div className="flex flex-col text-center">
                  <h1 className="my-5">You Picked</h1>
                  <div
                    className="img-wrapper"
                    style={{
                      background: `radial-gradient(${StarTrekOptions[selected].color1}, ${StarTrekOptions[selected].color2})`,
                    }}
                  >
                    <figure className="">
                      <Image
                        src={StarTrekOptions[selected].img}
                        alt="playerImg"
                        height={screen > 500 ? 190 : 75}
                        width={screen > 500 ? 190 : 75}
                      ></Image>
                    </figure>
                  </div>
                </div>
                {PcSelected ? (
                  <div className="flex flex-col text-center">
                    <h1 className="my-5">The House Picked</h1>
                    <div
                      className="player2 img-wrapper"
                      style={{
                        background: `radial-gradient(${PcSelected.color1}, ${PcSelected.color2})`,
                      }}
                    >
                      <figure className="">
                        <Image
                          src={PcSelected.img}
                          alt="pcImg"
                          height={screen > 500 ? 190 : 75}
                          width={screen > 500 ? 190 : 75}
                        ></Image>
                      </figure>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
                {winner && (
                  <div className="winner absolute text-5xl text-center w-full lg:w-1/6">
                    <h1>
                      {winner === "Player1"
                        ? "YOU WIN"
                        : winner === "Player2"
                        ? "YOU LOSE"
                        : "TIE"}
                    </h1>
                    <button
                      className="text-xl text-amber-800 rounded w-full py-4 bg-white"
                      style={{ fontWeight: 400 }}
                      onClick={() => {
                        setPcSelected();
                        setSelected();
                        setWinner();
                      }}
                    >
                      PLAY AGAIN
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="absolute right-0 bottom-0 lg:right-10 lg:bottom-10 py-2 px-10 border-2 rounded border-white bg-transparent">
            <Link href={{ pathname: "/rules", query: { rules: "bonusRules" } }}>
              RULES
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default RockPaperScissorsStarTrek;

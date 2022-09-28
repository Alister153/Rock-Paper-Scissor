import { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { NormalOptions, StarTrekOptions } from "../options";
import Link from "next/link";
import { screenWidth } from "../_app";
const triangle = require("../../images/bg-triangle.svg");

export const rules = (player1, player2) => {
  // - Scissors beats Paper
  // - Paper beats Rock
  // - Rock beats Lizard
  // - Lizard beats Spock
  // - Spock beats Scissors
  // - Scissors beats Lizard
  // - Paper beats Spock
  // - Rock beats Scissors
  // - Lizard beats Paper
  // - Spock beats Rock

  if (player1 === player2) return "tie";
  else if (player1 === "scissors" && ["paper", "lizard"].includes(player2))
    return "Player1";
  else if (player1 === "paper" && ["rock", "spock"].includes(player2))
    return "Player1";
  else if (player1 === "rock" && ["lizard", "scissors"].includes(player2))
    return "Player1";
  else if (player1 === "lizard" && ["spock", "paper"].includes(player2))
    return "Player1";
  else if (player1 === "spock" && ["scissors", "rock"].includes(player2))
    return "Player1";
  return "Player2";
};
export const houseChose = (player1, limit) => {
  const random = Math.floor(Math.random() * limit);
  const array = ["rock", "paper", "scissors", "lizard", "spock"];
  const selected =
    limit === 3 ? NormalOptions[array[random]] : StarTrekOptions[[random]];

  const r = rules(player1, array[random]);
  return [r, selected];
};

const RockPaperScissors = () => {
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
    <div className="normal-game p-5">
      <div className="wrapper">
        <div className="title-score">
          <div className="title">
            <p>ROCK PAPER SCISSORS</p>
          </div>
          <div className="score">
            <h1>SCORE</h1>
            <h1 className="text-4xl">{score}</h1>
          </div>
        </div>
        {!selected ? (
          <div className="selection">
            <div className="relative">
              <figure className="triangle-wrapper">
                <Image
                  src={triangle}
                  alt="triangle"
                  height={screen > 500 ? 400 : 300}
                  width={screen > 500 ? 400 : 300}
                ></Image>
              </figure>
              {Object.keys(NormalOptions).map((o, index) => {
                return (
                  <div
                    key={index}
                    id={o}
                    className="img-wrapper absolute"
                    style={{
                      background: `radial-gradient(${NormalOptions[o].color1}, ${NormalOptions[o].color2})`,
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
                        src={NormalOptions[o].img}
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
                    background: `radial-gradient(${NormalOptions[selected].color1}, ${NormalOptions[selected].color2})`,
                  }}
                >
                  <figure className="">
                    <Image
                      src={NormalOptions[selected].img}
                      alt="triangle"
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
                        alt="triangle"
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
        <div className="absolute right-10 bottom-10 py-2 px-10 border-2 rounded border-white bg-transparent">
          <Link href={{ pathname: "/rules", query: { rules: "normalRules" } }}>
            RULES
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RockPaperScissors;

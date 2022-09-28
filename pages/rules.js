import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import { screenWidth } from "./_app";
const normalRules = require("../images/image-rules.svg");
const bonusRules = require("../images/image-rules-bonus.svg");

const cross = require("../images/icon-close.svg");

const Rules = () => {
  const screen = useContext(screenWidth);
  const router = useRouter();
  const data = router.query;

  return (
    <div className="rules flex items-center justify-evenly flex-col h-screen">
      <div className="h-1/6 flex items-center">
        <h1 className="text-5xl">RULES</h1>
      </div>
      <div className="h-auto flex items-center">
        <Image
          src={data.rules === "normalRules" ? normalRules : bonusRules}
          width={screen > 500 ? 550 : 300}
          height={screen > 500 ? 550 : 300}
        />
      </div>
      <div
        className="cross"
        onClick={() => {
          router.back();
        }}
      >
        <Image src={cross} width={40} height={40} />
      </div>
    </div>
  );
};

export default Rules;

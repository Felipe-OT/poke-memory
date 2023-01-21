import React, { useEffect, useState } from "react";


interface ICardData {
  id: number,
  cardId: number,
  name: string,
  frontImage: string,
  clicked: (cardId: number) => void,
  flipWrong: number[],
  disabled: boolean
}


const Card = ({ id, cardId, name, frontImage, clicked, flipWrong, disabled }:ICardData) => {
  const [cardWasClicked, setCardWasClicked] = useState<boolean>(false);

  useEffect(() => {
    if(flipWrong.includes(id)) {
      setCardWasClicked(!cardWasClicked);
    }
  }, [flipWrong]);

  const cardInfo = () => {
    setCardWasClicked(!cardWasClicked);
    clicked(cardId);
  };


  return (
    <li className={`relative list-none w-28 h-36 preserve-3d duration-1000 ${
      cardWasClicked ? "rotate-y-180" : ""}`}>
      <button
        disabled={disabled || cardWasClicked ? true : false}
        onClick={() => cardInfo()}
        className={`absolute w-full h-full z-50`}
      ></button>
        <div className="h-full w-full  rounded-lg absolute backface-hidden bg-back-card-gengar bg-center bg-cover"></div>
        <div
          className={`h-full w-full bg-white rounded-lg absolute flex items-center backface-hidden rotate-y-180`}
        >
          <img className="w-full" src={frontImage} alt="" />
        </div>
    </li>
  );
};

export default Card;

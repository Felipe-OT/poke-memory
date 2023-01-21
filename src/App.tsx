import { useEffect, useLayoutEffect, useState } from "react";
import Card from "./components/Card";
import DifficultButton from "./components/DifficultButton";

interface IPokemonsCardsList {
  id: number;
  name: string;
  sprites: string
}

function App() {
  const difficult = ["Fácil", "Médio", "Difícil"];
  const [selectedDifficult, setSelectedDifficult] = useState("Fácil");
  const [listOfPokemonsInGame, setListOfPokemonsInGame] = useState<
    IPokemonsCardsList[]
  >([]);
  const [listWithPairs, setListWithPairs] = useState<IPokemonsCardsList[]>([]);
  const [numberOfPokemonsInGame, setNumberOfPokemonsInGame] = useState(4);
  const [clickedCardsId, setClickedCardsId] = useState<number[]>([]);
  const [clickedPokemonsId, setClickedPokemonsId] = useState<number[]>([]);
  const [flippedMatched, setFlippedMatched] = useState<number[]>([]);
  const [mustFlip, setMustFlip] = useState<number[]>([]);
  const [enableClick, setEnableClick] = useState(true);

  // Start a new game
  const startNewGame = () => {
    let list: IPokemonsCardsList[] = [];
    const url = "https://pokeapi.co/api/v2/pokemon/";

    async function getPokemonsData() {
      while (list.length < numberOfPokemonsInGame) {
        let randomId = Math.floor(Math.random() * (251 - 1) + 1);
        let newUrl = url + randomId;
        await fetch(newUrl, { method: "GET" })
          .then((response) => response.json())
          .then((pokeData) => {
            if (!list.includes(pokeData)) {
              list.push({
                id: pokeData.id,
                name: pokeData.name,
                sprites:
                  pokeData.sprites.other["official-artwork"].front_default,
              });
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
      setListOfPokemonsInGame(list);
    }
    getPokemonsData();
  };

  // Change cards quantity when the player changes the difficult
  const changeNumberOfCards = (difficult: string) => {
    setSelectedDifficult(difficult);
    if (difficult == "Fácil") {
      setNumberOfPokemonsInGame(4);
    } else if (difficult == "Médio") {
      setNumberOfPokemonsInGame(8);
    } else {
      setNumberOfPokemonsInGame(12);
    }
  };

  // Suffle the list of cards with pairs *****NOT IN USE*****
  const shuffle = (array: IPokemonsCardsList[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];

      // Swap
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  // Save the clicked card Id and pokemon Id
  const cardWasClicked = (pokemonId: number, id: number) => {
    setClickedCardsId((prev) => [...prev, id]);
    setClickedPokemonsId((prev) => [...prev, pokemonId]);
  };

  // Start new game every time the difficult is changed
  useEffect(() => {
    startNewGame();
  }, [numberOfPokemonsInGame]);

  // Duplicate data to make pairs
  useEffect(() => {
    console.log(listOfPokemonsInGame);
    if (listOfPokemonsInGame.length > 0) {
      let list: IPokemonsCardsList[] = [];
      listOfPokemonsInGame.forEach((e) => {
        list.push(e, e);
      });
      let result = shuffle(list)
      setListWithPairs(result);
    }
  }, [listOfPokemonsInGame]);

  // Verify if cards match when two cards are clicked. If false, flip them back. If true, reset clicked cards constants, and save the id of clicked cards.
  useEffect(() => {
    if (clickedPokemonsId.length == 2) {
      if (clickedPokemonsId[0] !== clickedPokemonsId[1]) {
        setEnableClick(false);
        setTimeout(() => {
          setMustFlip(clickedCardsId);
          setClickedCardsId([]);
          setClickedPokemonsId([]);
          setTimeout(() => {
            setEnableClick(true);
          }, 1000);
        }, 2000);
      } else {
        setClickedCardsId([]);
        setClickedPokemonsId([]);
        setFlippedMatched((prev) => [
          ...prev,
          clickedCardsId[0],
          clickedCardsId[1],
        ]);
      }
    }
  }, [clickedPokemonsId]);

  // Reset the game when all cards are flipped
  useEffect(() => {
    if (flippedMatched.length == numberOfPokemonsInGame * 2) {
      setTimeout(() => {
        setMustFlip(flippedMatched);
        setClickedCardsId([]);
        setClickedPokemonsId([]);
        setFlippedMatched([]);
        startNewGame();
        setTimeout(() => {
          setEnableClick(true);
        }, 1000);
      }, 2000);
    }
  }, [flippedMatched]);

  useEffect(() => {
    console.log(listWithPairs)
  },[listWithPairs])

  return (
    <div className="bg-gradient-to-b from-[#6E9DAF] to-[#75CB9A] w-screen min-h-screen flex">
      <div className="flex flex-col gap-20 items-center w-full my-24">
        <div>
          <h1 className="text-center text-7xl font-semibold text-white mb-10">
            PokeMemory
          </h1>
          <div>
            <h1 className="text-center text-3xl text-white mb-5">
              Mude a dificuldade
            </h1>
            <div className="flex justify-center gap-5 mb-10">
              {difficult.map((btn, i) => (
                <DifficultButton
                  key={i}
                  title={difficult[i]}
                  changeDifficult={(difficult) =>
                    changeNumberOfCards(difficult)
                  }
                  selectedDifficult={selectedDifficult}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex-col hidden">
          <h1>Acertos: {flippedMatched.length}</h1>
          <span>id1:{clickedCardsId[0]}</span>
          <span>id2: {clickedCardsId[1]}</span>
          <span>Primeiro: {clickedPokemonsId[0]}</span>
          <span>Ultimo: {clickedPokemonsId[1]}</span>
        </div>
        <div className="container mx-auto">
          <ul className={`gap-y-5 gap-x-5 grid place-items-center justify-center ${selectedDifficult == 'Fácil' && 'grid-cols-[112px_minmax(112px,_112px)_112px_112px]'} ${selectedDifficult == 'Médio' && 'grid-cols-[112px_minmax(112px,_112px)_112px_112px]'} ${selectedDifficult == 'Difícil' && 'grid-cols-8'}`}>
            {listWithPairs.map((card, i) => (
              <Card
                key={i}
                disabled={!enableClick ? true : false}
                clicked={(pokemonId) => cardWasClicked(pokemonId, i)}
                id={i}
                flipWrong={mustFlip}
                cardId={card.id}
                name={card.name}
                frontImage={card.sprites}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

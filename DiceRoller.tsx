import React, { useEffect, useState } from "react";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import deployedContracts from "~~/contracts/deployedContracts";

const dotMap = {
  0: ["center"],
  1: ["bottom-left", "top-right"],
  2: ["bottom-left", "center", "top-right"],
  3: ["top-left", "bottom-left", "top-right", "bottom-right"],
  4: ["top-left", "bottom-left", "center", "top-right", "bottom-right"],
  5: ["top-left", "bottom-left", "middle-left", "top-right", "bottom-right", "middle-right"],
};

const dataMap = [
  "Pick someone to unwrap their gift",
  "Unwrap your gift!",
  "Everyone pass their gift to the left!",
  "Everyone pass their gift to the right!",
  "Roll again!",
  "Trade your gift with anyone",
];

function Dice(props: { number: any }) {
  const { number } = props;
  const mappedValues = dotMap[number];

  return (
    <div className="dice bg-green-500 ">
      <div className="dice-inner ">
        {mappedValues !== undefined
          ? mappedValues.map((className: any, index: React.Key | null | undefined) => {
              return <div key={index} className={`dot ${className}`}></div>;
            })
          : ""}
      </div>
    </div>
  );
}

function DiceRoller() {
  const [number, setNumber] = useState<any>(null);
  const [diceList, setDiceList] = useState([]);
  const mappedValues = dotMap[number];

  const contractData = deployedContracts["11155111"];
  const FakeUSDCAddress = contractData.FakeUSDC.address;
  const contractGHOContract = "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60";

  // const SecretSantaAddress = contractData.SecretSanta.address;

  const { writeAsync: startGame } = useScaffoldContractWrite({
    contractName: "SecretSanta",
    functionName: "startGame",
    args: [contractGHOContract],
    // value: parseEther("0.1"),
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });
  const { writeAsync: claim } = useScaffoldContractWrite({
    contractName: "SecretSanta",
    functionName: "pickAndUnwrapGift",
    // args: ["0x5FbDB2315678afecb367f032d93F642f64180aa3"],
    // value: parseEther("0.1"),
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const generateDiceList = () => {
      return [...Array(parseInt(number, 10))].map(() => {
        return Math.floor(Math.random() * 5) + 1;
      });
    };
    setNumber(Math.floor(Math.random() * 5) + 1);
    if (number) {
      setDiceList(generateDiceList());
    }
  };

  return (
    <div className="app">
      <button
        className="py-2 px-16 mb-1 mt-3 mr-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
        onClick={() => startGame()}
      >
        Start Game
      </button>
      <div className="text-center">
        <button
          className="py-2 px-8 mb-1 mt-3 mr-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
          onClick={handleSubmit}
        >
          Roll
        </button>
        <div className="flex items-center justify-center"> {number && <Dice number={number} />}</div>
        {number && <p className="tracking-tighter text-teal-500 mb-0">{dataMap[number]}</p>}

        {dataMap[number] === "Unwrap your gift!" && (
          <button
            className="py-2 px-8 mb-1 mt-3 mr-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50"
            onClick={() => claim()}
          >
            Claim your gift
          </button>
        )}
      </div>
    </div>
  );
}

export default DiceRoller;

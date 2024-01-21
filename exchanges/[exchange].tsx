import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { CiGift } from "react-icons/ci";
import { useScaffoldContractWrite, useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { Address } from "~~/components/scaffold-eth";
import { useAccount, useContractWrite } from "wagmi";
import deployedContracts from "~~/contracts/deployedContracts";
import { ABI } from "../../ABI_GLOBAL.js";
console.log("🚀 ~ ABI:", ABI);

const data = {
  title: "Join the AAVE GHO Secret Santa Celebration! 🎅 ",
  // title: "Join the Buidl Guild Secret Santa Celebration! 🎅 ",
  ownerName: "Buidl Guidl",
  date: "January 24, 2024",
  image: "",
  budget: "1.00 GHO",
  rsvpBy: "January 23, 2024",
  description:
    "This the season of giving and joy, and what better way to spread the holiday spirit than with a Buidl Guidl Secret Santa Crypto Token Exchange! 🎁🌟",
  participants: ["0x4335", "0x4335", "0x4335", "0x4335"],
  rules: "$1.00 Spending Limit",
  exchangeType: "online",
};

function Exchange() {
  const contractData = deployedContracts["11155111"];
  // algora
  console.log("🚀 ~ Exchange ~ contractGHOContract:", contractGHOContract);
  const FakeUSDCAddress = contractData.FakeUSDC.address;
  const SecretSantaAddress = contractData.SecretSanta.address;
  console.log("🚀 ~ Exchange ~ SecretSantaAddress:", SecretSantaAddress);

  const router = useRouter();
  const { address } = useAccount();

  const { data: participants } = useScaffoldContractRead({
    contractName: "SecretSanta",
    functionName: "getParticipants",
  });

  const contractGHOContract = "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60";
  const { writeAsync: approve } = useContractWrite({
    address: "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60",
    abi: ABI,
    functionName: "approve",
    // args: ["", ""],
    args: [SecretSantaAddress, BigInt("5000000000000000000")],

    onError(error) {
      console.log(error);
    },
  });

  // const { writeAsync: approve } = useScaffoldContractWrite({
  //   contractName: "FakeUSDC",
  //   functionName: "approve",
  //   args: [SecretSantaAddress, BigInt("5000000000000000000")],
  //   // value: parseEther("0.1"),
  //   blockConfirmations: 1,
  //   onBlockConfirmation: txnReceipt => {
  //     console.log("Approve transaction blockHash", txnReceipt.blockHash);
  //   },
  // });

  const { writeAsync: joinGame } = useScaffoldContractWrite({
    contractName: "SecretSanta",
    functionName: "joinGame",
    args: [contractGHOContract],
    // value: parseEther("0.1"),
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("JoinGame Transaction blockHash", txnReceipt.blockHash);
    },
  });
  // const { writeAsync: approve } = useScaffoldContractWrite({
  //   contractName: "FakeUSDC",
  //   functionName: "approve",
  //   args: [SecretSantaAddress, BigInt("5000000000000000000")],
  //   // value: parseEther("0.1"),
  //   blockConfirmations: 1,
  //   onBlockConfirmation: txnReceipt => {
  //     console.log("Approve transaction blockHash", txnReceipt.blockHash);
  //   },
  // });

  const isPlayingArrray = participants?.filter(ele => address === ele);

  return (
    <div className="flex items-end justify-center pb-20">
      <div className="w-[950px] mt-12">
        <div className="flex">
          <div className="w-1/4">
            <Image width={1000} height={1000} alt="picture exchage" className="w-[100%] h-auto" src="/pic.png" />
          </div>
          <div className="w-1/2 px-6">
            <p className="text-2xl font-bold  tracking-wider my-0">{data.title}</p>
            <p className="text-xs font-light mt-0 text-gray-500">Hosted by {data.ownerName}</p>

            <div className="mt-6">
              <p className="tracking-tighter text-teal-500 mb-0">
                <strong>Date:</strong> {data.date}
              </p>
              <p className="tracking-tighter text-teal-500 m-0">
                <strong>Budget:</strong> ${data.budget}
              </p>
              <p className="tracking-tighter text-teal-500 m-0">
                <strong>RSVP By:</strong> ${data.rsvpBy}
              </p>
              <p className="tracking-tighter text-gray-500 mt-8">
                <strong>Description:</strong> {data.description}
              </p>
            </div>
          </div>
          <div className="w-1/4 px-6">
            <div className="flex items-center justify-center">
              <div className="bg-[#dbf7f1]  py-2 rounded-md w-[70%] text-center">
                <p className="m-0 text-sm text-gray-600">Participant Numb.</p>
                <p className="m-0 text-teal-500 text-md"> {participants?.length}</p>
              </div>
            </div>
            <div className="mt-12">
              <button
                className="btn btn-sm w-[100%] bg-[#008080] hover:bg-[#109595] hover:border-[#109595] border-[#008080] mb-4"
                onClick={() => router.push("/game")}
              >
                Play
              </button>
              <button
                className="btn btn-sm w-[100%] bg-[#008080] hover:bg-[#109595] hover:border-[#109595] border-[#008080]"
                // disabled={isPrevButtonDisabled}
                onClick={() => joinGame()}
              >
                joinGame
              </button>
              <button
                className="btn btn-sm w-[100%] bg-[#008080] hover:bg-[#109595] hover:border-[#109595] border-[#008080]"
                // disabled={isPrevButtonDisabled}
                onClick={() => approve()}
              >
                Approve
              </button>
            </div>
          </div>
        </div>
        <hr className="my-4 border-t-2 border-gray-200" />

        <div className="grid grid-cols-2 gap-20 p-6">
          {/* The Details */}
          <div className="col-span-1 ">
            <p className="text-2xl font-bold  tracking-wider my-8">The Details</p>
            <div className=" border border-gray-300 shadow-md px-6 py-4 rounded-lg ">
              <div className="flex items-center p-4 border-b border-gray-200">
                <div className="rounded-full bg-green-500 p-2">
                  <CiGift className="text-white text-2xl" />
                </div>
                <div className="ml-6">
                  <p className="tracking-tighter text-teal-500 m-0">
                    <strong>You are gifting to</strong>
                  </p>
                  <p className="text-xs font-light mt-0 text-gray-500">Names have not yet been drawn</p>
                </div>
              </div>
              {/* Rules */}
              <div className="flex items-center p-4 border-b border-gray-200">
                <div className="rounded-full bg-green-500 p-2">
                  <CiGift className="text-white text-2xl" />
                </div>
                <div className="ml-6">
                  <p className="tracking-tighter text-teal-500 m-0">
                    <strong>Rules</strong>
                  </p>
                  <p className="text-xs font-light mt-0 text-gray-500">$1.00 Spending Limit</p>
                  <p className="text-xs font-light mt-2 text-gray-500">{data.description}</p>
                </div>
              </div>
              {/* Exchange Type */}
              <div className="flex items-center p-4 ">
                <div className="rounded-full bg-green-500 p-2">
                  <CiGift className="text-white text-2xl" />
                </div>
                <div className="ml-6">
                  <p className="tracking-tighter text-teal-500 m-0">
                    <strong>Exchange Type</strong>
                  </p>
                  <p className="text-xs font-light mt-1 text-gray-500">{data.exchangeType}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Participants */}
          <div className="col-span-1">
            {/* <p className="text-2xl font-bold  tracking-wider my-8"> {' '}</p> */}
            <div className="h-[98px]"></div>
            <div className=" border border-gray-300 shadow-md px-6 py-4 rounded-lg ">
              <div className="flex items-center p-4 border-b border-gray-200">
                <div className="rounded-full bg-green-500 p-2">
                  <CiGift className="text-white text-2xl" />
                </div>
                <div className="ml-6">
                  <p className="tracking-tighter text-teal-500 m-0">
                    {isPlayingArrray?.length > 0 ? (
                      <strong>You are participating</strong>
                    ) : (
                      <strong>You are not participating</strong>
                    )}
                  </p>
                  {isPlayingArrray?.length > 0 && <Address address={address} />}
                </div>
              </div>
              {/* Rules */}
              <div className="flex items-center p-4 ">
                <div className="rounded-full bg-green-500 p-2">
                  <CiGift className="text-white text-2xl" />
                </div>
                <div className="ml-6">
                  <p className="tracking-tighter text-teal-500 m-0">
                    <strong>Who is Participating</strong>
                  </p>
                  <p className="text-xs font-light mt-0 text-gray-500">Numb of participants: {participants?.length}</p>
                  <ol className="list-decimal pl-4 text-green-500">
                    {participants?.map((participant, index) => (
                      <li key={index} className="mb-2">
                        {/* <span className="text-gray-500 mr-2">{participant}  </span> */}
                        <Address address={participant} />
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              {/* Exchange Type */}
              {/* <div className="flex items-center p-4 ">
                <div className="rounded-full bg-green-500 p-2">
                  <CiGift className="text-white text-2xl" />
                </div>
                <div className="ml-6">
                  <p className="tracking-tighter text-teal-500 m-0">
                    <strong>Exchange Type</strong>
                  </p>
                  <p className="text-xs font-light mt-1 text-gray-500">{data.exchangeType}</p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Exchange;

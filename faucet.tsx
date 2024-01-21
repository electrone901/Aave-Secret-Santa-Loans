import Link from "next/link";
import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractWrite, useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { MetaHeader } from "~~/components/MetaHeader";
import { useAccount } from "wagmi";
import { formatEther } from "viem";

const Faucet: NextPage = () => {
  const { address } = useAccount();

  const { data: balance } = useScaffoldContractRead({
    contractName: "FakeUSDC",
    functionName: "balanceOf",
    args: [address],
  });

  const { writeAsync: mint } = useScaffoldContractWrite({
    contractName: "FakeUSDC",
    functionName: "mint",
    args: [address, BigInt("5000000000000000000")],
    // value: parseEther("0.1"),
    blockConfirmations: 1,
    onBlockConfirmation: txnReceipt => {
      console.log("Mint transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5 text-center text-black ">
          <h1 className=" mb-8">
            <span className="block text-2xl mb-2">Faucet for USDC Tokens</span>
          </h1>
          <p className="mb-8">Your current USDC Tokens: {balance ? formatEther(balance?.toString()) : ""}</p>

          <button
            className="py-2 px-8 mb-1 mt-3 mr-3 bg-green-500 rounded baseline hover:bg-green-300 disabled:opacity-50 text-white"
            onClick={() => mint()}
          >
            Get USDC Tokens
          </button>
        </div>
      </div>
    </>
  );
};

export default Faucet;

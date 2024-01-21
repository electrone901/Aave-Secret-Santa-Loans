import Link from "next/link";
import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";
import Exchange from "./exchanges/[exchange]";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <Exchange />
    </>
  );
};

export default Home;

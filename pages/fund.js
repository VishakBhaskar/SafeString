import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import Web3Modal, { Modal } from "web3modal";
import { useRouter } from "next/router";
import { Web3Storage } from "web3.storage";

import { recordAddress } from "../config";

import Record from "../artifacts/contracts/Record.sol/Record.json";
import CrowdFund from "../artifacts/contracts/CrowdFund.sol/CrowdFund.json";

export default function ShowFunds() {
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [funds, setFunds] = useState([]);
  const router = useRouter();

  useEffect(() => {
    loadFunds();
  }, []);

  async function loadFunds() {
    const web3Modal = new Web3Modal({
      cacheProvider: true,
    });
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    let record = new ethers.Contract(recordAddress, Record.abi, signer);
    const allFunds = await record.getAllFunds();

    let items = [];
    for (let i = 0; i < allFunds.length; i++) {
      const addr = allFunds[i].contractAddress;
      const fundContract = new ethers.Contract(addr, CrowdFund.abi, signer);
      const isClosed = await fundContract.isClosed();
      const fundGoal = await fundContract.getFundGoal();
      const fundCause = await fundContract.getCause();

      if (isClosed == false) {
        let item = {
          contractAddress: allFunds[i].contractAddress,
          goal: fundGoal,
          balance: allFunds[i].balance,
          cause: fundCause,
        };
        items.push(item);
        console.log("Goal is:", item.goal.toString());
      }
    }
    setFunds(items);
    setLoadingState("loaded");
  }

  function showEther(number) {
    if (number == "0") {
      return "0";
    }
    const leng = number.length;
    const something = leng - 18;
    const totalDisplay = leng - 14;
    const whole = number.slice(0, something);
    const points = number.slice(something, totalDisplay);
    const show = whole + "." + points;
    return show;
  }

  async function fundIt(contractAddress) {
    router.push(`/funds/${encodeURIComponent(contractAddress)}`);
  }

  return (
    <div className="bg-black  text-white">
      <Head>
        <title>Post</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <section class="text-gray-600 body-font relative">
        <div class="max-w-2xl mx-auto pt-28">
          <div class="p-4 max-w-full bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Causes
              </h3>
            </div>
            <div class="flow-root">
              <ul
                role="list"
                class="divide-y divide-gray-200 dark:divide-gray-700"
              >
                {funds.map((fund, i) => (
                  <li key={i} class="py-3 sm:py-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-shrink-0">
                        <button
                          className="bg-transparent hover:bg-purple-900 text-gray-100 font-normal hover:text-white py-2 px-4 border border-white-500 hover:border-transparent w-full rounded text-white"
                          onClick={() => fundIt(fund.contractAddress)}
                        >
                          Fund
                        </button>
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {fund.cause}
                        </p>
                        <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                          {fund.contractAddress}
                        </p>
                      </div>
                      <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {showEther(fund.balance.toString())}/
                        {showEther(fund.goal.toString())}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <br></br>
      <Footer />
    </div>
  );
}

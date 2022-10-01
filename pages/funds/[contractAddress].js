import { ethers, ContractFactory, BigNumber } from "ethers";
import React, { useState, useEffect } from "react";
import Web3Modal, { Modal } from "web3modal";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { blogAddress } from "../../config";
import { recordAddress } from "../../config";

import Blog from "../../artifacts/contracts/Blog.sol/Blog.json";
import Record from "../../artifacts/contracts/Record.sol/Record.json";
import CrowdFund from "../../artifacts/contracts/CrowdFund.sol/CrowdFund.json";

export default function Donate() {
  const [formInput, updateFormInput] = useState({
    amount: "",
  });
  const [fund, setFund] = useState({
    cause: "",
    minc: "",
    goal: "",
    balance: "",
    contractAddress: "",
    owner: "",
  });
  //   const [minCo, setMinCo] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  const router = useRouter();
  const contractAddress = router.query.contractAddress;
  console.log(`"${contractAddress}"`);
  console.log(typeof contractAddress);
  // let fund;

  useEffect(() => {
    loadContract();
  }, []);

  async function loadContract() {
    const web3Modal = new Web3Modal({
      cacheProvider: true,
    });
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const fundContract = new ethers.Contract(
      contractAddress,
      CrowdFund.abi,
      signer
    );
    const minimumContribution = await fundContract.getMinimumContro();
    const fundCause = await fundContract.getCause();
    const fundGoal = await fundContract.getFundGoal();
    const bal = await fundContract.getBalance();
    const owner = await fundContract.getOwner();

    const item = {
      contractAddress: contractAddress,
      goal: fundGoal.toString(),
      balance: bal.toString(),
      cause: fundCause,
      minc: minimumContribution.toString(),
      owner: owner,
    };

    setFund(item);

    setLoadingState("loaded");
  }
  console.log("Fund is:", fund);

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

  async function donate() {
    const { amount } = formInput;
    const web3Modal = new Web3Modal({
      cacheProvider: true,
    });
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const fundAmount = ethers.utils.parseEther(amount.toString());
    let fundCo = new ethers.Contract(contractAddress, CrowdFund.abi, signer);
    await fundCo.donate({ value: fundAmount });
    router.push(`/`);
  }

  return (
    <div className="bg-black  text-white">
      <Head>
        <title>Create Fund</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div class="text-white body-font relative my-1">
        <div class=" flex items-center justify-center px-4 ">
          <div class="max-w-4xl  bg-transparent w-full rounded-lg shadow-xl">
            <div class="p-4 border-b">
              <h2 class="text-2xl ">{fund.cause}</h2>
            </div>
            <div>
              <div class="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4 border-b">
                <p class="text-white">Minimum Contribution</p>
                <p>{showEther(fund.minc)} Ether</p>
              </div>
              <div class="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4 border-b">
                <p class="text-white">Goal</p>
                <p>{showEther(fund.goal)} Ether</p>
              </div>
              <div class="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4 border-b">
                <p class="text-white">Raised</p>
                <p>{showEther(fund.balance)} Ether</p>
              </div>
              <div class="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4 border-b">
                <p class="text-white">Contract Address</p>
                <p>{fund.contractAddress}</p>
              </div>
              <div class="md:grid md:grid-cols-2 md:space-y-0 space-y-1 p-4 border-b">
                <p class="text-white">Owner</p>
                <p>{fund.owner}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="lg:w-1/2 md:w-2/3 mx-auto">
          <div class="flex flex-wrap -m-2">
            <div class="p-2 w-1/2 flex mx-auto">
              <div class="relative ">
                <br></br>
                <input
                  type="text"
                  class="w-full bg-black bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={(e) =>
                    updateFormInput({
                      ...formInput,
                      amount: e.target.value,
                    })
                  }
                ></input>
              </div>
            </div>
            <div class="p-2 w-full flex mx-auto">
              <button
                onClick={donate}
                class="flex mx-auto text-black bg-white border-0 py-2 px-8 rounded text-lg"
              >
                Donate
              </button>
            </div>
            <div class="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center"></div>
          </div>
        </div>
      </div>
      <br></br>
      <Footer />
    </div>
  );
}

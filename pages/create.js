import { ethers, ContractFactory, BigNumber } from "ethers";
import React, { useState } from "react";
import Web3Modal, { Modal } from "web3modal";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { blogAddress } from "../config";
import { recordAddress } from "../config";

import Blog from "../artifacts/contracts/Blog.sol/Blog.json";
import Record from "../artifacts/contracts/Record.sol/Record.json";
import CrowdFund from "../artifacts/contracts/CrowdFund.sol/CrowdFund.json";

export default function CreateFund() {
  const [formInput, updateFormInput] = useState({
    goal: "",
    minimumContribution: "",
    cause: "",
  });

  async function deployCrowdFund() {
    const { goal, minimumContribution, cause } = formInput;

    const goalAmount = ethers.utils.parseEther(goal.toString());
    const minContro = ethers.utils.parseEther(minimumContribution.toString());
    // const time = ethers.utils.parseUnits(deliveryTime, 0);

    const web3Modal = new Web3Modal({
      cacheProvider: true,
    });
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const crowdFundFactory = new ContractFactory(
      CrowdFund.abi,
      CrowdFund.bytecode,
      signer
    );
    const crowdfund = await crowdFundFactory.deploy(
      goalAmount,
      minContro,
      cause
    );

    let record = new ethers.Contract(recordAddress, Record.abi, signer);
    await record.storeData(crowdfund.address);
  }

  return (
    <div className="bg-black  text-white">
      <Head>
        <title>Create Fund</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <section class="text-gray-600 body-font relative">
        <div class="container px-5 pt-24 pb-16 mx-auto">
          <div class="flex flex-col text-center w-full mb-12">
            <h1 class="sm:text-5xl text-2xl font-semibold title-font mb-4 text-white">
              Create Fund
            </h1>
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div class="flex flex-wrap -m-2">
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label class="leading-7 text-sm text-white font-semibold">
                    Goal (in Ether)
                  </label>
                  <input
                    type="text"
                    class="w-full bg-black bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={(e) =>
                      updateFormInput({ ...formInput, goal: e.target.value })
                    }
                  ></input>
                </div>
              </div>
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label class="leading-7 text-sm text-white font-semibold">
                    Minimum Contribution (in Ether)
                  </label>
                  <input
                    type="text"
                    class="w-full bg-black bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={(e) =>
                      updateFormInput({
                        ...formInput,
                        minimumContribution: e.target.value,
                      })
                    }
                  ></input>
                </div>
              </div>
              <div class="p-2 w-1/2 flex mx-auto">
                <div class="relative ">
                  <label class="leading-7 text-sm text-white font-semibold ">
                    Cause
                  </label>
                  <input
                    type="text"
                    class="w-full bg-black bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    onChange={(e) =>
                      updateFormInput({
                        ...formInput,
                        cause: e.target.value,
                      })
                    }
                  ></input>
                </div>
              </div>
              <div class="p-2 w-full">
                <button
                  onClick={deployCrowdFund}
                  class="flex mx-auto text-black bg-white border-0 py-2 px-8 rounded text-lg"
                >
                  Create
                </button>
              </div>
              <div class="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center"></div>
            </div>
          </div>
        </div>
      </section>
      <br></br>
      <Footer />
    </div>
  );
}

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

export default function Post() {
  const [post, setPost] = useState([]);

  const [loadingState, setLoadingState] = useState("not-loaded");

  const router = useRouter();
  const cid = router.query.cid;

  useEffect(() => {
    loadPost();
  }, []);

  async function loadPost() {
    const web3Modal = new Web3Modal({
      cacheProvider: true,
    });
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const blogContract = new ethers.Contract(blogAddress, Blog.abi, signer);

    const data = await blogContract.fetchPost(cid);

    const metadataUrl = `https://ipfs.io/ipfs/${cid}/${encodeURIComponent(
      "metadata.json"
    )}`;

    const res = await fetch(metadataUrl);
    if (!res.ok) {
      throw new Error(
        `error fetching post metadata: [${res.status}] ${res.statusText}`
      );
    }

    const metadata = await res.json();
    const imageURL = `https://ipfs.io/ipfs/${cid}/${encodeURIComponent(
      metadata.path
    )}`;

    const postItem = {
      title: data.title,
      image: imageURL,
      body: metadata.body,
      owner: data.owner,
    };
    console.log(post.title);

    setPost(postItem);
    setLoadingState("loaded");
    return postItem;
  }

  return (
    <div className="bg-black  text-white">
      <Head>
        <title>Post</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 pt-16 pb-16 mx-auto">
          {/* k */}

          <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-transparent">
            <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
              <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                <header className="mb-4 lg:mb-6 not-format">
                  <address className="flex items-center mb-6 not-italic">
                    <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                      <div>
                        <a
                          rel="author"
                          className="text-xl font-bold text-gray-900 dark:text-white"
                        >
                          Author : {post.owner}
                        </a>

                        <p className="text-base font-light text-gray-500 dark:text-gray-400"></p>
                      </div>
                    </div>
                  </address>
                  <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                    {post.title}
                  </h1>
                </header>
                <p>
                  <figure>
                    <img src={post.image} alt="" />
                    <figcaption></figcaption>
                  </figure>
                </p>
                <br></br>
                <p className="text-xl text-gray-900 dark:text-white">
                  {post.body}
                </p>

                <pre></pre>
              </article>
            </div>
          </main>
        </div>
      </section>
      <br></br>
      <Footer />
    </div>
  );
}

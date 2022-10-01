import { ethers } from "ethers";
import React, { useState } from "react";
import Web3Modal, { Modal } from "web3modal";
import { useRouter } from "next/router";
import { Web3Storage } from "web3.storage";
import { File } from "web3.storage";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  showLink,
  makeGatewayURL,
  jsonFile,
  showMessage,
} from "../utils/helper";

import { blogAddress } from "../config";
import { recordAddress } from "../config";

import Blog from "../artifacts/contracts/Blog.sol/Blog.json";

export default function Create() {
  const [fileUrl, setFileUrl] = useState(null);

  const [formInput, updateFormInput] = useState({
    title: "",
    body: "",
  });
  const router = useRouter();
  let image;

  function onChange(e) {
    image = e.target.files[0];
  }

  async function ipfsUpload() {
    /* upload image to IPFS */
    const { title, body } = formInput;
    if (!title || !body || !image) return;
    const metadataFile = new File(
      [
        JSON.stringify({
          title: title,
          body: body,
          path: image.name,
        }),
      ],
      "metadata.json"
    );

    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDcwNzNBODc1YTQ1QTNBOUEyRTBmZDExZmVjYjFmNzg2ZjcwNWE1MzAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjA1NDY1NjE1MjYsIm5hbWUiOiJORlQgTWFya2V0cGxhY2UifQ.fJEoNXH2gGn0ZyJi4Mt61m8sYsvpwOKGSqAQzGP4ftw`;

    if (!token) {
      console.log(`Found the token not here: ${token}`);
    }

    try {
      const onRootCidReady = (cid) => {
        console.log("uploading files with cid:", cid);
      };
      const totalSize = [image, metadataFile]
        .map((f) => f.size)
        .reduce((a, b) => a + b, 0);
      let uploaded = 0;

      const onStoredChunk = (size) => {
        uploaded += size;
        const pct = 100 * (uploaded / totalSize);
        console.log(`Uploading... ${pct.toFixed(2)}% complete`);
      };
      const client = new Web3Storage({ token });
      const cid = await client.put([image, metadataFile], {
        onRootCidReady,
        onStoredChunk,
      });
      console.log("Stored files with cid:", cid);
      const imageUrl = `https://ipfs.io/ipfs/${cid}/${encodeURIComponent(
        image.name
      )}`;
      const metadataUrl = `https://ipfs.io/ipfs/${cid}/${encodeURIComponent(
        "metadata.json"
      )}`;
      const ipfsFileUrl = `https://ipfs.io/ipfs/${cid}/`;
      setFileUrl(ipfsFileUrl);
      return { cid, imageUrl, metadataUrl, fileUrl };
    } catch (error) {
      console.log("Error uploading file:", error);
    }
  }

  //

  async function createPost() {
    const { title, body } = formInput;
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const { cid, imageUrl, metadataUrl, fileUrl } = await ipfsUpload();

    let contract = new ethers.Contract(blogAddress, Blog.abi, signer);

    let transaction = await contract.createPost(title, cid);
    await transaction.wait();

    router.push("/");
  }

  return (
    <div className="bg-black  text-white">
      <Head>
        <title>Post</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 pt-24 pb-16 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-5xl text-2xl font-semibold title-font mb-4 text-white">
              Create New Post
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base font-semibold">
              {/* Contact us if you have any issues with the website or just want to
              ask a question! */}
            </p>
          </div>
          <div className="lg:w-3/4 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-3/4">
                <div className="relative">
                  <label className="leading-7 text-sm text-white font-semibold">
                    Title
                  </label>
                  <input
                    onChange={(e) =>
                      updateFormInput({ ...formInput, title: e.target.value })
                    }
                    className="w-full bg-black bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>

              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    // for="message"
                    className="leading-7 text-sm text-white font-semibold"
                  />
                  Body
                  <textarea
                    className="w-full bg-black bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    onChange={(e) =>
                      updateFormInput({ ...formInput, body: e.target.value })
                    }
                  />
                </div>
              </div>

              <input
                type="file"
                name="Asset"
                className="my-4"
                onChange={onChange}
              />

              <div className="p-2 w-full">
                {fileUrl && (
                  <img className="rounded mt-4" width="350" src={fileUrl} />
                )}
                <button
                  onClick={createPost}
                  className="flex mx-auto text-black bg-white border-0 py-2 px-8 rounded text-lg"
                >
                  Post
                </button>
              </div>
              <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center"></div>
            </div>
          </div>
        </div>
      </section>
      <br></br>
      <Footer />
    </div>
  );
}

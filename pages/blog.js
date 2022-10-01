import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { blogAddress } from "../config";

import Blog from "../artifacts/contracts/Blog.sol/Blog.json";

export default function AllBlogs() {
  const [posts, setPosts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const router = useRouter();
  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    const web3Modal = new Web3Modal({
      cacheProvider: true,
    });
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(blogAddress, Blog.abi, signer);
    const data = await contract.fetchPosts();

    const items = await Promise.all(
      data.map(async (i) => {
        const cid = i.content;
        const metadataUrl = `https://ipfs.io/ipfs/${cid}/${encodeURIComponent(
          "metadata.json"
        )}`;
        const res = await fetch(metadataUrl);
        if (!res.ok) {
          throw new Error(
            `error fetching image metadata: [${res.status}] ${res.statusText}`
          );
        }
        const metadata = await res.json();
        const imageURL = `https://ipfs.io/ipfs/${cid}/${encodeURIComponent(
          metadata.path
        )}`;

        let item = {
          postId: i.id.toNumber(),
          title: i.title,
          owner: i.owner,
          image: imageURL,
          body: metadata.body,
          cid: cid,
        };
        return item;
      })
    );
    setPosts(items);
    setLoadingState("loaded");
  }

  async function viewPost(cid) {
    router.push(`/blogs/${encodeURIComponent(cid)}`);
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
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-4xl text-2xl font-semibold title-font mb-4 text-white">
              Blogs
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base font-semibold"></p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {/* k */}
            {posts.map((post, i) => (
              <div
                key={i}
                className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
              >
                <a onClick={() => viewPost(post.cid)}>
                  <img class="rounded-t-lg" src={post.image} alt="" />
                </a>
                <div className="p-5">
                  <a onClick={() => viewPost(post.cid)}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {post.title.slice(0, 100)}
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {post.body.slice(0, 100)}
                  </p>
                  <a
                    onClick={() => viewPost(post.cid)}
                    className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Read more
                    <svg
                      aria-hidden="true"
                      className="ml-2 -mr-1 w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <br></br>
      <Footer />
    </div>
  );
}

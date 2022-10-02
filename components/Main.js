import Link from "next/link";
export default function Main() {
  return (
    <section className="text-black body-font lg:pt-20">
      <div className="container px-5 pt-32 mx-auto lg:px-4 lg:py-4">
        <div className="flex flex-col w-full mb-2 text-left md:text-center ">
          <h1 className="mb-2 text-6xl font-bold tracking-tighter text-white lg:text-8xl md:text-7xl">
            <span>Protect your work </span>
            <br className="hidden lg:block"></br>
            Stay independent
          </h1>
          <br></br>
          <p className="mx-auto  text-xl font-normal leading-relaxed text-gray-600 dark:text-gray-300 lg:w-2/3">
            Where your work remains Protected, Uncensored, Safe & Forever yours
          </p>
        </div>
      </div>
      {/* k */}

      {/* k */}
      <section class="bg-white border-b py-8">
        <div class="container mx-auto flex flex-wrap pt-4 pb-12">
          <h2 class="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
            Why Safe String?
          </h2>

          <div class="w-full mb-4">
            <div class="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
          </div>
          <div class="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
            <div class="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
              <div class="w-full font-bold text-xl text-gray-800 px-6">
                Own your work
              </div>
              <br></br>
              <br></br>
              <p class="text-gray-800 text-base px-6 mb-5">
                Your work will always be yours. Your ownership of the data will
                always be verifiable on-chain by anyone. Neither can your
                research papers be hacked.
                <br></br>
                <br></br>
                You, as a researcher decide who sees it and whether you want
                them to pay for your hardwork or put it out for anyone to view
                and use.
                <br></br>
                Store your work. Forever. Ucensored. All your work is stored in
                decentralised storage. Even if we stop working, you never lose
                your data.
              </p>
            </div>
          </div>
          <div class="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
            <div class="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
              <div class="w-full font-bold text-xl text-gray-800 px-6">
                Work independently
              </div>
              <br></br>
              <br></br>
              <p class="text-gray-800 text-base px-6 mb-5">
                Don&apos;t let the &quot; big funders &quot; control how you do
                your research. You don&apos;t have to let them tweak your
                research papers according to their will.
                <br></br>
                <br></br>
                Work independently. Get funded by the community. Earn with the
                community. Let the consumers of the products know what they are
                actually using from your independent research.<br></br>
                Due to the decentralised way of working, no one will be able to
                take down your findings. We mean it. No one.
              </p>
            </div>
            <div class="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden shadow p-6"></div>
          </div>
          <div class="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
            <div class="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow">
              <div class="w-full font-bold text-xl text-gray-800 px-6">
                Earn by supporting
              </div>
              <br></br> <br></br>
              <p class="text-gray-800 text-base px-6 mb-5">
                Everyone wins here. Support the scholars to do their research
                independently by funding them. Invest and earn from the revenue
                generated by the papers.
                <br></br> <br></br>
                Or be a saviour of science and humankind by funding researches
                which will be free to view and use once it is published. Be part
                of the revlotion. You&apos;ll always be remembered for it.
                On-chain. Always
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-white border-b py-2">
        <div class="container mx-auto flex flex-wrap pt-4 pb-12">
          <h2 class="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
            Get Started
          </h2>

          <div class="w-full mb-4">
            <div class="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
          </div>
          <div class="w-full md:w-1/3 p-6 bg-black flex flex-col flex-grow flex-shrink">
            <div class="flex-1 bg-transparent rounded-t rounded-b-none overflow-hidden shadow">
              <div class="w-full font-bold text-xl text-white px-6">
                Create a fund
              </div>
              <br></br> <br></br>
              <p class="text-gray-200 text-base px-6 mb-5">
                Create a fund so the crowd can support the cause, help you carry
                out your research independently.
              </p>
            </div>
            <div class="flex-none mt-auto bg-transparent rounded-b rounded-t-none overflow-hidden shadow p-6"></div>
            <div class="flex items-center justify-center">
              <Link href="/create">
                <button class="mx-auto lg:mx-0 hover:underline gradient text-black bg-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                  Create
                </button>
              </Link>
            </div>
          </div>
          <div class="w-full md:w-1/3 p-6 bg-black flex flex-col flex-grow flex-shrink">
            <div class="flex-1 bg-transparent rounded-t rounded-b-none overflow-hidden shadow">
              <div class="w-full font-bold text-xl text-white px-6">
                Post or upload
              </div>
              <br></br> <br></br>
              <p class="text-gray-200 text-base px-6 mb-5">
                Upload your work or post an article to the IPFS. Store it
                permanently
              </p>
            </div>
            <div class="flex-none mt-auto bg-transparent rounded-b rounded-t-none overflow-hidden shadow p-6"></div>
            <div class="flex items-center justify-center">
              <Link href="/post">
                <button class="mx-auto lg:mx-0 hover:underline gradient text-black bg-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                  Post
                </button>
              </Link>
            </div>
          </div>
          <div class="w-full md:w-1/3 p-6 bg-black flex flex-col flex-grow flex-shrink">
            <div class="flex-1 bg-transparent rounded-t rounded-b-none overflow-hidden shadow">
              <div class="w-full font-bold text-xl text-white px-6">Fund</div>
              <br></br> <br></br>
              <p class="text-gray-200 text-base px-6 mb-5">
                Start investing in science. Fund a researcher. Fund a research.
                Earn.
              </p>
            </div>
            <div class="flex-none mt-auto bg-transparent rounded-b rounded-t-none overflow-hidden shadow p-6"></div>
            <div class="flex items-center justify-center">
              <Link href="/fund">
                <button class="mx-auto lg:mx-0 hover:underline gradient text-black bg-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                  Fund
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="text-gray-600 body-font"></section>
    </section>
  );
}

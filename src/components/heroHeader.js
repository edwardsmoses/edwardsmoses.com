import React from "react";

export default () => (
  <>
    <div className="relative">
      <div className="absolute inset-x-0 bottom-0 bg-gray-100 h-1/2"></div>
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-app-black"
              style={{ mixBlendMode: "multiply" }}
            ></div>
          </div>
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="px-4 mx-auto mt-10 max-w-7xl sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-4xl">
                  <span className="block xl:inline">
                    Hello, I'm Edwards Moses.
                    <small className="block mr-5">
                      A Full Stack Software Developer <br /> (React, React Native /
                      .NET Core)
                    </small>
                  </span>
                  <small className="block text-app-purple xl:inline">
                    based in Lagos, Nigeria
                  </small>
                </h1>
                <p className="mt-3 text-base text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Helping companies solve business challenges by building
                  complex web and mobile applications with React, .NET and modern
                  technologies.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a
                      href="mailto://edwardsmoses3@gmail.com"
                      className="flex items-center justify-center w-full px-8 py-3 text-xl font-medium bg-indigo-100 border border-transparent rounded-md text-app-purple hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                    >
                      Get In Touch. Start your Project.
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
          <div className="absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <img
              className="object-cover w-full h-56 sm:h-72 md:h-96 lg:w-full lg:h-full heroHeaderMeImage"
              src="/assets/i.JPG"
              alt="Edwards Moses, Software Developer, Lagos Nigeria"
            />
          </div>
        </div>
      </div>
    </div>

    <div className="bg-gray-100 mt-44 md:mt-0">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 mt-6 gap-x-6 md:grid-cols-6 lg:grid-cols-5">
          <a href="https://app.gun.io/app/freelancer/4c7e2438-8f8d-4d37-a43b-4de6ad3bdba7/" target="_blank" className="flex justify-center col-span-1 cursor-pointer md:col-span-2 lg:col-span-1">
            <img
              className="h-16 my-auto md:h-20"
              src="/icons/gun.io.png"
              alt="Edwards Moses freelances at Gun.io"
            />
          </a>
          <a href="https://www.upwork.com/freelancers/~013da23dfa6724ea97" target="_blank" className="flex justify-center col-span-1 cursor-pointer md:col-span-2 lg:col-span-1">
            <img
              className="h-16 my-auto md:h-24"
              src="/icons/upwork.png"
              alt="Edwards Moses Upwork Profile"
            />
          </a>
          <a href="https://github.com/edwardsmoses" target="_blank" className="flex justify-center col-span-1 cursor-pointer md:col-span-2 lg:col-span-1">
            <img
              className="h-16 my-auto md:h-24"
              src="/icons/github.png"
              alt="Edwards Moses Github Profile"
            />
          </a>
          <a href="https://www.linkedin.com/in/edwards-moses/" target="_blank" className="flex justify-center col-span-1 md:col-span-2 lg:col-span-1">
            <img
              className="h-16 my-auto md:h-24"
              src="/icons/linkedin.png"
              alt="Edwards Moses Linkedin Profile"
            />
          </a>
          <a href="https://learnflo.co.uk/" target="_blank" className="flex justify-center col-span-1 cursor-pointer md:col-span-2 lg:col-span-1">
            <img
              className="h-16 my-auto md:h-24"
              src="/icons/learnflo.png"
              alt="Edwards Moses works at Learnflo"
            />
          </a>
        </div>
      </div>
    </div>
  </>
);

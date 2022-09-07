import React from "react";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-4 md:order-2">
          <a href="mailto:edwardsmoses3@gmail.com" target="_blank" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Email</span>

            <img
              className="w-6 h-6"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDQwIDMwIj4KICA8ZyBpZD0iZ21haWwiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTY0KSI+CiAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlXzIiIGRhdGEtbmFtZT0iUmVjdGFuZ2xlIDIiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNSA2NCkiIGZpbGw9IiNlY2VmZjEiLz4KICAgIDxwYXRoIGlkPSJQYXRoXzQiIGRhdGEtbmFtZT0iUGF0aCA0IiBkPSJNMjU2LDE2MC4yMTJsMTUsMTEuODQ1VjE0OC42NzJaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjM2IC03OC4wNTcpIiBmaWxsPSIjY2ZkOGRjIi8+CiAgICA8cGF0aCBpZD0iUGF0aF81IiBkYXRhLW5hbWU9IlBhdGggNSIgZD0iTTM2LjI1LDY0SDM1TDIwLDc1Ljg0NSw1LDY0SDMuNzVBMy43NTEsMy43NTEsMCwwLDAsMCw2Ny43NXYyMi41QTMuNzUxLDMuNzUxLDAsMCwwLDMuNzUsOTRINVY3MC42MTVMMjAsODIuMTUybDE1LTExLjU0Vjk0aDEuMjVBMy43NTEsMy43NTEsMCwwLDAsNDAsOTAuMjVWNjcuNzVBMy43NTEsMy43NTEsMCwwLDAsMzYuMjUsNjRaIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDApIiBmaWxsPSIjZjQ0MzM2Ii8+CiAgPC9nPgo8L3N2Zz4K"
              alt="gmail"
            ></img>
          </a>

          <a
            href="https://www.linkedin.com/in/edwards-moses/"
            target="_blank"
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Linkedin</span>
            <img
              className="w-6 h-6"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj4KICA8cGF0aCBpZD0ibGlua2VkaW4iIGQ9Ik0zNC4xNDEsMEg1Ljg1OUE1Ljg2Niw1Ljg2NiwwLDAsMCwwLDUuODU5VjM0LjE0MUE1Ljg2Niw1Ljg2NiwwLDAsMCw1Ljg1OSw0MEgzNC4xNDFBNS44NjYsNS44NjYsMCwwLDAsNDAsMzQuMTQxVjUuODU5QTUuODY2LDUuODY2LDAsMCwwLDM0LjE0MSwwWm0tMjAsMzEuNzE5SDkuNDUzVjE1LjMxM2g0LjY4OFptMC0xOC43NUg5LjQ1M1Y4LjI4MWg0LjY4OFptMTYuNDA2LDE4Ljc1SDI1Ljg1OVYyMi4zNDRhMi4zNDQsMi4zNDQsMCwwLDAtNC42ODcsMHY5LjM3NUgxNi40ODRWMTUuMzEzaDQuNjg4VjE2LjJhMTAuMTYxLDEwLjE2MSwwLDAsMSwzLjUxNi0uODgzLDYuMTM1LDYuMTM1LDAsMCwxLDUuODU5LDYuMjI2Wm0wLDAiIGZpbGw9IiMwMDdhYjkiLz4KPC9zdmc+Cg=="
              alt="linkedin"
            />
          </a>

          <a href="https://twitter.com/atedwardsmoses" target="_blank" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">Twitter</span>

            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 48 48" width="48px" height="48px">
              <path
                fill="#03A9F4"
                d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"
              />
            </svg>
          </a>

          <a href="https://github.com/edwardsmoses" target="_blank" className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">GitHub</span>

            <svg
              className="w-6 h-6"
              fill="#000000"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              width="48px"
              height="48px"
            >
              <path d="M32,10c12.15,0,22,9.85,22,22c0,9.768-6.369,18.045-15.179,20.916c0.002-0.008,0.006-0.021,0.006-0.021	s-1.485-0.696-1.453-1.938c0.035-1.367,0-4.556,0-5.727c0-2.01-1.272-3.434-1.272-3.434s9.977,0.112,9.977-10.533	c0-4.107-2.147-6.245-2.147-6.245s1.128-4.385-0.39-6.245c-1.701-0.184-4.749,1.626-6.05,2.472c0,0-2.062-0.846-5.492-0.846	c-3.43,0-5.492,0.846-5.492,0.846c-1.301-0.846-4.348-2.656-6.05-2.472c-1.518,1.86-0.39,6.245-0.39,6.245s-2.147,2.137-2.147,6.245	c0,10.645,9.977,10.533,9.977,10.533s-1.005,1.136-1.225,2.806c-0.696,0.236-1.721,0.528-2.549,0.528	c-2.165,0-3.812-2.105-4.416-3.078c-0.595-0.96-1.815-1.766-2.953-1.766c-0.749,0-1.115,0.375-1.115,0.803s1.05,0.727,1.743,1.521	c1.461,1.674,1.435,5.438,6.641,5.438c0.565,0,1.719-0.139,2.588-0.256c-0.005,1.185-0.007,2.436,0.012,3.167	c0.031,1.242-1.453,1.938-1.453,1.938s0.004,0.012,0.006,0.021C16.369,50.045,10,41.768,10,32C10,19.85,19.85,10,32,10z" />
            </svg>
          </a>

          <a
            href="https://www.upwork.com/freelancers/~013da23dfa6724ea97"
            target="_blank"
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Upwork</span>

            <svg
              className="w-6 h-6"
              fill="#000000"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 50 50"
              width="50px"
              height="50px"
            >
              <path d="M 1 9 C 0.448 9 0 9.448 0 10 L 0 24.115234 C 0 30.276234 4.6829844 35.631469 10.833984 35.980469 C 16.730984 36.314469 21.747875 32.176391 22.796875 26.650391 C 23.366875 27.420391 23.94625 28.135969 24.53125 28.792969 L 21.001953 43.771484 C 20.932953 44.069484 21.002406 44.380094 21.191406 44.621094 C 21.382406 44.859094 21.670563 45 21.976562 45 L 27.095703 45 C 27.559703 45 27.959406 44.687328 28.066406 44.236328 C 28.687406 41.615328 29.660969 37.508156 30.542969 33.785156 L 31.453125 34.3125 C 33.618125 35.4335 35.815 36 38 36 C 45.192 36 50.926 29.641 49.875 22.25 C 49.179 17.354 45.414078 13.318344 40.580078 12.277344 C 34.951078 11.064344 29.525359 13.949141 27.193359 18.744141 C 27.193359 18.744141 26.934562 19.318578 26.726562 19.892578 C 25.076563 17.046578 24.107609 14.094078 23.599609 11.955078 C 23.414609 11.175078 23.137469 9.762875 23.105469 9.671875 C 22.966469 9.268875 22.589109 9 22.162109 9 L 17 9 C 16.448 9 16 9.448 16 10 L 16 24.300781 C 16 26.649781 14.287219 28.750516 11.949219 28.978516 C 9.2672187 29.240516 7 27.13 7 24.5 L 7 10 C 7 9.448 6.552 9 6 9 L 1 9 z M 38 19 C 40.757 19 43 21.243 43 24 C 43 26.757 40.757 29 38 29 C 35.775 29 33.713531 27.658281 32.269531 26.488281 C 32.796531 24.263281 33.15025 22.773047 33.15625 22.748047 C 33.72425 20.541047 35.717 19 38 19 z" />
            </svg>
          </a>
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-base text-center text-gray-400">
            © Edwards Moses{" "}
            <span role="img" aria-label="love">
              ❤️
            </span>{" "}
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import ThemeChanger from "./themeChanger";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-4 md:order-2">
          <a
            href="https://www.linkedin.com/in/edwards-moses/"
            target="_blank"
            className="text-gray-400 dark:text-white hover:text-gray-500"
          >
            <span className="sr-only">Linkedin</span>
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 transition ">
              <path d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 01-1.548-1.549 1.548 1.548 0 111.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z"></path>
            </svg>
          </a>

          <a
            href="https://github.com/edwardsmoses"
            target="_blank"
            className="text-gray-400 dark:text-white hover:text-gray-500"
          >
            <span className="sr-only">GitHub</span>

            <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className="h-6 w-6 transition">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.475 2 2 6.588 2 12.253c0 4.537 2.862 8.369 6.838 9.727.5.09.687-.218.687-.487 0-.243-.013-1.05-.013-1.91C7 20.059 6.35 18.957 6.15 18.38c-.113-.295-.6-1.205-1.025-1.448-.35-.192-.85-.667-.013-.68.788-.012 1.35.744 1.538 1.051.9 1.551 2.338 1.116 2.912.846.088-.666.35-1.115.638-1.371-2.225-.256-4.55-1.14-4.55-5.062 0-1.115.387-2.038 1.025-2.756-.1-.256-.45-1.307.1-2.717 0 0 .837-.269 2.75 1.051.8-.23 1.65-.346 2.5-.346.85 0 1.7.115 2.5.346 1.912-1.333 2.75-1.05 2.75-1.05.55 1.409.2 2.46.1 2.716.637.718 1.025 1.628 1.025 2.756 0 3.934-2.337 4.806-4.562 5.062.362.32.675.936.675 1.897 0 1.371-.013 2.473-.013 2.82 0 .268.188.589.688.486a10.039 10.039 0 0 0 4.932-3.74A10.447 10.447 0 0 0 22 12.253C22 6.588 17.525 2 12 2Z"
              ></path>
            </svg>
          </a>

          <a
            href="https://twitter.com/atedwardsmoses"
            target="_blank"
            className="text-gray-400 dark:text-white hover:text-gray-500"
          >
            <span className="sr-only">Twitter</span>

            <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className="h-6 w-6  transition">
              <path d="M20.055 7.983c.011.174.011.347.011.523 0 5.338-3.92 11.494-11.09 11.494v-.003A10.755 10.755 0 0 1 3 18.186c.308.038.618.057.928.058a7.655 7.655 0 0 0 4.841-1.733c-1.668-.032-3.13-1.16-3.642-2.805a3.753 3.753 0 0 0 1.76-.07C5.07 13.256 3.76 11.6 3.76 9.676v-.05a3.77 3.77 0 0 0 1.77.505C3.816 8.945 3.288 6.583 4.322 4.737c1.98 2.524 4.9 4.058 8.034 4.22a4.137 4.137 0 0 1 1.128-3.86A3.807 3.807 0 0 1 19 5.274a7.657 7.657 0 0 0 2.475-.98c-.29.934-.9 1.729-1.713 2.233A7.54 7.54 0 0 0 22 5.89a8.084 8.084 0 0 1-1.945 2.093Z"></path>
            </svg>
          </a>

          <a
            href="https://www.cloudskillsboost.google/public_profiles/3d59bd2b-25b6-4cf2-8c8e-82ec5030f107"
            target="_blank"
            className="text-gray-400 dark:text-white hover:text-gray-500"
          >
            <span className="sr-only">Google Cloud</span>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="28px" height="28px">
              <linearGradient
                id="nBzteS51Qxjtut4Vh3V9ra"
                x1="46.95"
                x2="24.45"
                y1="23.75"
                y2="25.25"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#2aa4f4" />
                <stop offset="1" stop-color="#007ad9" />
              </linearGradient>
              <path
                fill="url(#nBzteS51Qxjtut4Vh3V9ra)"
                d="M38.193,18.359c-0.771-2.753-2.319-5.177-4.397-7.03l-4.598,4.598	c1.677,1.365,2.808,3.374,3.014,5.648v1.508c0.026,0,0.05-0.008,0.076-0.008c2.322,0,4.212,1.89,4.212,4.212S34.61,31.5,32.288,31.5	c-0.026,0-0.05-0.007-0.076-0.008V31.5h-6.666H24V38h8.212v-0.004c0.026,0,0.05,0.004,0.076,0.004C38.195,38,43,33.194,43,27.288	C43,23.563,41.086,20.279,38.193,18.359z"
              />
              <path
                fill="#ffe082"
                d="M19.56,25.59l4.72-4.72c-0.004-0.005-0.008-0.009-0.011-0.013l-4.717,4.717	C19.554,25.579,19.557,25.584,19.56,25.59z"
                opacity=".5"
              />
              <path
                fill="#90caf9"
                d="M19.56,25.59l4.72-4.72c-0.004-0.005-0.008-0.009-0.011-0.013l-4.717,4.717	C19.554,25.579,19.557,25.584,19.56,25.59z"
                opacity=".5"
              />
              <linearGradient
                id="nBzteS51Qxjtut4Vh3V9rb"
                x1="24.835"
                x2="18.428"
                y1="9.608"
                y2="19.289"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#f7572f" />
                <stop offset=".523" stop-color="#f7552d" />
                <stop offset=".712" stop-color="#f75026" />
                <stop offset=".846" stop-color="#f7461b" />
                <stop offset=".954" stop-color="#f7390a" />
                <stop offset="1" stop-color="#f73100" />
              </linearGradient>
              <path
                fill="url(#nBzteS51Qxjtut4Vh3V9rb)"
                d="M24,7.576c-8.133,0-14.75,6.617-14.75,14.75c0,0.233,0.024,0.46,0.035,0.69h6.5	c-0.019-0.228-0.035-0.457-0.035-0.69c0-4.549,3.701-8.25,8.25-8.25c1.969,0,3.778,0.696,5.198,1.851l4.598-4.598	C31.188,9.003,27.761,7.576,24,7.576z"
              />
              <path
                fill="#90caf9"
                d="M15.712,31.5L15.712,31.5c-0.001,0-0.001,0-0.002,0c-0.611,0-1.188-0.137-1.712-0.373	l-4.71,4.71C11.081,37.188,13.301,38,15.71,38c0.001,0,0.001,0,0.002,0v0H24v-6.5H15.712z"
                opacity=".5"
              />
              <linearGradient
                id="nBzteS51Qxjtut4Vh3V9rc"
                x1="31.305"
                x2="8.555"
                y1="40.347"
                y2="30.222"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#4caf50" />
                <stop offset=".486" stop-color="#4aae50" />
                <stop offset=".661" stop-color="#43a94e" />
                <stop offset=".786" stop-color="#38a14c" />
                <stop offset=".887" stop-color="#279648" />
                <stop offset=".972" stop-color="#184" />
                <stop offset="1" stop-color="#088242" />
              </linearGradient>
              <path
                fill="url(#nBzteS51Qxjtut4Vh3V9rc)"
                d="M15.712,31.5L15.712,31.5c-0.001,0-0.001,0-0.002,0c-0.611,0-1.188-0.137-1.712-0.373	l-4.71,4.71C11.081,37.188,13.301,38,15.71,38c0.001,0,0.001,0,0.002,0v0H24v-6.5H15.712z"
              />
              <linearGradient
                id="nBzteS51Qxjtut4Vh3V9rd"
                x1="17.16"
                x2="7.285"
                y1="28.692"
                y2="19.067"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#ffd747" />
                <stop offset=".482" stop-color="#ffd645" />
                <stop offset=".655" stop-color="#fed43e" />
                <stop offset=".779" stop-color="#fccf33" />
                <stop offset=".879" stop-color="#fac922" />
                <stop offset=".964" stop-color="#f7c10c" />
                <stop offset="1" stop-color="#f5bc00" />
              </linearGradient>
              <path
                fill="url(#nBzteS51Qxjtut4Vh3V9rd)"
                d="M11.5,27.29c0-2.32,1.89-4.21,4.21-4.21c1.703,0,3.178,1.023,3.841,2.494l4.717-4.717	c-1.961-2.602-5.065-4.277-8.559-4.277C9.81,16.58,5,21.38,5,27.29c0,3.491,1.691,6.59,4.288,8.547l4.71-4.71	C12.53,30.469,11.5,28.999,11.5,27.29z"
              />
            </svg>
          </a>

          <a
            href="https://work.edwardsmoses.com/"
            target="_blank"
            className="text-gray-400 dark:text-white hover:text-gray-500"
          >
            <span className="sr-only">Polywork</span>

            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 25 24" fill="none">
              <g clip-path="url(#clip0_66_27005)">
                <path
                  d="M8.33911 23.4V16.2H15.9201V19.125C15.9201 21.45 14.0249 23.4 11.5989 23.4H8.33911Z"
                  fill="#88CFB0"
                ></path>
                <path
                  d="M16.0718 16.0499V8.3999H23.6528V11.7749C23.6528 14.0999 21.7575 16.0499 19.3316 16.0499H16.0718Z"
                  fill="#F2C94C"
                ></path>
                <path d="M15.9201 8.3999H8.33911V15.9749H15.9201V8.3999Z" fill="#BD83CE"></path>
                <path
                  d="M0.606445 8.2501V4.8751C0.606445 2.5501 2.5017 0.600098 4.92763 0.600098H8.18747V8.2501H0.606445Z"
                  fill="#40BE88"
                ></path>
                <path
                  d="M16.0718 8.2501V0.600098H19.3316C21.6817 0.600098 23.6528 2.4751 23.6528 4.8751V8.2501H16.0718Z"
                  fill="#FF7474"
                ></path>
                <path d="M15.9201 0.600098H8.33911V8.1751H15.9201V0.600098Z" fill="#6776F9"></path>
                <path
                  d="M0.606445 19.125V16.2H8.18747V23.4H4.92763C2.5017 23.4 0.606445 21.525 0.606445 19.125Z"
                  fill="#37C2E2"
                ></path>
                <path d="M8.18747 8.3999H0.606445V15.9749H8.18747V8.3999Z" fill="#F2994A"></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0 19.125V4.875C0 2.175 2.1985 0 4.92766 0H19.3316C22.0608 0 24.2593 2.175 24.2593 4.875V11.775C24.2593 14.475 22.0608 16.65 19.3316 16.65H16.5266V19.125C16.5266 21.825 14.3281 24 11.5989 24H4.92766C2.1985 24 0 21.825 0 19.125ZM7.58102 7.575H1.28877V4.8C1.28877 2.85 2.88079 1.2 4.92766 1.2H7.58102V7.575ZM19.3316 15.45H16.6783V8.99998H22.9705V11.85C22.9705 13.8 21.3785 15.45 19.3316 15.45ZM11.5989 22.8H8.94558V16.875H15.2378V19.2C15.2378 21.15 13.6458 22.8 11.5989 22.8ZM8.94558 15.45H15.2378V8.99998H8.94558V15.45ZM16.6783 7.575H22.9705V4.875C22.9705 2.85 21.3027 1.275 19.3316 1.275H16.6783V7.575ZM15.2378 7.575H8.94558V1.2H15.2378V7.575ZM1.21296 16.8V19.125C1.21296 21.15 2.88079 22.725 4.85185 22.725H7.58102V16.8H1.21296ZM7.58102 15.45H1.21296V8.99998H7.58102V15.45Z"
                  fill="#2F2F3A"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_66_27005">
                  <rect width="24.2593" height="24" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
          </a>

          <ThemeChanger />
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-base text-center text-gray-400">
            Edwards Moses <span>©</span> {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

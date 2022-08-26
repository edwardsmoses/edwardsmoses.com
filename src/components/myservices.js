import React from "react";

const services = [
  {
    title: "Development & prototyping",
    description:
      "Have an idea? I’ve been building software for nearly a decade. Let's work together - let's get your project launched!",
    icon: () => {
      return (
        <div className="bg-app-brand-yellow p-2 rounded-md w-min flex">
          <svg
            className="h-8 w-8 mx-auto self-center text-white"
            viewBox="0 0 24 24"
            fill=""
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.47297 10.6102C4.03372 8.64521 5.66829 7.15902 7.69941 6.7674L8.77297 6.56041C10.9042 6.1495 13.0958 6.1495 15.227 6.56041L16.3006 6.7674C18.3317 7.15902 19.9663 8.64522 20.527 10.6102L20.62 10.9361C21.129 12.7196 21.1255 14.6195 20.6165 16.403C20.0037 18.5506 18.2127 20.1907 15.9929 20.6187C13.3559 21.1271 10.6441 21.1271 8.00711 20.6187C5.78729 20.1907 3.99635 18.5506 3.3835 16.403C2.87452 14.6195 2.871 12.7196 3.37998 10.9361L3.47297 10.6102Z"
              fill="currentColor"
              fillOpacity="0.15"
            />
            <path
              d="M10.87 3.14669L10.6784 2.42157V2.42157L10.87 3.14669ZM13.13 3.14669L12.9384 3.87181V3.87181L13.13 3.14669ZM3.3835 16.403L4.10471 16.1972L3.3835 16.403ZM3.37998 10.9361L4.10118 11.1419L3.37998 10.9361ZM20.62 10.9361L21.3412 10.7303V10.7303L20.62 10.9361ZM20.6165 16.403L21.3377 16.6088L20.6165 16.403ZM15.9929 20.6187L15.8509 19.8822L15.9929 20.6187ZM8.00711 20.6187L8.1491 19.8822L8.00711 20.6187ZM8.77297 6.56041L8.91496 7.29685L8.77297 6.56041ZM15.227 6.56041L15.369 5.82397L15.227 6.56041ZM16.3006 6.7674L16.1586 7.50384V7.50384L16.3006 6.7674ZM20.527 10.6102L19.8058 10.816V10.816L20.527 10.6102ZM7.69941 6.7674L7.55742 6.03096L7.69941 6.7674ZM3.47297 10.6102L2.75176 10.4044H2.75176L3.47297 10.6102ZM11.0616 3.87181C11.6763 3.7094 12.3237 3.7094 12.9384 3.87181L13.3216 2.42157C12.4557 2.19281 11.5443 2.19281 10.6784 2.42157L11.0616 3.87181ZM16.927 7.06315C16.927 4.88128 15.4419 2.98176 13.3216 2.42157L12.9384 3.87181C14.4126 4.26128 15.427 5.57456 15.427 7.06315H16.927ZM8.57297 7.06315C8.57297 5.57455 9.58742 4.26128 11.0616 3.87181L10.6784 2.42157C8.55808 2.98176 7.07297 4.88127 7.07297 7.06315H8.57297ZM7.8414 7.50384L8.91496 7.29685L8.63098 5.82397L7.55742 6.03096L7.8414 7.50384ZM15.085 7.29685L16.1586 7.50384L16.4426 6.03096L15.369 5.82397L15.085 7.29685ZM19.8058 10.816L19.8988 11.1419L21.3412 10.7303L21.2482 10.4044L19.8058 10.816ZM4.10118 11.1419L4.19418 10.816L2.75176 10.4044L2.65877 10.7303L4.10118 11.1419ZM4.10471 16.1972C3.63385 14.5472 3.63087 12.79 4.10118 11.1419L2.65877 10.7303C2.11113 12.6493 2.1152 14.6917 2.66229 16.6088L4.10471 16.1972ZM19.8988 11.1419C20.3691 12.79 20.3662 14.5472 19.8953 16.1972L21.3377 16.6088C21.8848 14.6917 21.8889 12.6493 21.3412 10.7303L19.8988 11.1419ZM15.8509 19.8822C13.3077 20.3726 10.6923 20.3726 8.1491 19.8822L7.86512 21.3551C10.5959 21.8816 13.4041 21.8816 16.1349 21.3551L15.8509 19.8822ZM8.91496 7.29685C10.9524 6.90402 13.0477 6.90402 15.085 7.29685L15.369 5.82397C13.144 5.39498 10.856 5.39498 8.63098 5.82397L8.91496 7.29685ZM8.1491 19.8822C6.20493 19.5074 4.63939 18.0709 4.10471 16.1972L2.66229 16.6088C3.3533 19.0303 5.36966 20.874 7.86512 21.3551L8.1491 19.8822ZM16.1349 21.3551C18.6303 20.874 20.6467 19.0303 21.3377 16.6088L19.8953 16.1972C19.3606 18.0708 17.7951 19.5074 15.8509 19.8822L16.1349 21.3551ZM16.1586 7.50384C17.9164 7.84275 19.3239 9.12718 19.8058 10.816L21.2482 10.4044C20.6087 8.16326 18.747 6.47528 16.4426 6.03096L16.1586 7.50384ZM7.55742 6.03096C5.25297 6.47528 3.39132 8.16325 2.75176 10.4044L4.19418 10.816C4.67613 9.12717 6.08361 7.84275 7.8414 7.50384L7.55742 6.03096ZM3.38575 11.7917C8.93989 13.8462 15.0601 13.8462 20.6143 11.7917L20.0939 10.3849C14.8755 12.3151 9.12447 12.3151 3.90612 10.3849L3.38575 11.7917Z"
              fill="currentColor"
            />
            <path d="M8 10.5V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M16 10.5V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      );
    },
  },
  {
    title: "Improving your app",
    description:
      "Have an app? Your users not getting enough value? If your app is under-performing, I can be of help. ",
    icon: () => {
      return (
        <div className="bg-app-brand-yellow p-2 rounded-md w-min flex">
          <svg
            className="h-7 w-7 mx-auto self-center text-white"
            viewBox="0 -3.4 105.608 105.608"
            fill="currentColor"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Interaction" transform="translate(-566.651 -94.546)">
              <circle
                id="Ellipse_134"
                data-name="Ellipse 134"
                cx="1.703"
                cy="1.703"
                r="1.703"
                transform="translate(656.511 100.189)"
              />
              <circle
                id="Ellipse_135"
                data-name="Ellipse 135"
                cx="1.703"
                cy="1.703"
                r="1.703"
                transform="translate(579.005 100.189)"
              />
              <path
                id="Path_161"
                data-name="Path 161"
                d="M670.564,169.5H650.828l-3.407-3.407H663.75a1.7,1.7,0,0,0,0-3.406H644.014l-3.407-3.407h16.329a1.7,1.7,0,0,0,0-3.407H637.2l-15.331-15.331,31.66-31.66,9.016,9.016a1.7,1.7,0,0,0,1.2.5,1.686,1.686,0,0,0,.652-.13,1.7,1.7,0,0,0,1.051-1.574V96.25a1.7,1.7,0,0,0-1.7-1.7H643.308a1.7,1.7,0,0,0-1.2,2.907l9.016,9.016-31.66,31.66-31.66-31.66,9.016-9.016a1.7,1.7,0,0,0-1.2-2.907H575.169a1.7,1.7,0,0,0-1.7,1.7v20.441a1.7,1.7,0,0,0,1.051,1.574,1.7,1.7,0,0,0,1.856-.369l9.016-9.016,31.66,31.66-15.331,15.331H581.982a1.7,1.7,0,0,0,0,3.407h16.329l-3.407,3.407H575.168a1.7,1.7,0,0,0,0,3.406H591.5L588.09,169.5H568.354a1.7,1.7,0,0,0,0,3.407h18.738v18.738a1.7,1.7,0,0,0,3.406,0V171.907L593.9,168.5v16.329a1.7,1.7,0,0,0,3.406,0V165.093l3.407-3.407v16.329a1.7,1.7,0,0,0,3.406,0V158.279l15.331-15.331,15.331,15.331v19.736a1.7,1.7,0,0,0,3.406,0V161.686l3.407,3.407v19.736a1.7,1.7,0,0,0,3.406,0V168.5l3.407,3.407v19.736a1.7,1.7,0,1,0,3.406,0V172.9h18.738a1.7,1.7,0,0,0,.008-3.408ZM651.4,100.189a1.69,1.69,0,0,0-1.221.523l-1.006-1.006a1.588,1.588,0,0,0,.416-1.753h3.622a1.657,1.657,0,0,0-.107.532,1.7,1.7,0,0,0,3.406,0,1.68,1.68,0,0,0-.107-.532h3.622a1.657,1.657,0,0,0-.107.532,1.7,1.7,0,0,0,1.7,1.7,1.645,1.645,0,0,0,.426-.086v3.579a1.645,1.645,0,0,0-.426-.086,1.7,1.7,0,0,0,0,3.407,1.645,1.645,0,0,0,.426-.086V110.5a1.645,1.645,0,0,0-.426-.086,1.69,1.69,0,0,0-1.221.523l-1.006-1.006a1.7,1.7,0,1,0-2.4-2.4l-1.006-1.006a1.7,1.7,0,1,0-2.4-2.4l-1.006-1.006a1.7,1.7,0,0,0-1.18-2.922Zm-65.06,2.924-1.006,1.006a1.7,1.7,0,1,0-2.4,2.4l-1.006,1.006a1.7,1.7,0,1,0-2.4,2.4l-1.006,1.006a1.694,1.694,0,0,0-1.221-.523,1.645,1.645,0,0,0-.426.086v-3.579a1.645,1.645,0,0,0,.426.086,1.7,1.7,0,0,0,0-3.407,1.645,1.645,0,0,0-.426.086V100.1a1.645,1.645,0,0,0,.426.086,1.7,1.7,0,0,0,1.7-1.7,1.654,1.654,0,0,0-.108-.532h3.622a1.658,1.658,0,0,0-.108.532,1.7,1.7,0,0,0,3.406,0,1.68,1.68,0,0,0-.107-.532h3.622a1.657,1.657,0,0,0-.107.532,1.69,1.69,0,0,0,.523,1.22l-1.006,1.006a1.7,1.7,0,1,0-2.4,2.4Z"
              />
            </g>
          </svg>
        </div>
      );
    },
  },
  {
    title: "Product Management",
    description:
      "What to build, for whom and when? When building an app, these questions can be tough — so let me help you. Let's brainstorm together!",
    icon: () => {
      return (
        <div className="bg-app-brand-yellow p-2 rounded-md w-min flex">
          <svg
            className="h-8 w-8 mx-auto self-center text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="currentColor"
            stroke="currentColor"
          >
            <defs></defs>
            <g id="Layer_2" data-name="Layer 2">
              <g id="layer_1-2" data-name="layer 1">
                <path
                  class="cls-1"
                  d="M47 48H29a1 1 0 0 1-1-1v-4.81a5.84 5.84 0 0 1-3 .81 6 6 0 0 1 0-12 5.84 5.84 0 0 1 3 .81V25a1 1 0 0 1 1-1h3.81a5.87 5.87 0 0 1-.81-3 6 6 0 0 1 12 0 5.87 5.87 0 0 1-.81 3H47a1 1 0 0 1 1 1v9a1 1 0 0 1-1.8.6A4 4 0 0 0 43 33a4 4 0 1 0 3.2 6.38A1 1 0 0 1 48 40v7a1 1 0 0 1-1 1zm-17-2h16v-3.81a5.87 5.87 0 0 1-3 .81 6 6 0 0 1 0-12 5.87 5.87 0 0 1 3 .81V26h-5a1 1 0 0 1-.59-1.8 4 4 0 1 0-4.75 0A1 1 0 0 1 35 26h-5v8a1 1 0 0 1-.68.95 1 1 0 0 1-1.12-.35A3.94 3.94 0 0 0 25 33a4 4 0 0 0 0 8 4 4 0 0 0 3.2-1.62 1 1 0 0 1 1.12-.38 1 1 0 0 1 .68 1zM10 12c-2.76 0-5-2.69-5-6s2.24-6 5-6 5 2.69 5 6-2.24 6-5 6zm0-10C8.35 2 7 3.79 7 6s1.35 4 3 4 3-1.79 3-4-1.35-4-3-4zM2 46h16v2H2z"
                />
                <path class="cls-1" d="M4 16h2v31H4zM9 31h2v16H9z" />
                <path
                  class="cls-1"
                  d="M16 47h-2V16a1 1 0 0 1 .45-.83 1 1 0 0 1 .93-.09l9.24 3.84A1 1 0 0 0 26 18a.55.55 0 0 0-.32-.5L18 14a19.12 19.12 0 0 0-4.74-1.45L10 12l-5.3.59a3 3 0 0 0-2.67 3V27a1 1 0 0 0 1 1H4V16h2v13a1 1 0 0 1-1 1H3a3 3 0 0 1-3-3V15.58a5 5 0 0 1 4.45-5L9.89 10h.27l3.41.57a20.9 20.9 0 0 1 5.24 1.6l7.7 3.5A2.56 2.56 0 0 1 28 18a3 3 0 0 1-4.15 2.77L16 17.5z"
                />
                <path class="cls-1" d="M5 26h10v2H5z" />
                <path class="cls-1" d="M9 11h2v16H9z" />
              </g>
            </g>
          </svg>
        </div>
      );
    },
  },
];

export const MyServices = () => {
  return (
    <section id="my-services" className="pb-14">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 id="secondary-features-title" className="font-display text-5xl mb-0 tracking-tight text-slate-900">
            How can I help
          </h2>
          <p className="mt-3 text-xl tracking-tight text-slate-700">
            With experience working with a range of companies, I'll help your company bring your product to market
            whichever way I can.
          </p>
        </div>
        <div className="mt-8 block">
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 space-x-0 lg:space-x-4">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-50 p-1 py-2 rounded-sm">
                <service.icon />
                <p className="mt-3 mb-0 font-display font-medium text-2xl text-slate-900">{service.title}</p>
                <p className="mt-2 mb-0 text-base text-slate-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

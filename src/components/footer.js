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
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 0 16 16"
              width="48px"
              height="48px"
              baseProfile="basic"
            >
              <path fill="#194fc6" d="M8,0C3.6,0,0,3.6,0,8s3.6,8,8,8s8-3.6,8-8S12.4,0,8,0z" />
              <path
                fill="#a2e4f4"
                d="M9.984,15.206c0-0.262,0.01-1.125,0.01-2.195c0-0.746-0.256-1.234-0.543-1.482	c1.782-0.198,3.653-0.874,3.653-3.948c0-0.873-0.31-1.587-0.822-2.147c0.082-0.202,0.357-1.016-0.08-2.117	c0,0-0.67-0.215-2.198,0.82C9.364,3.961,8.68,3.872,8,3.869C7.32,3.872,6.636,3.961,5.998,4.138c-1.528-1.035-2.2-0.82-2.2-0.82	C3.362,4.419,3.637,5.233,3.719,5.435C3.208,5.994,2.896,6.708,2.896,7.582c0,3.066,1.867,3.752,3.644,3.954	c-0.229,0.2-0.435,0.552-0.508,1.069c-0.456,0.205-1.615,0.558-2.328-0.665c0,0-0.423-0.768-1.225-0.824c0,0-0.781-0.01-0.055,0.486	c0,0,0.524,0.246,0.888,1.17c0,0,0.47,1.556,2.695,1.072c0.004,0.668,0.011,1.171,0.011,1.361c0,0.209-0.144,0.449-0.531,0.386	C6.277,15.853,7.121,16,8,16c0.88,0,1.724-0.147,2.516-0.41C10.126,15.656,9.984,15.416,9.984,15.206z"
              />
            </svg>
          </a>

          <a
            href="https://www.upwork.com/freelancers/~013da23dfa6724ea97"
            target="_blank"
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Upwork</span>

            <img
              className="w-6 h-6"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAFOklEQVRoge2XW2xUVRSGv7XPtLaCeOHuBQGBUKZUjAaRcJlSIiIIohaRSKIPILcCBgzGQJwoREQSxLZgiMYXEaUSI0JQgU4loqIoyLQFQYQQAYGiUURKO3OWD4gMM3vaQeY8mMz/dtZa+1/rP2evs/YWYhAMBru6rtxGCnBd8+OCBfMPphLbHObNe7GLMW63VGKN0QPBYPCndOTNIIMMMrhyyPTqQo03qvBcuT/0UnOLp1UHxgmyOoFUGVnaO7QhXUU2BeMFqcLDXvDa4IkAhNGTdtyZ5Ql3HHwe8d6QndNqFLC2ucDiNcVOu7xTo0R0ONAXaAcYgeMq7FFXNrjasH5Fwee/2dZ7JQCUyTQjoCRc+JBK3StA18TltEcpENFHHZP1e0m4cLHvdP3Spf2/PBsb580WAhCKZtQO6m5zFa8pdqbXBFaosBZL8QlQrlVhYWOr3G1Tw4NuiXV5JwAkGnVmW4qRDv66t1CZfPmUeocRZ/vMmqGdLli8FIAIT8a/sZLqwhJVJlwBbceoRj+ctOOBq8FjAUC2EefZCw8za4Z2UuHlZMGCfiPCCmAp6EbgXJLQPtm5p58BL5v4IiZODQ8qW957654I0ecFciwxxxB5vNQfqow1zqwZ2imq0ZXAsIQVKnMm/RAo9/oLAGQ54pRO2T3gelHGW/xnomruK/NXVsY7lvk3Hz5e22bEP18jHi2zGnnQKwFu7INCkWN8q7C8fUEWrei9ZXcyooqxFdFIxExEOGtxj/JoEss7FuNwS2R9xG0ob47u9T6VR3DlkwRGTE9PBIjqEoG6ZuNgW7IJGw8Vt9pivdEA9fFmo9ZGSyxATK7N7pjICRdZ2GxRqqFU8gAYTOLZSogYhGMJxJCXGq3by2KMHKnucKKttF4OfN/UajXyVWp5wMXtm0jAEYOy3xJ//8xwUfumCJ/+4p5cVMYlcAoHKsZWRIP+igbc6ASS/8txo43fpVA7U8JFBYIMtrh2GUTWWxwtosZ9MxgK2OeEIo2tcl4Fbk6s6iJfWcHWsCjzkxXmOFkfTKsdcmtTxc/aGbjOwV2FbeiqrjM+aXzf+otSRtS1lU0zagP5lxDuCXSeXhtYC0yy5FM17tuxhtamzTIgYq1OGSyu7i2pDiydVlPoj/NJSXjIvZEs2Y6Qb1l9rOHcNR8JQEn1kEWKzrUmOY99KIcx0h7VfECSxK0uyw9dMqym1gT6GJWdTXDH4jDKIYR6BD/KTUkjhafK/KGVPoBc37mFf0WyRwL+JOE9EHqgCdfnWBzF55sTbzRIYvMlRyeE8yfNplIJG9r0GvwGhM7vq8U9t50WldHAL5eR7F8onBaRMWU9Nx21uC9HQAqQnZKdMz4oQRdiGqO0d+UBR5y7gV2Xx8dBx2j/Un/l10kCbAKOAikNsDiszYn6BpZ23/jHBcMlnb3Mv/mwXJXTT4XZwK/NkJ0ReMFFC17rVWWZkjC1JtAS1DYr3suS7G6gi4ATKRS+F6NjyvJDjyy5/dMzsY5kzcgTBwM5Lc7KEJRhonRGaYdIHeL+LLAlCh8v91f92VTW6eFAAJGEaavoY+X5Ve8CBGuKs0+5pwIqOgDwo7QRwahwBGUfquvK8qu+RexdkVRAOjCtOjBXkEXxdp+jXV7NqzqUjhzeXilt+184ma7iwfsrpeX8ItvTmcAzAbNqB3bEdtRAk/yt/hs8E9AYzeqXxPX/ECBiOf6CqmN2pDOPhz1gHWD7y/O2nEpnFk8EBDVogLsSHCJp3T7gkYCTtZ/lAa0srrQLyCCDDDLI4IrwNxR/t88MKqqoAAAAAElFTkSuQmCC"
            />
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

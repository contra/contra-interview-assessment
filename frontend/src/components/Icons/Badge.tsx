import React from 'react';

export function Badge() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 64 64"
    >
      <path
        fill="url(#verify-check_svg__a)"
        fillRule="evenodd"
        d="M33.915 1.447a2.667 2.667 0 00-3.829 0L24.488 7.22l-7.831-1.83a2.667 2.667 0 00-3.221 2.07l-1.589 7.884-7.577 2.694a2.667 2.667 0 00-1.59 3.483l2.925 7.49-4.917 6.364a2.667 2.667 0 00.545 3.79l6.51 4.72-.696 8.011a2.667 2.667 0 002.507 2.894l8.03.45 3.745 7.117a2.667 2.667 0 003.673 1.078L32 59.473l6.998 3.962a2.667 2.667 0 003.674-1.078l3.745-7.117 8.03-.45a2.667 2.667 0 002.507-2.894l-.697-8.011 6.511-4.72a2.667 2.667 0 00.545-3.79l-4.917-6.363 2.925-7.491a2.667 2.667 0 00-1.59-3.483l-7.577-2.694-1.59-7.883a2.667 2.667 0 00-3.22-2.07l-7.83 1.83-5.6-5.774zm12.833 24.107l-2.828-2.828-14.586 14.586-6.586-6.586-2.829 2.828 9.415 9.415 17.414-17.415z"
        clipRule="evenodd"
      ></path>
      <defs>
        <linearGradient
          id="verify-check_svg__a"
          x1="71.551"
          x2="-11.394"
          y1="-0.2"
          y2="1.129"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00B7E8"></stop>
          <stop offset="1" stopColor="#BEC711"></stop>
        </linearGradient>
      </defs>
    </svg>
  );
}

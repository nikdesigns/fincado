import React from 'react';

export type IconName =
  | 'emi'
  | 'sip'
  | 'fd'
  | 'rd'
  | 'homeLoan'
  | 'personalLoan'
  | 'carLoan'
  | 'educationLoan'
  | 'creditScore'
  | 'investing'
  | 'saving'
  | 'retirement'
  | 'tax'
  | 'epf'
  | 'ppf'
  | 'fire'
  | 'file'; // ✅ Added 'file' here

type IconProps = {
  name: IconName;
  className?: string;
};

export default function Icon({ name, className = '' }: IconProps) {
  const icons: Record<IconName, React.ReactNode> = {
    emi: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
        <path
          d="M16 8L8 16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM10 8.5C10 9.32843 9.32843 10 8.5 10C7.67157 10 7 9.32843 7 8.5C7 7.67157 7.67157 7 8.5 7C9.32843 7 10 7.67157 10 8.5ZM17 15.5C17 16.3284 16.3284 17 15.5 17C14.6716 17 14 16.3284 14 15.5C14 14.6716 14.6716 14 15.5 14C16.3284 14 17 14.6716 17 15.5Z"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
    ),

    sip: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
        <path
          d="M14 1H10V3H14V1ZM1 10V14H3V10H1ZM10 23H14V21H10V23ZM23 14V10H21V14H23ZM14 23C15.8573 23 17.351 23.0021 18.5223 22.8446C19.7225 22.6833 20.733 22.3381 21.5355 21.5355L20.1213 20.1213C19.7523 20.4903 19.2342 20.7309 18.2558 20.8625C17.2487 20.9979 15.9139 21 14 21V23ZM21 14C21 15.9139 20.9979 17.2487 20.8625 18.2558C20.7309 19.2342 20.4903 19.7523 20.1213 20.1213L21.5355 21.5355C22.3381 20.733 22.6833 19.7225 22.8446 18.5223C23.0021 17.351 23 15.8573 23 14H21ZM1 14C1 15.8573 0.997876 17.351 1.15536 18.5223C1.31672 19.7225 1.66191 20.733 2.46447 21.5355L3.87868 20.1213C3.50966 19.7523 3.26907 19.2342 3.13753 18.2558C3.00212 17.2487 3 15.9139 3 14H1ZM10 21C8.08611 21 6.75129 20.9979 5.74416 20.8625C4.76579 20.7309 4.2477 20.4903 3.87868 20.1213L2.46447 21.5355C3.26702 22.3381 4.27752 22.6833 5.47766 22.8446C6.64904 23.0021 8.14265 23 10 23V21ZM10 1C8.14265 1 6.64904 0.997876 5.47766 1.15536C4.27752 1.31672 3.26702 1.66191 2.46447 2.46447L3.87868 3.87868C4.2477 3.50966 4.76579 3.26907 5.74416 3.13753C6.75129 3.00212 8.08611 3 10 3V1ZM3 10C3 8.08611 3.00212 6.75129 3.13753 5.74416C3.26907 4.76579 3.50966 4.2477 3.87868 3.87868L2.46447 2.46447C1.66191 3.26702 1.31672 4.27752 1.15536 5.47767C0.997876 6.64904 1 8.14265 1 10H3ZM14 3C15.9139 3 17.2487 3.00212 18.2558 3.13753C19.2342 3.26907 19.7523 3.50966 20.1213 3.87868L21.5355 2.46447C20.733 1.66191 19.7225 1.31672 18.5223 1.15536C17.351 0.997876 15.8573 1 14 1V3ZM23 10C23 8.14265 23.0021 6.64904 22.8446 5.47766C22.6833 4.27752 22.3381 3.26702 21.5355 2.46447L20.1213 3.87868C20.4903 4.2477 20.7309 4.76579 20.8625 5.74416C20.9979 6.75129 21 8.08611 21 10H23ZM5 9H8.5V7H5V9ZM5 13H8.5V11H5V13ZM5 17H8.5V15H5V17ZM15.5 9H19V7H15.5V9ZM15.5 13H19V11H15.5V13ZM15.5 17H19V15H15.5V17ZM10.5 9H13.5V7H10.5V9ZM10.5 13H13.5V11H10.5V13ZM10.5 17H13.5V15H10.5V17Z"
          fill="currentColor"
        />
      </svg>
    ),

    fd: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),

    rd: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    ),

    homeLoan: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),

    personalLoan: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),

    carLoan: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 17a2 2 0 11-4 0 2 2 0 014 0zm12 0a2 2 0 11-4 0 2 2 0 014 0zm-9-2h.01M15 11h.01M12 11h.01M9 11h.01M20 15h2v-4.586a1 1 0 00-.293-.707l-3-3A1 1 0 0018.293 6H5.707a1 1 0 00-.707.293l-3 3A1 1 0 002 9.414V15h2m16 0h-4m-8 0H6"
        />
      </svg>
    ),

    educationLoan: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 14l9-5-9-5-9 5 9 5z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
        />
      </svg>
    ),

    creditScore: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.0"
      >
        <path
          d="M6 6H18V4H6V6ZM21 9V15H23V9H21ZM18 18H6V20H18V18ZM3 15V9H1V15H3ZM6 18C5.02892 18 4.40121 17.9979 3.9387 17.9357C3.50496 17.8774 3.36902 17.7832 3.29289 17.7071L1.87868 19.1213C2.38834 19.631 3.01669 19.8297 3.67221 19.9179C4.29896 20.0021 5.08546 20 6 20V18ZM1 15C1 15.9145 0.997876 16.701 1.08214 17.3278C1.17027 17.9833 1.36902 18.6117 1.87868 19.1213L3.29289 17.7071C3.21677 17.631 3.12262 17.495 3.06431 17.0613C3.00212 16.5988 3 15.9711 3 15H1ZM21 15C21 15.9711 20.9979 16.5988 20.9357 17.0613C20.8774 17.495 20.7832 17.631 20.7071 17.7071L22.1213 19.1213C22.631 18.6117 22.8297 17.9833 22.9179 17.3278C23.0021 16.701 23 15.9145 23 15H21ZM18 20C18.9145 20 19.701 20.0021 20.3278 19.9179C20.9833 19.8297 21.6117 19.631 22.1213 19.1213L20.7071 17.7071C20.631 17.7832 20.495 17.8774 20.0613 17.9357C19.5988 17.9979 18.9711 18 18 18V20ZM18 6C18.9711 6 19.5988 6.00212 20.0613 6.06431C20.495 6.12262 20.631 6.21677 20.7071 6.29289L22.1213 4.87868C21.6117 4.36902 20.9833 4.17027 20.3278 4.08214C19.701 3.99788 18.9145 4 18 4V6ZM23 9C23 8.08546 23.0021 7.29896 22.9179 6.67221C22.8297 6.01669 22.631 5.38834 22.1213 4.87868L20.7071 6.29289C20.7832 6.36902 20.8774 6.50496 20.9357 6.9387C20.9979 7.40121 21 8.02892 21 9H23ZM6 4C5.08546 4 4.29896 3.99788 3.67221 4.08214C3.01669 4.17027 2.38834 4.36902 1.87868 4.87868L3.29289 6.29289C3.36902 6.21677 3.50496 6.12262 3.9387 6.06431C4.40121 6.00212 5.02892 6 6 6V4ZM3 9C3 8.02892 3.00212 7.40121 3.06431 6.9387C3.12262 6.50496 3.21677 6.36902 3.29289 6.29289L1.87868 4.87868C1.36902 5.38834 1.17027 6.01669 1.08214 6.67221C0.997876 7.29896 1 8.08546 1 9H3ZM2 11H22V9H2V11ZM5 16H8V14H5V16Z"
          fill="currentColor"
        />
      </svg>
    ),

    investing: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),

    saving: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),

    retirement: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),

    tax: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z"
        />
      </svg>
    ),

    epf: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),

    ppf: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
        />
      </svg>
    ),

    fire: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
        />
      </svg>
    ),

    // ✅ Added the missing 'file' icon
    file: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  };

  return <div className={className}>{icons[name] ?? icons.emi}</div>;
}

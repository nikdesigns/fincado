import React from 'react';
import Image from 'next/image';

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
      <Image
        src="/images/icons/emi.svg"
        alt="EMI icon"
        width={500}
        height={500}
      />
    ),

    sip: (
      <Image
        src="/images/icons/sip.svg"
        alt="EMI icon"
        width={500}
        height={500}
      />
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
      <Image
        src="/images/icons/home-loan.svg"
        alt="EMI icon"
        width={500}
        height={500}
      />
    ),

    personalLoan: (
      <Image
        src="/images/icons/personal-loan.svg"
        alt="EMI icon"
        width={500}
        height={500}
      />
    ),

    carLoan: (
      <Image
        src="/images/icons/car-loan.svg"
        alt="EMI icon"
        width={500}
        height={500}
      />
    ),

    educationLoan: (
      <Image
        src="/images/icons/education-loan.svg"
        alt="EMI icon"
        width={500}
        height={500}
      />
    ),

    creditScore: (
      <Image
        src="/images/icons/credit.svg"
        alt="EMI icon"
        width={500}
        height={500}
      />
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
      <Image
        src="/images/icons/tax.svg"
        alt="EMI icon"
        width={500}
        height={500}
      />
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

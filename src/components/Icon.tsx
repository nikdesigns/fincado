type IconProps = {
  name: 'grid' | 'shield' | 'chart' | 'bank' | 'rupee'; // ✅ Add more here
  className?: string;
};

export default function Icon({ name, className = 'icon-md' }: IconProps) {
  const icons = {
    // ✅ YOUR CURRENT PLACEHOLDER ICON (GRID)
    grid: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
      />
    ),

    // ✅ SECURITY / PRIVACY ICON
    shield: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75M12 2.25 4.5 5.25v6c0 5.25 3.75 9.75 7.5 10.5 3.75-.75 7.5-5.25 7.5-10.5v-6L12 2.25Z"
      />
    ),

    // ✅ INVESTING / CHART ICON
    chart: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3v18h18M7.5 15v-6M12 15V9M16.5 15v-3"
      />
    ),

    // ✅ BANK / LOAN ICON
    bank: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 10.5h18M6 10.5v7.5M10.5 10.5v7.5M15 10.5v7.5M4.5 18h15M12 3 3 7.5h18L12 3Z"
      />
    ),

    // ✅ RUPEE / EMI ICON
    rupee: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 4.5h7.5m-7.5 3h7.5m-7.5 0c0 4.5 7.5 4.5 7.5 9m0 0H6"
      />
    ),
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      {icons[name]}
    </svg>
  );
}

type IconProps = {
  name:
    | 'emi'
    | 'sip'
    | 'fd'
    | 'homeLoan'
    | 'personalLoan'
    | 'creditScore'
    | 'investing'
    | 'saving';
  className?: string;
};

export default function Icon({ name, className = '' }: IconProps) {
  const icons = {
    emi: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 9H9.01M15 15H15.01M16 8L8 16M9.5 9C9.5 9.27614 9.27614 9.5 9 9.5C8.72386 9.5 8.5 9.27614 8.5 9C8.5 8.72386 8.72386 8.5 9 8.5C9.27614 8.5 9.5 8.72386 9.5 9ZM15.5 15C15.5 15.2761 15.2761 15.5 15 15.5C14.7239 15.5 14.5 15.2761 14.5 15C14.5 14.7239 14.7239 14.5 15 14.5C15.2761 14.5 15.5 14.7239 15.5 15ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
        />
      </svg>
    ),

    sip: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.99993 13C4.99993 14.6484 5.66466 16.1415 6.74067 17.226M15 6.5C15 8.433 13.433 10 11.5 10C9.567 10 8 8.433 8 6.5"
        />
      </svg>
    ),

    fd: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 9V17M9.5 9V17M14.5 9V17M19 9V17M3 18.6V19.4C3 19.96 3 20.24 3.10899 20.454C3.20487 20.6422 3.35785 20.79515 3.54601 20.89103C3.75992 21 4.03995 21 4.6 21H19.4C19.9601 21 20.2401 21 20.454 20.89103"
        />
      </svg>
    ),

    homeLoan: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.12602 14C8.57006 15.7252 10.1362 17 12 17M11.0177 2.764L4.23539 8.03912"
        />
      </svg>
    ),

    personalLoan: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14M22 12C22 17.5228 17.5228 22 12 22"
        />
      </svg>
    ),

    creditScore: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 12C5 8.13401 8.13401 5 12 5M16.4999 7.5L11.9999 12M22 12C22 17.5228 17.5228 22 12 22Z"
        />
      </svg>
    ),

    investing: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5295 8.35186C12.9571 8.75995 12.2566 9 11.5 9M6 20.0872H8.61029"
        />
      </svg>
    ),

    saving: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.99993 13C4.99993 9.68629 7.68622 7 10.9999 7M4.99993 13H4C2.89543 13 2 12.1046 2 11"
        />
      </svg>
    ),
  };

  return <div className={className}>{icons[name]}</div>;
}

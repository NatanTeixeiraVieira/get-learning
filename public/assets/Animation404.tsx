'use client';

import Image from 'next/image';

import { useToggleTheme } from 'hooks/useToggleTheme';

import planetAnimationDark from './planetAnimation-dark.gif';
import planetAnimationLight from './planetAnimation-light.gif';

export default function Animation404() {
  const theme = useToggleTheme();
  return (
    <>
      <svg
        width="61"
        height="79"
        viewBox="0 0 61 79"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.921875 63.0887L10.6441 4.4507H25.5885L15.7552 63.0887H0.921875ZM0.921875 63.0887L9.6441 49.681H39.8108V63.0887H0.921875ZM52.1997 63.0887V49.681H60.9219V63.0887H52.1997ZM38.6997 79V0H53.3108V79H38.6997Z"
          fill="#525252"
        />
      </svg>

      <Image
        src={
          theme.title === 'dark' ? planetAnimationDark : planetAnimationLight
        }
        width={150}
        height={150}
        alt=""
      />

      <svg
        width="61"
        height="79"
        viewBox="0 0 61 79"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.921875 63.0887L10.6441 4.4507H25.5885L15.7552 63.0887H0.921875ZM0.921875 63.0887L9.6441 49.681H39.8108V63.0887H0.921875ZM52.1997 63.0887V49.681H60.9219V63.0887H52.1997ZM38.6997 79V0H53.3108V79H38.6997Z"
          fill="#525252"
        />
      </svg>
    </>
  );
}

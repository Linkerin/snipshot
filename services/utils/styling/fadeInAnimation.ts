import { SystemStyleObject } from '@chakra-ui/react';

/**
 * Returns a `sx` object of `FadeIn` animation
 * @param duration number of seconds for
 * [`animation-duration`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration) property. @default 0.4
 * @returns `SystemStyleObject`
 */
const fadeInAnimation = (duration: number = 0.4) => {
  const styles: SystemStyleObject = {
    animation: `${duration}s fadein 1 linear`,
    '@keyframes fadein': {
      from: { opacity: 0 },
      to: { opacity: 1 }
    }
  };
  return styles;
};

export default fadeInAnimation;

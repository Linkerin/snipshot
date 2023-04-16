/**
 * CSS properties that hide scroll bar for different browsers.
 */
const hideScrollbarCss = {
  scrollbarWidth: 'none', // Firefox
  '&::-webkit-scrollbar': {
    display: 'none' // Chrome
  }
};

export default hideScrollbarCss;

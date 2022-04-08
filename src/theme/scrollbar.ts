function darkScrollbar() {
  return {
    scrollbarColor: '#2b2b2b #6b6b6b',
    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
      borderRadius: 8,
      backgroundColor: '#2b2b2b',
      minHeight: 24,
    },
    '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
      backgroundColor: '#6b6b6b',
    },
    '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
      backgroundColor: '#6b6b6b',
    },
    '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#6b6b6b',
    },
  };
}

export { darkScrollbar };

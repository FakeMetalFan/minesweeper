import {
  createGlobalStyle,
} from 'styled-components';

export const BACKGROUND_COLOR = '#292524';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  a,
  button {
    color: inherit;
  }

  body {
    background-color: ${BACKGROUND_COLOR};
    color: #fff;
    font-family: Comic Sans MS, cursive, sans-serif;
    user-select: none;
  }

  button {
    border: 0;
    outline: 0;
  }

  #root {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
`;

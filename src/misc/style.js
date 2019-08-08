import { css } from '@emotion/core';

export const colors = {
  white: '#fff',
  black: '#000',
  green: '#60a65f',
  red: '#ff3d3d',
};

export const globalStyle = css`
  * {
    user-select: none;
  }

  body {
    background: ${colors.white};
    color: ${colors.black};
    overflow: hidden;
    touch-action: manipulation;
  }

  img {
    display: block;
  }
`;

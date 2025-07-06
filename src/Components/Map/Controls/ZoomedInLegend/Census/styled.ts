import styled, { css } from "styled-components";
export { Label } from '../styled';
import ReactToggle from "react-toggle";
import "react-toggle/style.css";
import * as Constants from "../../../../../constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ToggleContainer = styled.div`
  display: flex;
  gap: 0.5em;
  align-items: center;
  justify-content: center;
  margin: 0.25em 0;
  font-size: 0.9rem;
`;

export const Toggle = styled(ReactToggle)`
  /* Base numbers from react-toggle’s default CSS */
  --track-w: 40px;
  --track-h: 20px;
  --thumb:   18px;

  /* Scale factor */
  --s: 0.8;

  /* Derived sizes */
  --track-w-s: calc(var(--track-w) * var(--s));
  --track-h-s: calc(var(--track-h) * var(--s));
  --thumb-s:   calc(var(--thumb)   * var(--s));
  --pad:       calc((var(--track-h-s) - var(--thumb-s)) / 2);

  /* Track ─────────────────────────────────────── */
  .react-toggle-track {
    width:  var(--track-w-s);
    height: var(--track-h-s);
    border-radius: var(--track-h-s);   /* keep pill shape */
    background: grey;
    transition: background 0.15s;
  }

  /* Thumb ─────────────────────────────────────── */
  .react-toggle-thumb {
    width: var(--thumb-s);
    height: var(--thumb-s);
    top:   var(--pad);
    left:  var(--pad);
    border-radius: 50%;
    transition: left 0.25s;
  }

  /* Position thumb when checked */
  &.react-toggle--checked .react-toggle-thumb {
    left: calc(var(--track-w-s) - var(--thumb-s) - var(--pad));
  }

  /* Colour states */
  &.react-toggle--checked .react-toggle-track,
  &:hover               .react-toggle-track {
    background: 'grey';
  }
`;



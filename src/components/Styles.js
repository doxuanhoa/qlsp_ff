import styled, { css } from "styled-components";

const btn = (light, dark) => css`
  white-space: nowrap;
  display: inline-block;
  border-radius: 5px;
  padding: 5px 15px;
  font-size: 16px;
  color: white;
  &:visited {
    color: white;
  }
  background-image: linear-gradient(${light}, ${dark});
  border: 1px solid ${dark};
  &:hover {
    background-image: linear-gradient(red, ${light});
    &[disabled] {
      background-image: linear-gradient(${light}, ${dark});
    }
  }
  &:visited {
    color: black;
  }
  &[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const btnDefault = css`
  ${btn("#ffffff", "#d5d5d5")} color: #555;
`;

const btnPrimary = btn("#4f93ce", "#285f8f");

export default styled.div`
  body {
    background-image: linear-gradient(-90deg, rgb(129, 129, 0), #fcd435);
    font-family: Arial, Helvetica, sans-serif;
  }
  h1 {
    color: blue;
  }
  /* The Modal (background) */
  .modal {
    /*display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 3; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  }

  /* Modal Content */
  .modal-content {
    background-image: linear-gradient(-90deg, rgb(129, 129, 0), red);
    position: relative;
    background-color: #fefefe;
    margin: auto;
    padding: 0;
    border: 1px solid #888;
    width: 45%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.4s;
    animation-name: animatetop;
    animation-duration: 0.4s;
  }

  /* Add Animation */
  @-webkit-keyframes animatetop {
    from {
      top: -300px;
      opacity: 0;
    }
    to {
      top: 0;
      opacity: 1;
    }
  }
  /* test */

  @keyframes animatetop {
    from {
      top: -300px;
      opacity: 0;
    }
    to {
      top: 0;
      opacity: 1;
    }
  }

  /* The Close Button */
  .close {
    color: white;
    float: right;
    font-size: 40px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: red;
    text-decoration: none;
  }

  .modal-header {
    padding: 5px;
    color: white;
  }

  .modal-body {
    padding: 5px;
  }

  .modal-footer {
    padding: 1px;
    color: white;
  }

  font-family: sans-serif;

  h1 {
    text-align: center;
    color: #222;
  }

  h4 {
    text-align: center;
    color: #fff;
  }

  & > div {
    text-align: center;
  }

  a {
    display: block;
    text-align: center;
    color: #222;
  }

  form {
    max-width: 600px;
    margin: 10px auto;

    padding: 20px;
    & > div {
      display: flex;
      flex-flow: row nowrap;
      line-height: 2em;
      margin: 5px;
      & > label {
        color: #fff;
        width: 110px;
        font-size: 1em;
        line-height: 32px;
      }
      & > input,
      & > select,
      & > textarea {
        flex: 1;
        padding: 3px 5px;
        font-size: 1em;
        margin-left: 15px;
        border: 1px solid #ccc;
        border-radius: 3px;
      }
      & > input[type="checkbox"] {
        margin-top: 7px;
      }
      & > div {
        margin-left: 16px;
        & > label {
          display: block;
          & > input {
            margin-right: 3px;
          }
        }
      }
      & > span {
        line-height: 32px;
        margin-left: 10px;
        color: #800;
        font-weight: bold;
      }
    }
    & > .buttons {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      margin-top: 15px;
    }
    button {
      margin: 0 10px;
      &[type="submit"] {
        ${btnPrimary};
      }
      &[type="button"] {
        ${btnDefault};
      }
    }
  }
`;

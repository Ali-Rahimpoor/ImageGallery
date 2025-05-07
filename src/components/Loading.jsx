import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loader {
    width: 10px;
    height: 40px;
    border-radius: 4px;
    display: block;
    background-color: currentColor;
    margin: 70px auto;
    position: relative;
    color: #f2f2f2;
    animation: animloader 0.3s 0.3s linear infinite alternate;
  }

  .loader::after,
  .loader::before {
    content: '';
    width: 10px;
    height: 40px;
    border-radius: 4px;
    background: currentColor;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 20px;
    animation: animloader 0.3s 0.45s linear infinite alternate;
  }

  .loader::before {
    left: -20px;
    animation-delay: 0s;
  }

  @keyframes animloader {
    0% {
      height: 48px;
    }

    100% {
      height: 4px;
    }
  }`;

export default Loader;

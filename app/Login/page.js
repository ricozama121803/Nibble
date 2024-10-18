'use client';
import React, { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import styled, { keyframes } from "styled-components";
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      router.push("/");
    }
  }, [session]);

  return (
    <StyledWrapper>
      <StyledCard>
        <div className="nebula" />
        <div className="starfield" />
        <div className="cosmic-dust" />

        <StyledWelcomeText>Welcome to Nibble</StyledWelcomeText>

        <StyledButton onClick={() => signIn("google")}>
          <GoogleIcon style={{ marginRight: '8px' }}/>
            Sign Up with Google
        </StyledButton>
      </StyledCard>
    </StyledWrapper>
  );
};

// Animation for the glowing border effect
const glowingBorder = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const twinkle = keyframes`
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000;

  .nebula,
  .starfield,
  .cosmic-dust {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background: radial-gradient(circle, rgba(77, 109, 255, 0.6), rgba(0, 0, 0, 0));
    filter: blur(30px);
    opacity: 0.3;
  }

  .starfield {
    background: radial-gradient(circle, rgba(28, 36, 82, 0.6), rgba(0, 0, 0, 0));
    filter: blur(20px);
    opacity: 0.4;
  }

  .cosmic-dust {
    background: radial-gradient(circle, rgba(110, 140, 255, 0.8), rgba(0, 0, 0, 0));
    filter: blur(50px);
    opacity: 0.4;
  }

  .galaxy {
    background-image: radial-gradient(#ffffff 1px, transparent 1px),
      radial-gradient(#ffffff 1px, transparent 1px);
    background-size: 50px 50px;
    background-position: 0 0, 25px 25px;
    animation: ${twinkle} 5s infinite;
  }
`;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  width: 300px; /* Portrait-like width */
  height: 500px; /* Portrait-like height */
  border-radius: 16px;
  background-color: rgba(0, 0, 0, 0.7);
  position: relative;
  z-index: 1;
  box-shadow: 0 8px 15px rgba(255, 255, 255, 0.1);
  border: 2px solid transparent;
  background-image: linear-gradient(black, black), linear-gradient(90deg, #4d6dff, #89faff, #6e8cff, #89faff, #4d6dff);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  animation: ${glowingBorder} 3s linear infinite;
  background-size: 300% 300%; /* To control the speed of the light rays */
`;

const StyledWelcomeText = styled.h1`
  color: #ffffff;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background-color: #ff6b6b;
  color: white;
  border-radius: 8px;
  box-shadow: 0 8px 15px rgba(255, 107, 107, 0.3);
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: #ff4757;
    box-shadow: 0 15px 25px rgba(255, 107, 107, 0.5);
    animation: ${pulse} 1s infinite;
  }

  .icon {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
`;

export default Login;

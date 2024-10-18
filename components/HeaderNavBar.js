"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

function HeaderNavBar() {
  const { data: session } = useSession();
  const [profileClick, setProfileClick] = useState(false);

  useEffect(() => {
    if (profileClick) {
      const timer = setTimeout(() => {
        setProfileClick(false);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [profileClick]);

  return (
    session?.user && (
      <NavBar>
        <NavItems>
          <Image src="/logo.png" alt="logo" width={50} height={50} />
          <NavLink>Home</NavLink>
          <NavLink>Favourite</NavLink>
        </NavItems>
        <SearchBar>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input type="text" placeholder="Search" className="search-input" />
        </SearchBar>
        <div>
          {session?.user && (
            <>
              <ProfileImage
                src={session.user.image}
                alt="user"
                width={40}
                height={40}
                onClick={() => setProfileClick(!profileClick)}
              />
              {profileClick && (
                <ProfileMenu>
                  <LogoutButton onClick={() => signOut()}>Logout</LogoutButton>
                </ProfileMenu>
              )}
            </>
          )}
        </div>
      </NavBar>
    )
  );
}

export default HeaderNavBar;

// Animation for the glowing bottom border effect
const glowingBottomBorder = keyframes`
  0% {
    background-position: 0% 100%;
  }
  50% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 100%;
  }
`;

// Styled Components

const NavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #000;
  position: relative;
  border-bottom: 2px solid transparent;
  background-image: linear-gradient(90deg, #4d6dff, #89faff, #6e8cff, #89faff, #4d6dff);
  background-repeat: no-repeat;
  background-position: 0% 100%; /* Only show at the bottom */
  background-size: 100% 2px; /* Height of the bottom border */
  animation: ${glowingBottomBorder} 3s linear infinite;
`;

const NavItems = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const NavLink = styled.h2`
  cursor: pointer;
  color: #fff;
  transition: color 0.3s ease;

  &:hover {
    color: #4d6dff;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #1f1f1f;
  padding: 8px 16px;
  border-radius: 8px;
  width: 40%;
  gap: 10px;

  svg {
    stroke: #fff;
  }

  .search-input {
    background-color: transparent;
    border: none;
    outline: none;
    color: #fff;
    width: 100%;
  }

  .search-input::placeholder {
    color: #888;
  }
`;

const ProfileImage = styled(Image)`
  cursor: pointer;
  border-radius: 50%;
  transition: border 0.3s ease;

  &:hover {
    border: 2px solid #4d6dff;
  }
`;

const ProfileMenu = styled.div`
  position: absolute;
  right: 16px;
  top: 60px;
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
`;

const LogoutButton = styled.h2`
  cursor: pointer;
  color: #000;
  transition: color 0.3s ease, font-weight 0.3s ease;

  &:hover {
    color: #4d6dff;
    font-weight: bold;
  }
`;

import { UserLocationContext } from '@/context/UserLocationContext';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

function BusinessItem({ business, showDir = false }) {
  const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
  const photo_ref = business?.photos ? business?.photos[0]?.photo_reference : '';
  const { userLocation } = useContext(UserLocationContext);
  const [distance, setDistance] = useState();

  useEffect(() => {
    calculateDistance(
      business.geometry.location.lat,
      business.geometry.location.lng,
      userLocation.lat,
      userLocation.lng
    );
  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const earthRadius = 6371; // in kilometers
    const degToRad = (deg) => deg * (Math.PI / 180);

    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    setDistance(distance.toFixed(1));
    return distance.toFixed(2);
  };

  const onDirectionClick = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${business.geometry.location.lat},${business.geometry.location.lng}&travelmode=driving`
    );
  };

  return (
    <StyledCard>
      <div className="nebula" />
      <div className="starfield" />
      <div className="cosmic-dust" />

      <Image
        src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo_ref}&key=${GOOGLE_API_KEY}`}
        alt={business.name}
        width={180}
        height={80}
        className="rounded-lg object-cover h-[90px]"
      />
      <h2>{business.name}</h2>
      <p>{business.formatted_address}</p>
      <div className="flex gap-1 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-yellow-500">
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
            clipRule="evenodd"
          />
        </svg>
        <h2>{business.rating}</h2>
      </div>
      {showDir && (
        <div className="border-t-[1px] p-1 mt-1">
          <h2 className="text-[#0075ff] flex justify-between items-center">
            Dist: {distance} Mile
            <span className="border-[1px] p-1 rounded-full border-blue-500 hover:text-white hover:bg-blue-500" onClick={onDirectionClick}>
              Get Direction
            </span>
          </h2>
        </div>
      )}
    </StyledCard>
  );
}

export default BusinessItem;

// Styled Components

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

const StyledCard = styled.div`
  width: 195px;  /* Original width */
  height: auto;  /* Let height adjust automatically */
  padding: 1rem;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.7);
  position: relative;
  z-index: 1;
  box-shadow: 0 8px 15px rgba(255, 255, 255, 0.1);
  border: 2px solid transparent;
  background-image: linear-gradient(black, black), linear-gradient(90deg, #4d6dff, #89faff, #6e8cff, #89faff, #4d6dff);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  animation: ${glowingBorder} 3s linear infinite;
  background-size: 300% 300%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 15px 25px rgba(255, 107, 107, 0.5);
  }

  h2 {
    color: #ffffff;
    font-size: 13px;
    font-weight: bold;
    margin-top: 0.5rem;
    line-clamp: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  p {
    color: #ffffff;
    font-size: 12px;
    margin-top: 0.5rem;
    line-clamp: 2;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

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
`;

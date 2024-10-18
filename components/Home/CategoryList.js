import React, { useState } from 'react';
import Data from './../../Shared/Data';
import Image from 'next/image';
import styled, { keyframes, css } from 'styled-components';

function CategoryList({ onCategoryChange }) {
  const [categoryList, setCategoryList] = useState(Data.CategoryListData);
  const [selectedCategory, setSelectedCategory] = useState();

  return (
    <div>
      <h2 className='font-bold px-2'>Select Food Type</h2>
      <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
        {categoryList.map((item, index) => (
          <StyledCategoryCard
            key={index}
            isSelected={selectedCategory === index}
            onClick={() => {
              setSelectedCategory(index);
              onCategoryChange(item.value);
            }}
          >
            <Image src={item.icon} alt={item.name} width={40} height={40} />
            <p>{item.name}</p>
          </StyledCategoryCard>
        ))}
      </div>
    </div>
  );
}

export default CategoryList;

// Styled Components

const glowingBorder = keyframes`
  0% {
    background-position: 0% 50%;
    box-shadow: 0 0 10px rgba(77, 109, 255, 0.5), 0 0 20px rgba(77, 109, 255, 0.3);
  }
  50% {
    background-position: 100% 50%;
    box-shadow: 0 0 20px rgba(77, 109, 255, 0.7), 0 0 30px rgba(77, 109, 255, 0.5);
  }
  100% {
    background-position: 0% 50%;
    box-shadow: 0 0 10px rgba(77, 109, 255, 0.5), 0 0 20px rgba(77, 109, 255, 0.3);
  }
`;

const StyledCategoryCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #000; /* Set background to black */
  padding: 1rem;
  margin: 1rem;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid transparent;
  background-image: linear-gradient(black, black), linear-gradient(90deg, #4d6dff, #89faff, #6e8cff, #89faff, #4d6dff);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  background-size: 300% 300%;
  ${({ isSelected }) =>
    isSelected &&
    css`
      animation: ${glowingBorder} 3s linear infinite;
    `};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(77, 109, 255, 0.5); /* Radiating glow effect */
    filter: grayscale(0);
  }

  p {
    color: #fff; /* Change text color to white */
    margin-top: 10px;
    font-size: 13px;
  }

  img {
    filter: ${({ isSelected }) => (isSelected ? 'grayscale(0)' : 'grayscale(100%)')};
    transition: filter 0.3s ease;
  }
`;

import React from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from './Button';

const HeroSection = ({myData}) => {
  const {name, img} = myData;
  return (
    <Wrapper>
        <div className='container'>
            <div className='grid grid-two-column'>
                <div className='hero-section-data'>
                    <p className='intro-data'>Welcome To</p>
                    <h1>{name}</h1>
                    <p>This is a Online Ecommerce Store introduce to fullfill your need.All type of Electronics like Mobile, Tv, Refrigarator, Water Purifier etc, Kithen Applicance, Home Applicance, Toy, Clothes available on this online store. We also provide fast delivery and Online payment as well as Cash on Delivery.</p>
                    <NavLink to='/products'>
                      <Button>Shop Now</Button>
                    </NavLink>
                </div>

                {/* Our homepage Image */}
                <div className='hero-section-image'>
                    <figure>
                        <img src={img} alt='heroimg' className='img-style' />
                    </figure>
                </div>
            </div>
        </div>
    </Wrapper>
  )
};

const Wrapper = styled.section`
padding: 12rem 0;
  img {
    min-width: 10rem;
    height: 10rem;
  }
  .hero-section-data {
    p {
      margin: 2rem 0;
    }
    h1 {
      text-transform: capitalize;
      font-weight: bold;
    }
    .intro-data {
      margin-bottom: 0;
    }
  }
  .hero-section-image {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  figure {
    position: relative;
    &::after {
      content: "";
      width: 60%;
      height: 80%;
      background-color: rgba(81, 56, 238, 0.4);
      position: absolute;
      left: 50%;
      top: -5rem;
      z-index: -1;
    }
  }
  .img-style {
    width: 100%;
    height: auto;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid {
      gap: 10rem;
    }
    figure::after {
      content: "";
      width: 50%;
      height: 100%;
      left: 0;
      top: 10%;
      /* bottom: 10%; */
      background-color: rgba(81, 56, 238, 0.4);
    }
  }
`

export default HeroSection
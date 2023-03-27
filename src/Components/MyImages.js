import { useState } from "react";
import styled from "styled-components";

const MyImages = ({imgs = [{url : ""}]}) => {
  const [mainImage, setMainImage] = useState(imgs[0]);
  return (
    <Wrapper>

      <div className="main-screen">
        <img src={mainImage.url} alt={mainImage.filename} />
      </div>


      <div className="grid">
        {
          imgs.map((curElm, index) => {
            return (
              <figure key={index}>
                <img 
                  src={curElm.url} 
                  alt={curElm.filename} 
                  className="box-image--style" 
                  value={index} 
                  onClick={() => setMainImage(curElm)} />
              </figure>
            )
          })
        }
      </div>

      {/* 2nd column */}
      {/* <div className="main-screen">
        <img src={mainImage.url} alt={mainImage.filename} />
      </div> */}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  ${'' /* display: grid;
  grid-template-columns: 0.4fr 1fr;
  gap: 1rem; */}
  .grid {
    display: flex;
    flex-direction: row;
    justify-items: center;
    align-items: center;
    width: 100%;
    gap: 1rem;
    /* order: 2; */
    img {
      max-width: 100%;
      max-height: 100%;
      background-size: cover;
      object-fit: contain;
      cursor: pointer;
      box-shadow: ${({ theme }) => theme.colors.shadow};
    }
  }
  .main-screen {
    display: flex;
    place-items: center;
    justify-content: center;
    margin-bottom: 2rem;
    img {
      max-width: 70%;
      height: auto;
      box-shadow: ${({ theme }) => theme.colors.shadow};
    }
  }
  ${'' /* .grid-four-column {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
  } */}
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    display: flex;
    flex-direction: column;
    .grid-four-column {
      grid-template-rows: 1fr;
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;

export default MyImages
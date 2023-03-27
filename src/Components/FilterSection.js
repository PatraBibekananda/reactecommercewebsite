import styled from 'styled-components'
import { useFilterContext } from '../context/Filter_Context'
import { FaCheck } from "react-icons/fa";
import FormatPrice from '../Helper/FormatPrice';
import { Button } from './Button';

const FilterSection = () => {
  const { all_products, filters: {text, category, colors, price, minPrice, maxPrice}, updateFilterValue, clearFilters } = useFilterContext();

  //category common function
  const getUniqueData = (data, property) => {
    let newVal = data.map((curElem) => {
      return curElem[property];
    })
    if(property === "colors"){
       //return newVal = ["All",...new Set([].concat(...newVal))]; oldmethod
       newVal = newVal.flat();
    }
      return (newVal = ["All", ...new Set(newVal)]);
  }

  //categorywise filter section
  const categoryOnlyData = getUniqueData(all_products, "category")

  //companywise filter section
  const companyOnlyData = getUniqueData(all_products, "company")

  //colorwise filter section
  const colorsData = getUniqueData(all_products, "colors")

  return (
    <Wrapper>
      {/* search input */}
      <div className='filter-search'>
        <form onSubmit={(e) => e.preventDefault()}>
          <input type='text' name='text' value={text} onChange={updateFilterValue} placeholder="Search" />
        </form>
      </div>

      {/* categorywise filter */}
      <div className='filter-category'>
        <h3>Category</h3>
        <div>
        {
          categoryOnlyData.map((curElem, index) => {
                return <button key={index} type='button' 
                name='category' 
                onClick={updateFilterValue} 
                value={curElem} 
                className={curElem === category ? "active" : ""}
                >
                {curElem}
                </button>
              })
        }         
        </div>
      </div>

      {/* companywise filter */}
      <div className='filter-company'>
        <h3>Company</h3>
        <form action='#'>
        <select id='company' name='company' className='filter-company--select' onClick={updateFilterValue} >
          {
            companyOnlyData.map((curElem, index) => {
              return <option value={curElem} name="company" key={index}>{curElem}</option>
                       
            })
          }
          </select>
        </form>
      </div>

      {/* colorwise filter */}
      <div className='filter-colors colors'>
        <h3>Color</h3>
        <div className='filter-color-style'>
        {
          colorsData.map((curColor,index) => {
            if(curColor === "All"){
              return <button 
            key={index}
            type='button'
            value={curColor}
            name="colors"
            className="color-all--style"
            onClick={updateFilterValue}>
            All
            </button>
            }
            return <button 
            key={index}
            type='button'
            value={curColor}
            name="colors"
            style={{backgroundColor:curColor}} 
            className={colors === curColor ? "btnStyle active" : "btnStyle"}
            onClick={updateFilterValue}>
            {curColor === colors ? <FaCheck className='checkStyle' /> : null}
            </button>
          })
        }
        </div>
      </div>
       
       {/* Pricewise filter */}
      <div className='filter_price'>
        <h3>Price</h3>
        <p><FormatPrice price={price} /></p>
        <input type='range' name='price' min={minPrice} max={maxPrice} value={price} onChange={updateFilterValue} />
      </div>

      <Button className='btn' onClick={clearFilters}>Clear Filters</Button>

    </Wrapper>
  )
}

const Wrapper = styled.section`
padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  h3 {
    padding: 2rem 0;
    font-size: bold;
  }
  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }
  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;
      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};
        text-transform: capitalize;
        cursor: pointer;
        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }
      .active{
        border-bottom: 1px solid black;
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  }
  .filter-company--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }
  .filter-color-style {
    display: flex;
    justify-content: center;
  }
  .color-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
  .active {
    opacity: 1;
  }
  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }
  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }
  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .filter-clear .btn {
    background-color: #ec7063;
    color: #000;
  }
`

export default FilterSection
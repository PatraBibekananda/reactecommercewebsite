import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./ProductContext";
import reducer from "../reducer/FilterReducer";

const FilterContext = createContext();

const initialState = {
    filter_products: [],
    all_products: [],
    grid_view: true,
    sorting_value: "lowest",
    filters:{
        text: "",
        category: 'All',
        company: "All",
        colors: "All",
        minPrice: 0,
        maxPrice: 0,
        price: 0,
    }
}

const FilterContextProvider = ({ children }) => {

    const { products } = useProductContext();

    const [state, dispatch] = useReducer(reducer, initialState);

    //to set the grid view
    const setGridView = () => {
        return dispatch({ type:"SET_GRIDVIEW"});
    }

     //to set the list view
     const setListView = () => {
        return dispatch({ type:"SET_LISTVIEW"});
    }

    //sorting function
    //old method
    // const sorting = () => {
    //      dispatch({ type: "GET_SORT_VALUE"});
    // }

    //sorting function
    //new method
    const sorting = (event) => {
        let userValue = event.target.value
        dispatch({ type: "GET_SORT_VALUE", payload: userValue});
   }

    //update the filter Value
    const updateFilterValue = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        return dispatch({type: "UPDATE_FILTERS_VALUE", payload:{ name, value} })
    }

    //clear all filters
    const clearFilters = () => {
        return dispatch({type: "CLEAR_FILTERS" })
    }

    //to sort the products
    useEffect(() => {
        //dispatch({type:"SORTING_PRODUCTS", payload: products });
        dispatch({type:"FILTER_PRODUCTS"});
        dispatch({type:"SORTING_PRODUCTS" });   
    }, [products, state.sorting_value, state.filters]);

    useEffect(() => {
        dispatch({ type:"LOAD_FILTER_PRODUCTS", payload: products});
    },[products]);

    return <FilterContext.Provider 
    value={{...state, setGridView, setListView, sorting, updateFilterValue, clearFilters }}> 
    {children } 
    </FilterContext.Provider>
}

//custom hook
const useFilterContext = () => {
    return useContext(FilterContext);
}

export {FilterContext, FilterContextProvider, useFilterContext};
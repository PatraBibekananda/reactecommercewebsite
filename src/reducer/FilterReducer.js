const FilterReducer = (state, action) => {
    
    switch(action.type) {
        
        case "LOAD_FILTER_PRODUCTS":
            let priceArr = action.payload.map((curElem) => curElem.price);

            //To get the maximum price between all products
            //1st method
            //let maxPrice = Math.max.apply(null,priceArr);

            //2nd method
            //let maxPrice = priceArr.reduce((initialVal, curVal) => Math.max(initialVal, curVal),0);

            //3rd method
            let maxPrice = Math.max(...priceArr);
            return {
                ...state,
                filter_products: [...action.payload],
                all_products: [...action.payload],
                filters : {
                    ...state.filters,
                    maxPrice: maxPrice,
                    price: maxPrice
                }
            };

        case "SET_GRIDVIEW":
            return {
                ...state,
                grid_view: true,
            }

        case "SET_LISTVIEW":
            return {
                ...state,
                grid_view: false,
            }
    
        case "GET_SORT_VALUE":
            //old method
            // let userSortValue = document.getElementById("sort");
            // let sort_value = userSortValue.options[userSortValue.selectedIndex].value;
            // return {
            //     ...state,
            //     sorting_value: sort_value,
            // }

            //new method

            return {
                ...state,
                sorting_value: action.payload,
            }

            

        case "SORTING_PRODUCTS":
            let newSortData;
            //1st method old method
            // let tempSortProduct = [...action.payload];

            // if(state.sorting_value === "lowest"){
            //     newSortData = tempSortProduct.sort((a,b) => {
            //         return a.price - b.price
            //     })
            // }

            // if(state.sorting_value === "highest"){
            //     newSortData = tempSortProduct.sort((a,b) => {
            //         return b.price - a.price
            //     })
            // }

            // if(state.sorting_value === "a-z"){
            //     newSortData = tempSortProduct.sort((a,b) => {
            //        return a.name.localeCompare(b.name);
            //     });
            // }

            // if(state.sorting_value === "z-a"){
            //     newSortData = tempSortProduct.sort((a,b) => {
            //         return b.name.localeCompare(a.name)
            //     });
            // }

            //2nd method new method
            const { filter_products, sorting_value } = state;
            let tempSortProduct = [...filter_products];

            // const sortingProducts = (a,b) => {
            //     if(sorting_value === "lowest"){
            //             return a.price - b.price
            //     }

            //     if(sorting_value === "highest"){
            //             return b.price - a.price
            //     }

            //     if(sorting_value === "a-z"){
            //            return a.name.localeCompare(b.name);
            //     }

            //     if(sorting_value === "z-a"){
            //             return b.name.localeCompare(a.name)
            //     }
            // }

            const sortingProducts = (a,b) => {
                switch (sorting_value){
                    case "lowest":
                        return a.price - b.price
                    
                    case "highest":
                        return b.price - a.price
                    
                    case "a-z":
                        return a.name.localeCompare(b.name)

                    case "z-a":
                        return b.name.localeCompare(a.name)

                    default:
                        return null
                }
            }

            newSortData = tempSortProduct.sort(sortingProducts);

            return {
                ...state,
                filter_products: newSortData,
            }

            case "UPDATE_FILTERS_VALUE":
                const { name, value } = action.payload;
                return {
                    ...state,
                    filters: {
                        ...state.filters, [name]: value,
                    }
                }

            case "FILTER_PRODUCTS":
                let { all_products } = state;
                let tempFilterProduct = [ ...all_products ];

                const { text, category, company, colors, price } = state.filters;

                if(text) {
                    tempFilterProduct = tempFilterProduct.filter((curElm) => {
                        return curElm.name.toLowerCase().includes(text);
                    })
                } 

                if(company !== "All") {
                    tempFilterProduct = tempFilterProduct.filter((curElm) => {
                        return curElm.company === company;
                    })
                } 

                if(category !== "All") {
                    tempFilterProduct = tempFilterProduct.filter((curElm) => {
                        return curElm.category === category;
                    })
                } 

                if(colors !== "All") {
                    tempFilterProduct = tempFilterProduct.filter((curElm) => {
                        return curElm.colors.includes(colors);
                    })
                } 

                if(price === 0){
                    tempFilterProduct = tempFilterProduct.filter((curElem) => {
                        return curElem.price === price;
                    })
                } else {
                    tempFilterProduct = tempFilterProduct.filter((curElem) => {
                        return curElem.price <= price;
                    })
                }

                return {
                    ...state,
                    filter_products: tempFilterProduct,
                }
            
            case "CLEAR_FILTERS" :
                return {
                    ...state,
                    filters:{
                        ...state.filters,
                        text: "",
                        category: 'All',
                        company: "All",
                        colors: "All",
                        minPrice: 0,
                        maxPrice: state.filters.maxPrice,
                        price: state.filters.maxPrice,
                    }
                }

        default:
            return state;
    }
}

export default FilterReducer;
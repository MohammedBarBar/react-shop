//add to total price
export const addTotalPrice= (data)=>({
    type: 'ADD_TO_TOTALPRICE',
     data 
});
// add to addedItems initial state
export const addtoAddedItems= (data)=>({
    type: 'ADD_TO_ADDEDITEMS',
     data 
});
// add to items initial state
export const addtoItems= (data)=>({
    type: 'ADD_TO_ITEMS',
     data 
});
// add to cart
export const addToCart= (id)=>({
        type: 'ADD_TO_CART',
         id 
    });

// remove items
export const removeItem=(id)=>{
        return{
            type: 'REMOVE_ITEM',
            id
        }
    }

    //subtract qt action
export const subtractQuantity=(id)=>{
        return{
            type: 'SUB_QUANTITY',
            id
        }
    }
    //add qt action
    export const addQuantity=(id)=>{
        return{
            type: 'ADD_QUANTITY',
            id
        }
    }

    // export const setData=()=>{
    //     return{
    //         type: 'Set_Data',
            
    //     }
    // }
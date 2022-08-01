// const fromDb = null;

// // ✅ Provide empty array as fallback
// const arr = fromDb || [];
// const ex4 = (arr || []).length;
const initState = {
  items: [],
  addedItems: [],
  total: 0,
};
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
// localStorage.setItem('tt',JSON.stringify(initState.addedItems));
const cartReducer = (state = initState, action) => {
  if (action.type === "ADD_TO_ADDEDITEMS") {
    // console.log(action.data);
    // let s = state.items.push(action.data);
    state.addedItems = action.data;
    // console.log(state.items);
    return {
      ...state,
    };
  }

  if (action.type === "ADD_TO_ITEMS") {
    // console.log(action.data);
    // let s = state.items.push(action.data);
    state.items = action.data;
    shuffle(state.items);
    // console.log(state.items);
    return {
      ...state,
    };
  }
  if (action.type === "ADD_TO_TOTALPRICE") {
    state.total = action.data;
    return {
      ...state,
    };
  }

  //INSIDE HOME COMPONENT
  if (action.type === "ADD_TO_CART") {
    // console.log(state.items);
    // console.log(action.id);
    if (document.getElementById(state.items.idProducts)) {
      return {
        ...state,
        total: state.total,
      };
    }
    let addedItem = state.items.find((item) => item.idProducts === action.id);
    addedItem.price = Number.parseInt(addedItem.price);
    //check if the action id exists in the addedItems
    // if (state.addedItems === null) {
    //   console.log("hhh");
    //   addedItem.quantity = 1;
    //   let newTotal = state.total + addedItem.price;
    //   return {
    //     ...state,
    //     addedItems: [...state.addedItems, addedItem],
    //     total: newTotal,
    //   };
    // } else {
    //   let existed_item = state.addedItems.find(
    //     (item) => action.id === item.idProducts
    //   );
    //   if (existed_item) {
    //     existed_item.quantity += 1;
    //     // localStorage.setItem('cardAdded',JSON.stringify());
    //     return {
    //       ...state,
    //       total: state.total + existed_item.price,
    //     };
    //   }
    // }
    // if (state.addedItems === []) console.log("sadadsad");
    let existed_item = state.addedItems.find(
      (item) => action.id === item.idProducts
    );
    if (existed_item) {
      existed_item.quantity += 1;
      // localStorage.setItem('cardAdded',JSON.stringify());
      return {
        ...state,
        total: state.total + existed_item.price,
      };
    } else {
      addedItem.quantity = 1;
      //calculating the total
      //   localStorage.setItem('cardAdded',JSON.stringify(addedItem));
      // localStorage.setItem('cardAdded',JSON.stringify([...state.addedItems, addedItem]));
      let newTotal = state.total + addedItem.price;

      return {
        ...state,
        addedItems: [...state.addedItems, addedItem],
        total: newTotal,
      };
    }
  }
  if (action.type === "REMOVE_ITEM") {
    let itemToRemove = state.addedItems.find(
      (item) => action.id === item.idProducts
    );
    let new_items = state.addedItems.filter(
      (item) => action.id !== item.idProducts
    );
    // itemToRemove.price = Number.parseInt(itemToRemove.price);
    // console.log(itemToRemove);

    //calculating the total
    console.log(state.total);

    let newTotal = state.total - itemToRemove.price * itemToRemove.quantity;
    if (newTotal === 10) {
      //   console.log(state.total);
      newTotal = 0;
    }
    return {
      ...state,
      addedItems: new_items,
      total: newTotal,
    };
  }
  //INSIDE CART COMPONENT
  if (action.type === "ADD_QUANTITY") {
    console.log(state.addedItems);
    // console.log(action.id);
    let addedItem = state.addedItems.find(
      (item) => item.idProducts === action.id
    );
    // console.log(addedItem);
    // console.log(addedItem.quantity);
    addedItem.quantity += 1;
    //   console.log(addedItem);
    let newTotal = state.total + addedItem.price;
    return {
      ...state,
      total: newTotal,
    };
  }
  if (action.type === "SUB_QUANTITY") {
    let addedItem = state.addedItems.find(
      (item) => item.idProducts === action.id
    );
    //if the qt == 0 then it should be removed
    if (addedItem.quantity === 1) {
      let new_items = state.addedItems.filter(
        (item) => item.idProducts !== action.id
      );
      let newTotal = state.total - addedItem.price;
      return {
        ...state,
        addedItems: new_items,
        total: newTotal,
      };
    } else {
      addedItem.quantity -= 1;
      let newTotal = state.total - addedItem.price;
      return {
        ...state,
        total: newTotal,
      };
    }
  }

  if (action.type === "ADD_SHIPPING") {
    return {
      ...state,
      total: state.total + 10,
    };
  }

  if (action.type === "SUB_SHIPPING") {
    return {
      ...state,
      total: state.total - 10,
    };
  } else {
    return state;
  }
};

export default cartReducer;

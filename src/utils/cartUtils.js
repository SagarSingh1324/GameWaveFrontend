export const addDecimals = (num) => {
    return (Math.round(num*100) / 100).toFixed();
}

export const updateCart = (state) =>{
    
    // calcualte items price
    state.itemsPrice = addDecimals( state.cartItems.reduce( 
        (acc, item) => acc + item.price*item.qty, 0
    ));

    // calculate shipping price, if order over 100₹ then free, else 10₹ shipping
    state.shippingPrice = addDecimals( 
        (state.itemsPrice >= 100) ? 0:10 
    );

    // calculate tax price, say 20% price
    state.taxPrice = addDecimals(
        (state.itemsPrice*0.2).toFixed(2)
    );

    // calculate total price
    state.totalPrice = (
        Number(state.itemsPrice) + Number(state.shippingPrice) + Number(state.taxPrice)
    ).toFixed(2);

    localStorage.setItem( 'cart', JSON.stringify(state));

    return state;
}
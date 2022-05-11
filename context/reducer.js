import toast from "react-hot-toast"
export const reducer=(state,action)=>{

  switch(true){
    case(action.type==="TOGGLE_QTY"):{
     // let cartItem = null
      const {qty,cart} = {...state}
      let tempCart=[]
     /* if(!!cart.length){
        cartItem = cart.find(item=>item._id===action.payload.id);
      }*/
      if(action.payload.type==="INC"){
        if(!!cart.length){
          tempCart= cart.map(item=>{
            const {cartQty} = {...item}
            if(item._id===action.payload.id){
              return {...item,cartQty:cartQty+=1}
            }
            return item
          })
        }
       qty+=1
      }else if(action.payload.type === "DEC"){
        if(!!cart.length){
          tempCart=  cart.map(item=>{
            const {cartQty}={...item}
            if(item._id===action.payload.id){
              return {...item, cartQty:cartQty-=1}
            }
            return item;
         }).filter(item=>{
           if(item.cartQty<=0){
             toast.error(`Removed ${item.name} from cart`)
             return false
           }
             return true
         })
        }
        if(qty-1<=0) return {...state,qty:0,cart:tempCart}
      qty -=1
      }
      return {...state,qty:qty,cart:tempCart}

    }
    case (action.type==="ADD_TO_CART"):{
      const {cart} = {...state}
      let tempCartItem = null
      if(!!cart?.length){
      tempCartItem = cart?.find(item=>item?._id===action.payload?._id)
    }
      if(tempCartItem){
        toast.error(`${action.payload?.cartQty} ${action.payload?.name} Already in Cart`)
        return {...state}
      }
      toast.success(`${action.payload?.cartQty} ${action.payload?.name} Added To Cart`)
      return {...state,cart:[...cart,action.payload]}
    }
    case (action.type==="TOGGLE_CART"):{
      const {showCart}={...state}
      return {...state,showCart:!showCart}
    }
    case(action.type==="REMOVE_ITEM"):{
     toast.success(`Removed ${action.payload.name} From Cart`)
      const {cart} = {...state}
      return { ...state, cart: cart.filter(item=>(item._id!== action.payload.id)) }
    }
    case(action.type === "CALC_SUBTOTAL"):{
      const {cart} ={...state}
      if(!!cart?.length){
      let {totalPrice,totalQuantities} = cart.reduce((prevTotal,currentItem)=>{
            prevTotal.totalPrice += currentItem?.price * currentItem?.cartQty
           prevTotal.totalQuantities += currentItem?.cartQty
        return prevTotal
        },{totalPrice:0,totalQuantities:0})
      totalPrice = parseFloat(totalPrice?.toFixed(2))
   return {...state,totalPrice,totalQuantities} 
      }
      return{...state,totalPrice:0,totalQuantities:0}
    }
    case(action.type==="RESET_CART"):{
      localStorage.clear()
      return{...state,showCart:false,cart:[],totalPrice:0,qty:0}
    }
   default:
      throw new Error(`No Matching Type for ${action.type}`)
  }
}

export const initialState = {
  showCart:false,
  cart:[],
  totalPrice:0,
  totalQuantities:0,
  qty:0,
}



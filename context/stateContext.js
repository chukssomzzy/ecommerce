import React,{useContext,useReducer,useEffect} from "react";
import {initialState, reducer} from "./reducer";


const AppContext = React.createContext()



export const AppProvider = ({children})=>{
  const [state, dispatch] = useReducer(reducer,initialState)
  const toggleQty=(id,type)=>{
    return dispatch({type:"TOGGLE_QTY",payload:{type,id}})
  }
    const addToCart = (product)=>{
      return dispatch({type:"ADD_TO_CART",payload:product})
    }
  const toggleCart = ()=>{
    return dispatch ({type:"TOGGLE_CART"})
  }
  const removeItem = (removeData)=>{
    return dispatch({type:"REMOVE_ITEM",payload:removeData})
  }
  const resetCart =()=>dispatch({type:"RESET_CART"})
 useEffect(() => { 
  dispatch({type:"CALC_SUBTOTAL"})
   localStorage.setItem('state',JSON.stringify(state))
 }, [state?.cart])
  useEffect(()=>{
    dispatch({type:"SET_INITIAL_STATE",payload:"state"})
  },[])
  
  return(
  <AppContext.Provider value={{...state,toggleQty,addToCart,toggleCart,removeItem,resetCart}}>
   {children}
  </AppContext.Provider>
  )
}


export const useGlobalContext = ()=>{
  return useContext(AppContext)
}

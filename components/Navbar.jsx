import React from 'react'
import Link from 'next/link'
import {AiOutlineShopping} from "react-icons/ai"
import { useGlobalContext } from '../context/stateContext'
import Cart from "./Cart"
const Navbar = () => {
	const {showCart,totalQuantities,toggleCart} =   useGlobalContext()
	return (
		<div className="navbar-container">
     <p className="logo">
     	<Link href="/">SOMZZY Headphones</Link>
     </p>
			<button type="button" className="cart-icon" onClick={toggleCart}><AiOutlineShopping />
      <span className="cart-item-qty">{totalQuantities}</span>
			</button>
			{
       showCart && <Cart />
			}
		</div>
	)
}

export default Navbar

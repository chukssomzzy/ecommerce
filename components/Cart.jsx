import React,{useRef} from 'react'
import Link from 'next/link'
import { AiOutlineMinus,AiOutlinePlus,AiOutlineLeft,AiOutlineShopping } from 'react-icons/ai'
import {TiDeleteOutline} from "react-icons/ti"
import { useGlobalContext } from '../context/stateContext'
import { urlFor } from '../lib/client'
import  getStripe  from '../lib/getStripe'
import axios from 'axios'
import toast from 'react-hot-toast'
import { BASE_URL } from '../lib/utils/utils' 
const Cart = () => {
	const cartRef = useRef()
    const {cart,totalPrice,totalQuantities,toggleCart,toggleQty,removeItem} = useGlobalContext()
	const handleCheckOut = async()=>{
		const stripe = await getStripe()
    console.log(BASE_URL)
        const { data } = await axios.post(`/api/stripe`,cart)
		if(data.statusCode===500) return
		toast.loading("Redirecting...")
		stripe.redirectToCheckout({sessionId:data.id})
	}
	return (
		<div className="cart-wrapper" ref={cartRef}>
			<div className="cart-container">
				<button className="cart-heading" onClick={toggleCart}>
					<AiOutlineLeft />
					<span>Your Cart</span>
					<span className="heading"></span>
					<span>{totalQuantities} items</span>
					<span className="cart-num-items"></span>
				</button>
				{
					!(cart?.length)&&(
              <div className="empty-cart">
              	<AiOutlineShopping size={150}/>
								<h3>Your Shopping Bag Is Empty</h3>
								<Link href="/"><button onClick={toggleCart} type="button" className="btn">Continue Shopping</button></Link>

              </div>
					)
				}
				<div className="product-container">
						{
					!!(cart?.length) && (
					cart?.map((cartItem)=>(
						<div className="product" key={cartItem?._id}>          
							<img src={urlFor(cartItem?.image[0]).width(200).url()} alt={cartItem?.name} className="cart-product-image"/>
							<div className="item-desc">
							<div className="flex top">
								<h5>{cartItem?.name}</h5>
								<h4>#{cartItem?.price}</h4>
							</div>
									<div className="flex bottom">

								<div>
									<p className="quantity-desc">
                <span className="minus" onClick={()=> toggleQty(cartItem?._id,"DEC")}>
              <AiOutlineMinus />
              </span>
              <span className="num">
                {cartItem?.cartQty}
              </span>
              <span className="plus" onClick={()=>toggleQty(cartItem?._id,"INC")}>
              <AiOutlinePlus />
              </span>
									</p>
								</div>
										<button type="button" className="remove-item" onClick={()=>removeItem({name:cartItem?.name,id:cartItem?._id})}>
												<TiDeleteOutline />
										</button>
							</div>
						</div>
					</div>
					))
					)
					}
				</div>
				{
					!!(cart.length) && (
						<div className="cart-bottom">
							<div classNametotal="">
								<h3>SubTotal:</h3>
								<h3>#{totalPrice}</h3>
							</div>
							<div className="btn-container">
							<button className="btn" type="button" onClick={handleCheckOut}>Pay With Stripe</button></div>
						</div>
					)
				}
			</div>

		</div>
	)
}

export default Cart

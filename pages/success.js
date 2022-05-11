import React,{useState,useEffect}from 'react'
import Link from 'next/link'
import {BsBagCheckFill} from "react-icons/bs"
import { useGlobalContext } from '../context/stateContext'
import {confettiRun} from '../lib/utils/utils'
const Success = () => {
  const {resetCart}= useGlobalContext()
  useEffect(() => {
   resetCart() 
    confettiRun()
  }, [])

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank You For Your Order</h2>
        <p className="email-invoice">Check your email inbox for your invoice
        </p>
        <p className="description">If you have any question  please email<a href="mailto:order@somzzy.com" className="email">order@somzzy.com</a></p>
        <Link href="/" passHref>
         <button type="button" width="300px" className="btn">continue shopping</button>
        </Link>
      </div>
    </div>
  )
}

export default Success

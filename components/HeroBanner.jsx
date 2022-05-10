import React from 'react'
import Link from 'next/link'
import { useSanityNext } from '../lib/client'
import Image from 'next/image'
const HeroBanner = ({heroBanner}) => {
 const {buttonText,desc,image,largeText1,largeText2,midText,product,saleTime,smallText}= heroBanner	
	const {imageProps} = useSanityNext(image)
	return (
		<div className="hero-banner-container">
     <div>
     	<p className="beats-solo">{smallText}</p>
			 <h3>{midText}</h3>
			 <h1>{largeText1}</h1>
			 <Image {...imageProps} layout="fill" objectFit="contain" alt="headphones" className="hero-banner-image" />
     <div>
  <Link href={`product/${product}`} passHref><button type="button">{buttonText}</button></Link>
			 <div className="desc">
			 	<h5>Description</h5>
			 	<p>{desc}</p>
			 </div>
			 </div>
		 </div>
		</div>
	)
}

export default HeroBanner

import React from 'react'
import Link from 'next/link'
import { useSanityNext } from '../lib/client'
import Image from 'next/image'

const FooterBanner = ({footerBanner}) => {
	const {buttonText,desc,image,largeText1,largeText2,midText,product,saleTime,smallText,discount  }= footerBanner
	const {imageProps} = useSanityNext(image)
	return (
		<div className="footer-banner-container">
			<div className="banner-desc">
				<div className="left">
         <p>{discount}</p>
         <h3>{largeText1}</h3>
         <h3>{largeText2}</h3>
         <p>{saleTime}</p>
				</div>	
				<div className="right">
        <p>{smallText}</p>
        <p>{midText}</p>
        <p>{desc}</p>
					<Link href={`/product/${product}`} passHref><button type="button">{buttonText}</button></Link>
					</div>
<div className="footer-banner-image">
      <Image {...imageProps} width={700} height={700}/>
			</div>
				</div>
		</div>
	)
}

export default FooterBanner

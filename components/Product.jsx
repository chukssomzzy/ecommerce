import React from 'react'
import Link from 'next/link'
import { useSanityNext } from '../lib/client'
import Image from 'next/image'
const Product = ({product}) => {
  const {image,name,slug,price} = product
	const {imageProps} = useSanityNext(image[0])
	return (
		<div>
      <Link href={`/products/${slug?.current}`} passHref>
				<div className="product-card">
					<Image {...imageProps} width={250} height={250} className="product-image" alt={name}/>
        <p className="product-name">{name}</p>
        <p className="product-price">#{price}</p>
				</div>
			</Link>
		</div>
	)
}

export default Product

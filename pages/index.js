import React from 'react'
import { FooterBanner,HeroBanner,Product } from '../components'
import { client} from '../lib/client'
const Home = ({products,banner}) => {
  
  return (
    <>
      
      {/*Hero Banner Component*/}
      <HeroBanner heroBanner={!!(banner.length)&&banner[0]} />
      {/*Product Heading*/}
      <div className="products-heading">
        <h2>Best Selling Product</h2>
        <p>speakers of many variation</p>
      </div>
      {/*Product Container */}
      <div className="products-container">
        {

          products?.map(product=>( <Product key={product?._id} product={product&&product} /> ))
        }
      </div>
      {/*FooterBanner Component*/}
      <FooterBanner footerBanner={!!(banner.length) &&banner[0] }/>
    </>
  )
}

export default Home

export const getStaticProps=async ()=>{
  const query = `*[_type=="product"]`
  const products = await client.fetch(query)
  const bannerQuery = `*[_type=="banner"]`
  const banner = await client.fetch(bannerQuery)

  return{
    props:{
      products,
      banner
    },
    revalidate:10,
  }
}

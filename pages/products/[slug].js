import React,{useState} from 'react'
import { client } from '../../lib/client'
import Product from "../../components/Product"
import {AiOutlineMinus,AiOutlinePlus,AiFillStar,AiOutlineStar} from "react-icons/ai"
import {urlFor} from "../../lib/client"
import { useGlobalContext } from '../../context/stateContext'

const ProductDetails = ({products,product}) => {
  const {image,name,details,price,_id}= product
  const [index, setIndex] = useState(0)
  const {qty,toggleQty,addToCart}= useGlobalContext()

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={urlFor(image[index])} width={400} height={400}/>
          </div>
          
        
          <div className="small-image-container">
            {
              image.map((image,i)=>{

                return(
                  <img src={urlFor(image).width(100).url()} className={`small-image ${i===index?"selected-image":null}`}onClick={()=>setIndex(i)}width={100} key={image.asset._ref} height={100}/>

                )
            })
            }
          </div>
        
        </div>
        <div className="product-detail-desc">
         <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>{20}</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p>#{price}</p>
          <div className="quantity">
           <h3>Quantity</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={()=> toggleQty(_id,"DEC")}>
              <AiOutlineMinus />
              </span>
              <span className="num">
                {qty}
              </span>
              <span className="plus" onClick={()=>toggleQty(_id,"INC")}>
              <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={()=>addToCart({...product,cartQty:qty})}>Add To Cart</button>
<button type="button" className="buy-now" onClick="">Buy Now</button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You May Also Like</h2>
        <div className="marquee">
        <div className="maylike-products-container track">
          {
            products.map(product=>(
            <Product key={product?._id} product={product&&product} />
            ))
          }
        </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails

export const getStaticPaths = async ()=>{
  const query = `*[_type=="product"]
   {
   slug{
   current
   }
   }
  `
  const products=await client.fetch(query)
  const paths = products.map(product=>({
    params:{
      slug:product.slug.current
    }
  }))
  return {
    paths,
    fallback:"blocking"
  }
}
export const getStaticProps= async ({params})=>{
  const queryId = params.slug
  const query= `*[_type=="product" && slug.current=="${queryId}"][0]`
  const product = await client.fetch(query);
  const productQuery = `*[_type== "product"]`
  const products = await client.fetch(productQuery)
  return{
    props:{
      product,
      products
    },
    revalidate:10,
  }
}

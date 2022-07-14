import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SEC_KEY)

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const params = {
        submit_type:'pay',
        mode:"payment",
        payment_method_types:["card"],
        billing_address_collection:"auto",
        shipping_options:[
          {
            shipping_rate:"shr_1KxmEqKwIYpZCL8gNAoPAZ6l"
          }
          /*{
            shipping_rates:"shr_1KxZNWKwIYpZCL8gt12NxQUr"
          }*/
        ],
        line_items:req.body.map(item=>{
          const img = item.image[0].asset._ref;
          const newImge = img.replace("image-", `https://cdn.sanity.io/images/yo4ts432/production/`).replace('-webp','.webp')
          return{
            price_data:{
              currency:'ngn',
              product_data:{
                name:item.name,
                images:[newImge],
              },
              unit_amount:item.price,
            },
            adjustable_quantity:{
               enabled:true,
              minimum:1,
            },
            quantity:item.cartQty,
          }
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      }
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      console.log(session)
      res.status(200).json(session)
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

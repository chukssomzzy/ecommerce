import sanityClient from "@sanity/client"
import { useNextSanityImage } from "next-sanity-image";
import imageUrlBuilder from "@sanity/image-url"

export const client = sanityClient({
  
  projectId:process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:"production",
  apiVersion:"2022-05-04",
  useCdn:true,
  token:process.env.SANITY_API_TOKEN
})
const configuredSanityClient = sanityClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: "production",
	useCdn: true
});
export const useSanityNext=(sanityData,option={
			blurUpImageWidth: 124,
			blurUpImageQuality: 40,
			blurUpAmount: 24
		})=>{
  const imageProps=useNextSanityImage(configuredSanityClient,sanityData,option)

  return{
    imageProps
  }
}
const builder=imageUrlBuilder(client)

export const urlFor= (source)=>builder.image(source)

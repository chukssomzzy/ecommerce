import '../styles/globals.css'
import { Toaster } from 'react-hot-toast'
import Layout from "../components/layout"
import React from "react"
import {AppProvider} from "../context/stateContext" 
const MyApp=({ Component, pageProps })=> {
  return (
    <AppProvider>
      <Layout>
        <Toaster />
        <Component {...pageProps}/>
      </Layout>
    </AppProvider>
  )
}

export default MyApp

import Head from "next/head"
import Footer from "./footer"
import Navbar from "../Navbar"
const Layout = ({children}) => {
  return (
    <div className="layout">
      <Head>
       <title>Phone Accesories| web Store| Buy headphones</title>
      </Head>
      <header>
      <Navbar />
      </header>
      <main className="main-container">
       {children}
      </main>
      <footer>
     <Footer />
      </footer>

    </div>
  )
}

export default Layout

import React from 'react'
import Header from './partials/header/header.comp'
import Footer from "./partials/footer.comp"
import "./defaultLayoutr.style.css"

const DefaultLayout = ({children}) => {
  return (
    <>
    <div className="default-layout">
    <header className="header">
    <Header/>
    </header>
    <main className="main w-full ">
   {children}
    </main>
    <footer className="footer">
    <Footer/>
    </footer>
    </div>
    </>
  )
}

export default DefaultLayout
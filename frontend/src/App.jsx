import Header from './components/Header.jsx'
import style from "./App.module.css"
import { Helmet } from 'react-helmet'
import { Outlet } from 'react-router'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <>
      <div className={style.app}>
        <Helmet>
            <meta charSet="utf-8" name="viewport" content="width=device-width, initial-scale=1" />
            <title>Find The Character</title>
        </Helmet>

        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  )
}

export default App
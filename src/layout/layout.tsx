import { Outlet } from 'react-router-dom'
import Header from '../components/header/header'

const Layout = () => {
  return (
    <>
      <header className='bg-[#121C1E] font-mono h-20 px-5  lg:px-8 py-3 select-none z-10'>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  )
}

export default Layout

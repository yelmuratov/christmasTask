import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// Pages
import ChristmasTree from './pages/christmasTree/christmasTree'
import Toys from './pages/toysPage/toys'

// Layout
import Layout from './layout/layout'

// Styles
import './App.css'
import Starter from './pages/starterPage/starter'
import { useAppSelector } from './components/helpers'


const App = () => {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index:true,
          element:<Starter />
        },
        {
          path: 'christmasTree',
          element: <ChristmasTree />,
        },
        {
          path: 'Toys',
          element: <Toys />,
        },
      ],
    },
  ])

  const items = useAppSelector(state => state.data);
  
  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(items));
  }, [items])

  return (
    <section className='wrapper'>
      <RouterProvider router={routes} />
    </section>
  )
}

export default App

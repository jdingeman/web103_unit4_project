import React from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import EditBuild from './pages/EditBuild'
import BuildDetails from './pages/BuildDetails'
import ViewBuilds from './pages/ViewBuilds'
import CreateBuild from './pages/CreateBuild'
import Sandbox from './pages/Sandbox'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <CreateBuild title='PC Builder | Customize' />
    },
    {
      path:'/custombuilds',
      element: <ViewBuilds title='PC Builder | Custom Cars' />
    },
    {
      path: '/custombuilds/:id',
      element: <BuildDetails title='PC Builder | View' />
    },
    {
      path: '/edit/:id',
      element: <EditBuild title='PC Builder | Edit' />
    },
    {
      path: '/sandbox',
      element: <Sandbox titke='SANDBOX' />
    }
  ])

  return (
    <div className='app'>

      <Navigation />

      { element }

    </div>
  )
}

export default App
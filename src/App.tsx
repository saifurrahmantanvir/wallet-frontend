import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.scss';

import { IconClose, IconNavToggler } from './icons/Icons';
import Login from './components/Login';
import { LoginState } from './global.types'
import MainContent from './MainContent';
import Sidebar from './Sidebar';

import { Provider, useDispatch } from 'react-redux'
import { setUser } from './redux/userActions';
import { setMovements } from './redux/movActions';

import store from './store';

const AppWithoutContexts = function () {
   const dispatch = useDispatch()
   const [isLoggedIn, setIsLoggedIn] = useState<LoginState>('notLoggedIn')
   const [nav, setNav] = React.useState(false)

   const handleToggle = () => {
      setNav(!nav)
   }

   React.useLayoutEffect(() => {
      const userInfo = JSON.parse(
         localStorage.getItem('user') as string
      )
      const movements = JSON.parse(
         localStorage.getItem('movements') as string
      )

      if (userInfo && movements) {
         dispatch(setUser(userInfo.user, userInfo.token))
         dispatch(setMovements(movements))

         setIsLoggedIn('loggedIn')
      }
   }, [dispatch])


   if (isLoggedIn === 'loggedIn') {
      return (
         <div className="app">
            <Sidebar nav={nav} handleToggle={handleToggle} />
            <MainContent setIsLoggedIn={setIsLoggedIn} />

            <button className='sidebar__toggler' onClick={handleToggle}>
               {
                  nav
                     ? <IconClose />
                     : <IconNavToggler />
               }
            </button>
         </div >
      );
   }

   return (
      <Login isLoggedIn={isLoggedIn}
         setIsLoggedIn={setIsLoggedIn} />
   )
}

const App = function () {
   return (
      <Provider store={store}>

         <BrowserRouter>
            <AppWithoutContexts />
         </BrowserRouter>

      </Provider>
   )
}

export default App;
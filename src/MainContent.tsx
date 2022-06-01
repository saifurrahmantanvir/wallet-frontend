import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './sass/mainContent.scss'

import { LoginState } from './global.types';

import {
   Home,
   Loan,
   NoMatch,
   Settings,
   Statistics,
   Transfer
} from './pages';

type MainContentProps = {
   setIsLoggedIn: React.Dispatch<React.SetStateAction<LoginState>>
}

const MainContent = ({ setIsLoggedIn }: MainContentProps) => {
   return (
      <div className='main'>
         <Routes>
            <Route path='/' element={<Home />} />
            <Route path='stats' element={<Statistics />} />
            <Route path='loan' element={<Loan />} />
            <Route path='transfer' element={<Transfer />} />
            <Route path='settings' element={<Settings setIsLoggedIn={setIsLoggedIn} />} />
            <Route path='*' element={<NoMatch />} />
         </Routes>
      </div>
   );
};

export default MainContent;
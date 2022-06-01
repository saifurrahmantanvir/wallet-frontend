import React from 'react'
import { NavLink } from 'react-router-dom'
import './sass/sidebar.scss'

import {
   IconHome,
   IconLoan,
   IconSettings,
   IconStats,
   IconTransfer
} from './icons/Icons';

type SidebarProps = {
   nav: boolean,
   handleToggle: () => void
}

const Sidebar = function ({ nav, handleToggle }: SidebarProps) {


   const navLinkStyles = ({ isActive }: { isActive: boolean }) => {
      return {
         boxShadow: isActive ? '-3px -3px 7px rgba(255, 255, 255, 0.451), 3px 3px 5px rgba(94, 104, 121, .288)' : 'none',
         color: isActive ? '#000' : '#292D32'
      }
   }

   return (
      <div className={`sidebar ${nav ? 'sidebar__close' : ''}`}>
         <ul className='nav'>

            <NavLink to='/' className='nav__link'
               style={navLinkStyles}
               onClick={handleToggle}
            >
               <IconHome />
               <span>Home</span>
            </NavLink>

            <NavLink to='/stats' className='nav__link'
               style={navLinkStyles}
               onClick={handleToggle}
            >
               <IconStats />
               <span>Stats</span>
            </NavLink>

            <NavLink to='/loan' className='nav__link'
               style={navLinkStyles}
               onClick={handleToggle}
            >
               <IconLoan />
               <span>Loan</span>
            </NavLink>

            <NavLink to='/transfer' className='nav__link'
               style={navLinkStyles}
               onClick={handleToggle}
            >
               <IconTransfer />
               <span>Transfer</span>
            </NavLink>

            <NavLink to='/settings' className='nav__link'
               style={navLinkStyles}
               onClick={handleToggle}
            >
               <IconSettings />
               <span>Settings</span>
            </NavLink>

         </ul>

         <h1 className='nav__logo'>Wallet.</h1>
      </div>
   );
};

export default Sidebar;
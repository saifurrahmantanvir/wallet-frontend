import React from 'react'
import '../sass/login.scss'

import { useDispatch } from 'react-redux';
import { getUser, setStatus } from '../redux/userActions';
import useUser from '../hooks/useUser';
import { getMovements } from '../redux/movActions';

import LoginSvg from '../icons/LoginSvg'
import { LoginState } from '../global.types'

type LoginProps = {
   isLoggedIn: LoginState,
   setIsLoggedIn: React.Dispatch<React.SetStateAction<LoginState>>
}

const Login = function ({ isLoggedIn, setIsLoggedIn }: LoginProps) {
   const { user: { account }, status } = useUser()
   const dispatch = useDispatch()

   const handleLogin = (e: React.BaseSyntheticEvent) => {
      e.preventDefault()

      const { name: { value: name }, pin: { value: pin } } = e.target.elements

      if (!name || !pin) {
         return dispatch(setStatus('Empty username or pin'))
      }

      dispatch(setStatus(''))

      dispatch(getUser(name, pin))
   }

   React.useEffect(() => {
      if (status)
         setIsLoggedIn('loginStatus')

      if (account) {
         dispatch(getMovements(account))
         setTimeout(() => setIsLoggedIn('loggedIn'), 1500)
      }

   }, [
      status,
      account,
      dispatch,
      setIsLoggedIn
   ])

   return (
      <div className='form-container'>
         <div className='login'>
            <div className='login__logo'>
               Wallet.
            </div>

            <h2 className='login__title'>Login & get started with <b>Wallet.</b> now!</h2>

            <form className='login__form' onSubmit={handleLogin}>
               <div className='login__name'>
                  <label html-for='name' className='login__label'>Username</label>
                  <input className='login__input' id='name' placeholder="Tanvir rahman" />
               </div>
               <div className='login__email'>
                  <label html-for='pin' className='login__label'>Your pin</label>
                  <input className='login__input' id='pin' placeholder="1234" />
               </div>
               <div className='login__submission'>
                  <button className='login__submit'>Login</button>
                  {
                     isLoggedIn === 'loginStatus' &&
                     <h4 className='login__error'>{status}</h4>
                  }
               </div>
            </form>

            <LoginSvg />
         </div>
      </div>
   )
}

export default Login
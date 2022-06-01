import { useNavigate } from 'react-router-dom';
import '../sass/settings.scss'

import { LoginState } from '../global.types';

import { useDispatch } from 'react-redux';

import { IconLogout, IconEyeSlash } from '../icons/Icons';
import useUser from '../hooks/useUser';
import { removeUser } from '../redux/userActions';
import { removeMovements } from '../redux/movActions';

type SettingsProps = {
   setIsLoggedIn: React.Dispatch<React.SetStateAction<LoginState>>
}

const Settings = ({ setIsLoggedIn }: SettingsProps) => {
   const navigate = useNavigate();
   const { user } = useUser()
   const dispatch = useDispatch()

   const callAll = () => {
      navigate('/')

      setIsLoggedIn('notLoggedIn')
   }

   const handleLogout = () => {
      dispatch(removeUser())
      dispatch(removeMovements())

      callAll()
   }

   return (
      <div className="settings">
         <h1 className="settings__label">Your settings</h1>

         <div className='settings__info'>
            <h3>Click here to logout</h3>

            <button className='settings__logout'
               onClick={handleLogout}
            >
               <span>Logout</span>
               <IconLogout />
            </button>
         </div>


         <h2>Personal information</h2>

         <div className='personal'>
            <h3>Owners full name</h3>
            <span>{user.name}</span>

            <h3>Account no</h3>
            <span>{user.account}</span>

            <h3>Password</h3>
            <span>
               <span>Hidden</span>
               <IconEyeSlash />
            </span>
         </div>

         <h2>Delete account <sub>(not yet implemented)</sub></h2>

         <form className="delete">
            <input type='text' placeholder="Username"
               className='delete__name' />

            <input type='number' placeholder="Password"
               className="delete__pin" />

            <button className='delete__btn' type="submit">Delete</button>
         </form>

         <span className='settings__copy'>
            &copy; Copyright by Tanvir rahman, 2022.
         </span>
      </div>
   );
};

export default Settings;
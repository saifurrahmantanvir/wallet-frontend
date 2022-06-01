import '../sass/account.scss'

import useUser from '../hooks/useUser';

type AccountType = {
   movements: number[]
}

const Account = function ({ movements }: AccountType) {
   const { user } = useUser()
   const name = user.name.split(' ')[0];

   const totalBalance = movements.reduce((acc, mov) => acc + mov, 0);

   return (
      <div className='account'>
         <div className='account__info'>
            <h1 className='account__name'>Welcome, {name}</h1>
            <p className="account__date">20 - 11 - 2020</p>
         </div>

         <span data-testid='total' className='account__total'>{totalBalance} <span className='doller doller-1'>$</span></span>
      </div>
   );
};

export default Account;
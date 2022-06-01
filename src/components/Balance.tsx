import React from 'react';
import '../sass/balance.scss'
import { IconIn, IconInterest, IconOut } from '../icons/Icons';

type BalanceProps = {
   movements: number[]
}

const Balance = function ({ movements }: BalanceProps) {
   const totalDeposits = movements.filter(mov => mov > 0)
      .reduce((acc, deposit) => acc + deposit, 0);

   const totalWithdraws = movements.filter(mov => mov < 0)
      .reduce((acc, withdraw) => acc + withdraw, 0);

   const interest = movements.filter(mov => mov > 0)
      .map(deposit => (deposit * 1.2) / 100)
      .filter(interest => interest >= 1)
      .reduce((acc, interest) => acc + interest, 0);

   return (
      <React.Fragment>
         <div className='balance balance--1'>
            <IconIn />
            <h2 className='balance__label'>In</h2>
            <span className='balance__amount balance__amount--in'>{totalDeposits} <span className='doller doller-2'>$</span></span>
         </div>

         <div className='balance balance--2'>
            <IconOut />
            <h2 className='balance__label'>Out</h2>
            <span className='balance__amount balance__amount--out'>{Math.abs(totalWithdraws)} <span className='doller doller-2'>$</span></span>
         </div>

         <div className='balance balance--3'>
            <IconInterest />
            <h2 className='balance__label'>Interest</h2>
            <span className='balance__amount balance__amount--interest'>{interest.toFixed(2)} <span className='doller doller-2'>$</span></span>
         </div>
      </React.Fragment>
   )
};

export default Balance;
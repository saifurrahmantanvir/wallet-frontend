import React, { useState } from 'react';
import '../sass/loan.scss'

import LoanSvg from "../icons/LoanSvg";
import Modal from '../components/Modal';

import useUser from '../hooks/useUser';
import useMovements from '../hooks/useMovements';
import { useDispatch } from 'react-redux';
import { getMovements } from '../redux/movActions';
import { StatusType } from '../global.types';

const Loan = () => {
   const { user } = useUser()
   const dispatch = useDispatch()

   const movementsData = useMovements()
   const movements = movementsData.map(moves => moves.movement)
   const requestable = Math.max(...movements) * 0.8;

   const [loanStatus, setLoanStatus] = useState<StatusType>('closed');


   const handleLoanRequest = async (e: React.BaseSyntheticEvent) => {
      e.preventDefault();

      try {
         const { token } = JSON.parse(
            localStorage.getItem('user') as string
         )

         const movement = +e.target.elements.loan.value;

         if (movement > 0 && movements.some(mov => mov * 0.8 >= movement)) {
            const response = await fetch(`https://wallet-tanvir.onrender.com/api/movements/${user.account}`, {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
               },
               body: JSON.stringify({ movement })
            })

            const { status, ...data } = await response.json()
            if (status === 'fail') throw data

            dispatch(getMovements(user.account as number))

            setLoanStatus('success');
         } else {
            setLoanStatus('failed')
         }

      } catch (error) {
         setLoanStatus('failed');
      }

      e.target.elements.loan.value = '';
   }

   return (
      <div className="loan">
         <h1 className="loan__label">Take loan easily, anytime</h1>
         <LoanSvg />

         <p className='loan__requestable'>
            NOTE - you can request for upto {requestable}
            <span className='doller'>$</span>
         </p>

         <form className="loan__form" onSubmit={handleLoanRequest}>
            <input type='number' id='loan' className="loan__input" placeholder="Enter amount" />
            <button type="submit">Request</button>
         </form>
         {
            loanStatus === 'success'
               ? (
                  <Modal setStatus={setLoanStatus}
                     message='Your loan request is granted' />
               )
               : loanStatus === 'failed'
                  ? (
                     <Modal setStatus={setLoanStatus}
                        message='Sorry! Your loan request was not granted' />
                  ) : null
         }
      </div>
   );
};

export default Loan;
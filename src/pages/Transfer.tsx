import React, { useState } from 'react';
import '../sass/transfer.scss'

import TransferSvg from "../icons/TransferSvg";
import useMovements from '../hooks/useMovements';

import { useDispatch } from 'react-redux';
import { getMovements } from '../redux/movActions';
import Modal from '../components/Modal';
import { StatusType } from '../global.types';

const Transfer = () => {
   const dispatch = useDispatch()
   const movementsData = useMovements()
   const movements = movementsData.map(moves => moves.movement)

   const totalBalance = movements.reduce((acc, mov) => acc + mov, 0);

   const [transferStatus, setTransferStatus] = useState<StatusType>('closed');

   const movementReq = (account: number, token: string, amount: number) => {
      return fetch(`https://wallet-tanvir.herokuapp.com/ap/movements/${account}`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
         },
         body: JSON.stringify({ movement: amount })
      })
   }

   const handleTransfer = async (e: React.BaseSyntheticEvent) => {
      e.preventDefault();

      try {
         const { user: { account: sender }, token } = JSON.parse(
            localStorage.getItem('user') as string
         )

         const { amount: { value: amount }, account: { value: receiver } } = e.target.elements;

         if (!receiver || !amount) {
            return setTransferStatus('failed');
         }

         if (amount > 0 && totalBalance > amount) {
            const withdraw = movementReq(sender, token, -amount as number)
            const deposit = movementReq(receiver, token, amount as number)

            const [response1, response2] = await Promise.all(
               [withdraw, deposit]
            )
            if (!response1.ok || !response2.ok) throw response1

            dispatch(getMovements(sender as number))

            setTransferStatus('success');
         } else {
            setTransferStatus('failed')
         }

      } catch (error) {
         setTransferStatus('failed');
      }

      e.target.elements.account.value = e.target.elements.amount.value = '';

   }

   return (
      <div className="transfer">
         <h1 className="transfer__label">
            Transfer money with just one click
         </h1>
         <TransferSvg />

         <form className="transfer__form" onSubmit={handleTransfer}>
            <input
               type='number'
               id='account'
               className="transfer__input"
               placeholder="Receiver account"
            />
            <input
               type='number'
               id='amount'
               className="transfer__input"
               placeholder="Transfer amount"
            />
            <button type="submit">Send</button>
         </form>
         {
            transferStatus === 'success'
               ? (
                  <Modal setStatus={setTransferStatus}
                     message='Your transfer was successful'
                     transfer='modal__transfer'
                  />
               )
               : transferStatus === 'failed'
                  ? (
                     <Modal setStatus={setTransferStatus}
                        message='Sorry! Your transfer was not successful'
                        transfer='modal__transfer'
                     />
                  ) : null
         }
      </div>
   );
};

export default Transfer;
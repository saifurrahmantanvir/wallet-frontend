import React from 'react'
import ReactDOM from 'react-dom'
import '../sass/modal.scss'

import { StatusType } from '../global.types'

type ModalProps = {
   setStatus: React.Dispatch<React.SetStateAction<StatusType>>
   message: string
   transfer?: string
}

let modalRoot: HTMLElement | null;

const Modal = function ({ setStatus, message, transfer }: ModalProps) {
   modalRoot = modalRoot ? modalRoot : document.getElementById('modal');

   const elRef: React.MutableRefObject<HTMLDivElement | null> = React.useRef(null);

   if (!elRef.current) {
      elRef.current = document.createElement('div');
      elRef.current.classList.add('modal__container');

      transfer && elRef.current.classList.add(`${transfer}`);
   }

   React.useEffect(() => {
      if (!modalRoot || !elRef.current) return;

      modalRoot.appendChild(elRef.current);
      return () => {
         if (modalRoot && elRef.current)
            modalRoot.removeChild(elRef.current)
      }
   })

   return ReactDOM.createPortal(
      <React.Fragment>
         <h3>{message}</h3>
         <button
            onClick={() => setStatus('closed')}
            className='modal__close'
         >
            &times;
         </button>
      </React.Fragment>,
      elRef.current
   )
}

export default Modal
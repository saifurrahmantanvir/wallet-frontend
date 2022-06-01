import { IconTransIn, IconTransOut } from '../icons/Icons'

type StatsItemProps = {
   movement: number
}

const StatsItem = function ({ movement }: StatsItemProps) {
   return (
      <div className='stats__item'>
         {
            movement > 0 ? <IconTransIn /> : <IconTransOut />
         }
         <p className='stats__type'>{movement > 0 ? 'Deposit' : 'Withdrawn'}</p>
         <p>20 - 3 - 2020</p>
         <span>{movement}<span style={{ fontFamily: 'Molengo' }}>$</span></span>
      </div>
   )
}

export default StatsItem
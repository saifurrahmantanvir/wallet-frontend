import { IconTransIn, IconTransOut } from '../icons/Icons'

type RecentTransectionProps = {
   movement: number
}

const RecentTransection = function ({ movement }: RecentTransectionProps) {
   return (
      <div className='recent__transection'>
         {
            movement > 0 ? <IconTransIn /> : <IconTransOut />
         }
         <div>
            <span data-testid='movement'>{movement} <span className='doller doller-3'>$</span></span>
            <p>10 - 2 - 2022</p>
         </div>
      </div>
   )
}

export default RecentTransection
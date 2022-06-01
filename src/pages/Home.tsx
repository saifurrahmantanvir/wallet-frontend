import '../sass/home.scss'

import {
   Balance,
   Account,
   Graph,
   RecentTransection
} from '../components'

import useMovements from '../hooks/useMovements';

const Home = () => {
   const movementsData = useMovements()
   const movements = movementsData.map(moves => moves.movement)

   const graphData = movements.map(mov => ({ movement: mov }));
   const recentMovements = movements.slice(-4).reverse();

   return (
      <div className="home">
         <Account movements={movements} />

         <Balance movements={movements} />

         <Graph graphData={graphData} styleClass='home__graph'
            width={500} height={200} />

         <div className='recent'>
            <h2 className='recent__label'>Recent History</h2>
            {
               recentMovements.map((movement, i) => (
                  <RecentTransection key={i} movement={movement} />  /* need a small change */

               ))
            }
         </div>
      </div>
   );
};

export default Home;
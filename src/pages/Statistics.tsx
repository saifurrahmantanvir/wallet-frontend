import '../sass/statistics.scss'

import { Graph, StatsItem } from '../components';
import useMovements from '../hooks/useMovements';

const Statistics = () => {
   const movementsData = useMovements()
   const movements = movementsData.map(moves => moves.movement)

   const graphData = movements.map(mov => ({ movement: mov }));
   const movementsHistory = [...movements].reverse();

   return (
      <div className="stats">
         <h1 className="stats__heading">Your transection statistics</h1>

         <Graph graphData={graphData} styleClass='stats__graph'
            width={650} height={300} />

         <div className='stats__list'>
            {
               movementsHistory.map((movement, i) => (
                  <StatsItem key={i} movement={movement} />   /* need a small change */

               ))
            }
         </div>
      </div>
   );
};



export default Statistics;
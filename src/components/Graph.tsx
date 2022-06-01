import React from 'react'
import '../sass/graph.scss'

import {
   ResponsiveContainer,
   Line,
   LineChart,
   Tooltip
} from 'recharts';

type GraphProps = {
   graphData: {
      movement: number
   }[]
   styleClass: string
   width: number
   height: number
}

const Graph = function ({ graphData, styleClass }: GraphProps) {
   const [height, setHeight] = React.useState(220)
   const [stroke, setStroke] = React.useState(3)

   React.useEffect(() => {
      let isMounted = true

      if (window.innerWidth < 928 && isMounted) {
         setHeight(180)
      }

      if (window.innerWidth < 688 && isMounted) {
         setHeight(160)
         setStroke(2.5)
      }

      if (window.innerWidth < 530 && isMounted) {
         setHeight(130)
      }

      return () => {
         isMounted = false
      }
   }, [height, stroke])

   return (
      <div className={`graph ${styleClass}`}>
         <ResponsiveContainer width='93%' height={height}>

            <LineChart data={graphData}>
               <Tooltip />
               <Line type="monotone" dataKey='movement' stroke="#292D32" strokeWidth={stroke} />
            </LineChart>

         </ResponsiveContainer>
         <h2 className='graph__label'>Transection Graph</h2>
      </div>
   );
};

export default Graph;
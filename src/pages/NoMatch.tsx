import React from "react";
import { useNavigate } from "react-router-dom";

import '../sass/noMatch.scss'
import NoMatchSvg from "../icons/NoMatchSvg";

const NoMatch = () => {
   const navigate = useNavigate();
   const [timer, setTimer] = React.useState(10);

   React.useEffect(() => {
      const interval = setInterval(() => setTimer(prevTimer => prevTimer - 1), 1000)

      setTimeout(() => navigate('/'), 10000)

      return () => {
         clearInterval(interval);
      }
   })

   return (
      <div className="no-match">
         <NoMatchSvg />

         <h2 className="no-match__text">
            Page not found. You will be redirected to the home page within {timer} seconds.
         </h2>
         <button onClick={() => navigate('/')}>Go To Home</button>
      </div>
   );
};

export default NoMatch;
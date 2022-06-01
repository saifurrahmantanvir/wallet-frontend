import { useSelector } from "react-redux"
import { ReduxStateType } from "../global.types"

const useMovements = () => {
   const { movements } = useSelector((state: ReduxStateType) =>
      state.movements
   )

   return movements
}

export default useMovements
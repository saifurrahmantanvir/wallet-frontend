import { useSelector } from "react-redux"
import { ReduxStateType } from "../global.types"

const useUser = () => {
   const { user, status } = useSelector((state: ReduxStateType) =>
      state.user
   )

   return { user, status }
}

export default useUser
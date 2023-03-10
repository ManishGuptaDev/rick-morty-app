import { Navigate, Outlet, To } from 'react-router-dom'
import { useAppSelector } from 'store/hooks'
import toast from 'react-hot-toast'

interface Props {
  redirectPath?: To
}

const ProtectedRoute: React.FC<Props> = ({ redirectPath = '/' }) => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

  if (!isLoggedIn) {
    toast.error('Please login first!')
    return <Navigate to={redirectPath} replace />
  }

  return <Outlet />
}

export default ProtectedRoute

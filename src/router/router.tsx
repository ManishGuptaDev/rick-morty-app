import { Routes, Route } from 'react-router-dom'
import { Home, Characters, Episodes } from 'pages/index'
import { Layout } from 'layouts'
import ProtectedRoute from './ProtectedRoute'

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path='characters' element={<Characters />} />
          <Route path='episodes' element={<Episodes />} />
        </Route>
        <Route path='*' element={<div>not found - 404</div>} />
      </Route>
    </Routes>
  )
}

export default Router

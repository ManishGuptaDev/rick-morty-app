import { Routes, Route } from "react-router-dom";
import { Home } from "pages/index";
import { Layout } from 'layouts'

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<div>not found - 404</div>} />        
      </Route>
    </Routes>
  );
};

export default Router;

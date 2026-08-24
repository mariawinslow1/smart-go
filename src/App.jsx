import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Method from './pages/Method';
import Cases from './pages/Cases';
import FreeAudit from './pages/FreeAudit';
import Privacy from './pages/Privacy';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="method" element={<Method />} />
          <Route path="cases" element={<Cases />} />
          <Route path="free-audit" element={<FreeAudit />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
}

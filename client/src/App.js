import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import Default from './Components/defaut';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Layout = route.isShowHeader ? Default : Fragment;
            return (
              <Route key={route.path} path={route.path} element={
                  <Layout>
                  </Layout>
              } />
            );
          })}
        </Routes>
      </Router>


      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            return (
              <Route key={route.path} path={route.path} element={
                  <Page />
              } />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

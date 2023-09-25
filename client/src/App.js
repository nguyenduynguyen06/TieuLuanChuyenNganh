import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import Default from './Components/defaut';
import Footer from './Components/Footer/footer';



function App() {
  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Layout = route.isShowHeader ? Default : Fragment;
            const Page = route.page;
            return (
              <Route key={route.path} path={route.path} element={
                  <>
                  <Layout/>
            <Page/>
            <Footer/>
                </>
              } />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

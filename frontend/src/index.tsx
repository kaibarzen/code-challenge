import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/antd.dark.css';
import './index.sass';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './containers/Layout';
import Search from './containers/Search';
import CenterMatrixContextProvider from './components/hocs/CenterMatrixContextProvider';
import CenterMatrixForm from './components/centerMatrix/CenterMatrixForm';
import CenterMatrixBarrier from './components/centerMatrix/CenterMatrixBarrier';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <Search />
        <Routes>
          <Route
            element={
              <CenterMatrixContextProvider>
                <CenterMatrixBarrier>
                  <CenterMatrixForm />
                </CenterMatrixBarrier>
              </CenterMatrixContextProvider>
            }
            path={'/center-matrix/:id'}
          />
          <Route
            element={<div>create new</div>}
            path={'/center-matrix'}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>,
);

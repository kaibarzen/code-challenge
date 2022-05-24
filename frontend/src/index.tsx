import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/antd.dark.css';
import './index.sass';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './containers/Layout';
import CenterMatrixContextProvider from './components/hocs/CenterMatrixContextProvider';
import CenterMatrixForm from './components/centerMatrix/CenterMatrixForm';
import CenterMatrixBarrier from './components/centerMatrix/CenterMatrixBarrier';
import SearchBar from './components/search/SearchBar';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <SearchBar />
        <Routes>
          <Route
            path={'/center-matrix/new'}
            element={
              <CenterMatrixContextProvider>
                <CenterMatrixBarrier>
                  <CenterMatrixForm />
                </CenterMatrixBarrier>
              </CenterMatrixContextProvider>
            }
          />
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
        </Routes>
      </Layout>
    </BrowserRouter>
  </React.StrictMode>,
);

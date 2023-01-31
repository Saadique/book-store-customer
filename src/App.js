import React from 'react';
import { CssBaseline } from '@material-ui/core';
import Products from './components/Products/Products';
import ProductView from './components/ProductView/ProductView';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


const App = () => {


  return (
    <div>

      <Router>
        <div style={{ display: 'flex' }}>
          <CssBaseline />
          <Switch>
            <Route exact path="/">
              <Products />
            </Route>
            <Route path="/product-view/:id" exact>
              <ProductView />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;

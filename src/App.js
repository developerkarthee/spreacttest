import React, { useState } from 'react';
import logo from './logo.svg';
import Apicontext from './service/Apicontext';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, withRouter, Route, Redirect, useHistory, Link } from 'react-router-dom';

function App(props) {

  const history = useHistory();

  const [pageIndex, setpageIndex] = useState(null);

  const btnPrevClick = () => {

    let newIndex = parseInt(pageIndex) - 1
    if (newIndex <= 0) {
      newIndex = 1;
    }
    history.push("/" + newIndex);
    setpageIndex(newIndex);
  };
  const btnNextClick = () => {
    let newIndex = parseInt(pageIndex) + 1
    if (newIndex >= 20) {
      newIndex = 20;
    }
    history.push("/" + newIndex);
    setpageIndex(newIndex);

  };



  const valueFromChild = (test) => {

    setpageIndex(parseInt(test));

  }




  return (

    <div className="App">

      <header className="App-header">
        Sapient Test
      </header>
      {/* <Home></Home> */}

      <Route exact path="/" render={() => (<Redirect to="/1" />)} />
      <Route path="/:id" render={(props) => {
        return <Home {...props} pageIndex={pageIndex} passParent={valueFromChild} />;
      }} />

      <footer className="footer-section">
        <button disabled={pageIndex <= 1} className="btn btn-nav" onClick={btnPrevClick}>Prev</button> &nbsp;<span className="pipe-line"> &#124;</span> &nbsp;
        <button disabled={pageIndex >= 20} className="btn btn-nav" onClick={btnNextClick}>Next</button>
      </footer>
      <hr className="line-brk">
      </hr>
    </div>

  );
}

export default App;

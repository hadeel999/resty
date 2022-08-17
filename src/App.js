import React, { useState, useEffect, useReducer } from 'react';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Form from './components/form/form';
import Results from './components/results/results';
import historyReducer, { clearAction, addAction } from './components/Reducer';
import './app.scss'

const initialState = {
  methodUrl: [],
  results: [],
};

function App() {

  const [result, setResult] = useState();
  const [method, setMethod] = useState();
  const [headers, setHeader] = useState();
  const [body, setBody] = useState();
  const [loading, setLoad] = useState(false);
  const [state, dispatch] = useReducer(historyReducer, initialState);
  const [error, setError] = useState('');

  function updateBody(e) {
    setBody(e.target.value);
  }

  function updateMethod(e) {
    setMethod(e.target.value);
  }
  
  async function onSubmit(url) {
    setLoad(true);
    let headerObject = {};
    let response;
    let data;
    if (method === 'get') {
      try {
        response = await fetch(url, {});
        data = await response.json();
      } catch (err) {
        throw err;
      }
    }
    if (method === 'post') {
      try {
        response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: body,
        });
        data = await response.json();
      } catch (e) {
        console.log(e);
      }
    }
    if (method === 'put') {
      response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });
    }
    if (method === 'delete') {
      response = await fetch(url, {
        method: 'DELETE',
      });
    }

    const headers = await response.headers.entries();
    for (let pairs of headers) {
      headerObject[pairs[0]] = pairs[1];
    }
    if (method) {
      setResult(data);
      setHeader(headerObject);
      dispatch(addAction({ method: method, url: url, results: data || error }));
    } else {
      setResult('please select method');
    }
    setLoad(false);
  }

  function handleClear(e) {
    e.preventDefault();
    dispatch(clearAction());
  }

  useEffect(() => {
    setError('');
  }, [result]);

  function handleClick(e) {
    for (let i = 0; i < state.methodUrl.length; i++) {
      if (state.methodUrl[i] === e.target.innerText) {
        setResult(state.results[i]);
        setHeader('');
      }
    }
  }

  const clearData = new Promise((resolve) => {
    setTimeout(resolve, 20000);
  });

    return (
      <>
      <React.Fragment>
        <Header />
        <br></br>
        <div className='flex'>
        <Form onSubmit={onSubmit} updateMethod={updateMethod} updateBody={updateBody} />
        <Results method={method || ''} url={result || ''} headers={headers || ''} loading={loading}  history={state} handleClear={handleClear} error={error} handleClick={handleClick} />
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Footer />
      </React.Fragment>
      </>
    );
}

export default App;

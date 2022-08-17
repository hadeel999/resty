import JSONPretty from 'react-json-pretty';
import './results.scss';

function Results(props) {
  let results = props.url;
  let methodUrl = props.history.methodUrl;
  if (!props.loading) {
    return (
      <>
      <div id='all' data-testid='results'>
      <div id='history'>
          <button onClick={props.handleClear}>clear History</button>
          <h2 id='headers-h'>{methodUrl[0] ? 'History' : ''}</h2>
          <ul>
            {methodUrl.map((history, indx) => {
              return (
                <li
                  className='history-list'
                  key={indx}
                  name={history}
                  onClick={props.handleClick}
                >
                  {history}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h2 id='headers'>{props.headers ? 'Headers' : ''}</h2>
          <JSONPretty id='json-pretty' data={props.headers}></JSONPretty>
          <h2 id='results'>{results || props.error ? 'Results' : ''}</h2>
          <div id='results-json'>
            <JSONPretty
              id='json-pretty'
              data={props.error ? props.error : results}
            ></JSONPretty>
          </div>
        </div>
        </div>
      </>
    );
  } else {
    return <h3>Loading....</h3>;
  }
}

export default Results;

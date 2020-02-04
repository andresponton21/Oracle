import React from 'react';
import './App.css';
import Web3 from 'web3';
import { STOCK_ORACLE_ABI, STOCK_ORACLE_ADDRESS } from './quotecontract'


class App extends React.Component {

 
  constructor(props) {

      super(props);

      this.state = {
          items: [],
          isLoaded: false
      }

  }

  
  componentDidMount() {

    fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=71EBIKKDUVSFZU8P')
    .then(res => res.json())
    .then((data) => {
      this.setState({ quote: data["Global Quote"] })
    })
    .catch(console.log)


  }

 
  render() {

      const { isLoaded, items } = this.state;

      if (!isLoaded)
          return <div>Loading...</div>;

      return (
          <div className="App">
              <ul>
                  {items.map(item => (
                      <li key={item.id}>
                          Name: {item.name} | Email: {item.email}
                      </li>
                  ))}
              </ul>
          </div>
      );

  }

}

export default App;

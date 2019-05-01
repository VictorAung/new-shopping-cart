import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;

// class App extends React.Component {
//   state = {
//     products = []
//   }
//
//   componentDidMount() {
//     this.mounted = true;
//
//     fetch('/products.json').then(result => JSON.parse(result)).then(res_json => {
//       if (!this.mounted) return;
//
//       const { products: products_obj } = res.json;
//       const proucts = Object.values{products_obj};
//
//       this.setState({
//         products: products
//       });
//
//     });
//   }
//
//
//   componentWillUmount() {
//     this.mounted = false;
//   }
//
//   render() {
//     const { products } = this.state;
//
//     return (
//       <div className="App">
//         {products.map{product => (
//           <div key={product.sku}>{product.title}</div>
//
//         ))}</div>
//       }
//
//   }
// }

function returnTitle(x) {
  return (
    <div>{x.title}</div>
  )
}

const App = () => {

  const [productsObj, setProductsObj] = useState({products: {}});
  const url = '/data/products.json';

  useEffect(() => {
    const fetchProductsObj = async () => {
      const response = await fetch(url);
      if (!response.ok) throw response;
      const json = await response.json();
      setProductsObj(json);
    }
    fetchProductsObj();
  }, [])

  const productsArray = Object.values(productsObj.products);

  return (
    <section>
      <div className="container menu">
        {productsArray.map(returnTitle)}
      </div>
    </section>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
// import './App.css';
import { withStyles, Drawer, Fab } from '@material-ui/core';
import { ShoppingCart as CartIcon } from '@material-ui/icons';
import {Typography} from '@material-ui/core';
import ProductCard from './ProductCard';
import CartCard from './CartCard';
import Button from '@material-ui/core/Button';


//css needs to be in camel case format
const styles = {
  allItems: {
    display: 'flex',
    textAlign: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  cartIcon: {
   position: 'fixed',
   right: 40,
   bottom: 40,
 },
  totalPrice: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
  total: {
    display: 'flex',
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexGrow: 1,
    paddingBottom: '10px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  checkoutBtn: {
    display: 'block',
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '10px',
  },
};

// function returnTitle(x) {
//   return (
//     <Card className={classes.card}>
//       <Typography variant="h5" component="h2">
//       {x.title}
//       </Typography>
//       <CardActions>
//          <Button size="small">Learn More</Button>
//        </CardActions>
//     </Card>
//   )
// }

const App = ( {classes} ) => {

  const [productsObj, setProductsObj] = useState({products: {}});
  const url = '/data/products.json';
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [inventory, setInventory] = useState({inventory: {}});

  useEffect(() => {
    const fetchProductsObj = async () => {
      const response = await fetch(url);
      if (!response.ok) throw response;
      const json = await response.json();
      setProductsObj(json);
    }
    fetchProductsObj();
  }, [])

  useEffect(() => {
    fetch("/inventory.json").then(result => result.json()).then(res_json => {
    setInventory(res_json);
    });
  }, []);

  const productsArray = Object.values(productsObj.products);

  const addToCart = (sku, size, timestamp) => {
   setCart([...cart, [sku, size, timestamp]]);
   toggleCart();
   };

  const removeFromCart = timestamp => {
   setCart(cart.filter(item => item[2] !== timestamp));
    }

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  }

  const format = price => (price.toFixed(2));

const totalPrice = productsArray.length === 0
  ? 0
  : cart.map(sku => productsArray.filter(product => product.sku === sku[0])[0].price).reduce((t, n) => (t + n), 0);

console.log(productsArray)
  return (
    <div className={classes.app}>
      <Drawer className={classes.cart} open={cartOpen} onClose={toggleCart} anchor="right">
        <div className={classes.cart}>
         {cart.map(item =>
           <CartCard key={item[2]} timestamp={item[2]} sku={item[0]} products={productsArray} size={item[1]} remove={removeFromCart} />)}
          </div>
       <div className={classes.totalPrice}>
        <div className={classes.total}>

         <Typography variant="h4">
           Total:
         </Typography>

         <Typography variant="h4">
           ${format(totalPrice)}

         </Typography>

        </div>
         <Button variant="contained" size="large" color="primary" className={classes.checkoutBtn}>
            Checkout
        </Button>
       </div>
      </Drawer>

      <Fab className={classes.cartIcon} color="primary" onClick={toggleCart}>
        <CartIcon/>
      </Fab>



    <section>
      <div className={classes.allItems}>
        {productsArray.map(product => (
             <ProductCard key={product.sku} title={product.title}
             description={product.description} sku={product.sku}
             price={product.price} add={addToCart} inventory={inventory.inventory[product.sku + ""]}
             inCart={cart.filter(item => item[0] === product.sku)} />
        ))}
      </div>
    </section>
  </div>
  );
};

export default withStyles(styles)(App);

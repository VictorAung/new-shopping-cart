import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
// import './App.css';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import ProductCard from './ProductCard';


//css needs to be in camel case format
const styles = {
  allItems: {
    display: 'flex',
    textAlign: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center'
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

console.log(productsArray)
  return (

    <section>
      <div className={classes.allItems}>
        {productsArray.map(product => (
             <ProductCard key={product.sku} title={product.title} description={product.description} sku={product.sku} price={product.price} />
        ))}
      </div>
    </section>
  );
};

export default withStyles(styles)(App);

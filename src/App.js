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

//css needs to be in camel case format
const styles = {
  allItems: {
    display: 'flex',
    textAlign: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  card: {
    width: '20%',
    margin: '3%',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  media: {
    marginBottom: '5%',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  actions: {
        justifyContent: 'space-between'
    },
    price: {
       paddingLeft: 12
   },
   cardActionArea: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      flexGrow: 1,
      paddingBottom: 0
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
  const format = price => ("$" + price.toFixed(2));

console.log(productsArray)
  return (

    <section>
      <div className={classes.allItems}>


        {productsArray.map(x => (
          <Card className={classes.card}>
            <CardActionArea className={classes.cardActionArea}>
              <CardMedia
              component= "img"
              className={classes.media}
              image={`/photos/${x.sku}_1.jpg`}
              title="Product Image"
            />
              <Typography gutterBottom variant="h6" color="textPrimary">
              {x.title}

              </Typography>
              <Typography component="p" color="textSecondary">
              {x.description}
                </Typography>
            </CardActionArea>
            <CardActions className={classes.actions}>
               <Typography className={classes.price} variant="subtitle1">
                    {format(x.price)}
               </Typography>
               <Button size="small">Add to Cart</Button>
             </CardActions>
           </Card>)
        )}



      </div>
    </section>
  );
};

export default withStyles(styles)(App);

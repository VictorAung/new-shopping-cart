import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
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

const styles = {
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
    radioGroup: {
      marginLeft: '5%',
      marginRight: '5%',
      display: 'flex',

      justifyContent: 'space-between',
    },
};


const format = price => (price.toFixed(2));


const returnInventory = (inventory, cart, size) => {
    if (typeof(inventory) === "undefined")
        return false;
    const filteredCart = cart.filter(item => item[1] === size).length;
    console.log(inventory, cart);
    return inventory[size] - filteredCart > 0;
}

const ProductCard = ({ sku, title, description, classes, price, add: addToCart, inventory, inCart}) => {
    let [size, setSize] = useState("");

    const addTimestamp = (sku, size) => {
           addToCart(sku, size, new Date().getTime());
       }

    if (size !== "" && !returnInventory(inventory, inCart, size))
        setSize("");

    return (
    <Card className={classes.card}>
      <CardActionArea className={classes.cardActionArea}>
        <CardMedia
        component= "img"
        className={classes.media}
        image={`/photos/${sku}_1.jpg`}
        title="Product Image"
      />
        <Typography gutterBottom variant="h6" color="textPrimary">
        {title}

        </Typography>
        <Typography component="p" color="textSecondary">
        {description}
          </Typography>
      </CardActionArea>

      <RadioGroup row className={classes.radioGroup}>
          <FormControlLabel className={classes.formlabel} disabled={!returnInventory(inventory, inCart, "S")} label="S" value="S" labelPlacement="top" control={<Radio color="primary" />} />
          <FormControlLabel className={classes.formlabel} disabled={!returnInventory(inventory, inCart, "M")} label="M" value="M" labelPlacement="top" control={<Radio color="primary" />} />
          <FormControlLabel className={classes.formlabel} disabled={!returnInventory(inventory, inCart, "L")} label="L" value="L" labelPlacement="top" control={<Radio color="primary" />} />
          <FormControlLabel className={classes.formlabel} disabled={!returnInventory(inventory, inCart, "XL")} label="XL" value="XL" labelPlacement="top" control={<Radio color="primary" />} />
      </RadioGroup>


      <CardActions className={classes.actions}>
         <Typography className={classes.price} variant="subtitle1">
              ${format(price)}
         </Typography>
         <Button size="small" color="primary" 
            onClick={addTimestamp.bind(null, sku, size)}>Add to Cart</Button>
       </CardActions>
     </Card>)
};

export default withStyles(styles)(ProductCard);

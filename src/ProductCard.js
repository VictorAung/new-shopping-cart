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

const ProductCard = ({ sku, title, description, classes, price, add: addToCart}) => {
    let [size, setSize] = useState("small");

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
          <FormControlLabel className={classes.formlabel}  label="S" value="S" labelPlacement="top" control={<Radio color="primary" />} />
          <FormControlLabel className={classes.formlabel} label="M" value="M" labelPlacement="top" control={<Radio color="primary" />} />
          <FormControlLabel className={classes.formlabel} label="L" value="L" labelPlacement="top" control={<Radio color="primary" />} />
          <FormControlLabel className={classes.formlabel} label="XL" value="XL" labelPlacement="top" control={<Radio color="primary" />} />
      </RadioGroup>


      <CardActions className={classes.actions}>
         <Typography className={classes.price} variant="subtitle1">
              ${format(price)}
         </Typography>
         <Button size="small" color="primary" onClick={addToCart.bind(null, sku, size)}>Add to Cart</Button>
       </CardActions>
     </Card>)
};

export default withStyles(styles)(ProductCard);

import React from 'react';
import { withStyles, Typography, IconButton } from '@material-ui/core';
import { Clear as ClearIcon } from '@material-ui/icons';

const styles = {
    clearDiv: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'left',
        padding: '0 8px'
    },
    productListing: {
        display: 'flex',
        padding: '10px',
        borderBottom: '1px solid black',
    },
    productPhoto: {
        height: '200px'
    },
    productInfo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'left',
    },
    priceDiv: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'left',
        padding: '0 8px 0 0',

    },
    size: {
      textTransform: 'capitalize',
    },
};
const format = price => (price.toFixed(2));

const ProductListing = ({ sku, size, products, classes, remove }) => {
    if (products.length === 0)
        return "";

    const product = products.filter(product => product.sku === sku)[0];

    return (
        <div className={classes.productListing}>
            <img className={classes.productPhoto} src={`/photos/${sku}_1.jpg`} />
            <div className={classes.productInfo}>
                <Typography variant="h6">
                    {product.title}
                </Typography>
                <Typography variant="subtitle1" className={classes.size}>
                    {size}
                </Typography>
            </div>
            <div className={classes.clearDiv}>
                <IconButton onClick={remove}>
                    <ClearIcon />
                </IconButton>
            </div>
            <div className={classes.priceDiv}>
                <Typography>
                    ${format(product.price)}

                </Typography>
            </div>
        </div>
    );
};

export default withStyles(styles)(ProductListing);

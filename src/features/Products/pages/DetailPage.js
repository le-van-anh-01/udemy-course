import { Box, Container, Grid, LinearProgress, makeStyles, Paper } from '@material-ui/core';
import { addToCart } from 'features/Cart/cartSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router';
import AddToCartForm from '../components/AddToCartForm';
import ProductAdditional from '../components/ProductAdditional';
import ProductDescription from '../components/ProductDescription';
import ProductInfo from '../components/ProductInfo';
import ProductMenu from '../components/ProductMenu';
import ProductReviews from '../components/ProductReviews';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductDetail from '../hooks/useProductDetail';


const useStyles = makeStyles(theme => ({
    root: {},
    left: {
        width: '400px',
        padding: theme.spacing(1.5),
        borderRight: `1px solid ${theme.palette.grey[300]}`

    },
    right: {
        flex: '1 1 0',
        padding: theme.spacing(1.5),
    },

    loading: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
    }
}))


function DetailPage(props) {
    const classes = useStyles();
    const { params: { productId }, url } = useRouteMatch();
    const { product, loading } = useProductDetail(productId);
    const dispatch = useDispatch()

    const handleAddToCardSubmit = ({ quantity }) => {
        const action = addToCart({
            id: product.id,
            product,
            quantity: quantity
        });
        dispatch(action);
    }


    if (loading) {
        return (<Box>
            <LinearProgress />
        </Box>)
    }

    return (
        <Box className={classes.root}>
            <Container>
                <Paper elevation={0}>
                    <Grid container>
                        <Grid item className={classes.left}>
                            <ProductThumbnail product={product} />
                        </Grid>
                        <Grid item className={classes.right}>
                            <ProductInfo product={product} />
                            <AddToCartForm onSubmit={handleAddToCardSubmit} />
                        </Grid>
                    </Grid>
                </Paper>
                <ProductMenu />
                <Switch>
                    <Route exact path={url}>
                        <ProductDescription product={product} />
                    </Route>

                    <Route path={`${url}/additional`}>
                        <ProductAdditional product={product} />
                    </Route>

                    <Route path={`${url}/reviews`}>
                        <ProductReviews product={product} />
                    </Route>
                </Switch>
            </Container>
        </Box>
    )
}

export default DetailPage


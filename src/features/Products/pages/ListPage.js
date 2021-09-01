import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import productApi from 'api/productApi';
import React, { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
import Pagination from '@material-ui/lab/Pagination';
import ProductSort from '../components/ProductSort';
import ProductFilter from '../components/ProductFilter';

const useStyles = makeStyles(theme => ({
    root: {},
    left: {
        width: '250px'
    },
    right: {
        flex: '1 1 0',
    },
    pagination: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',

        marginTop: '20px',
        paddingBottom: '20px',
    }
}))

const ListPage = () => {
    const classes = useStyles();
    const [productList, setProductList] = useState([]);
    const [paginationDisp, setPaginationDisp] = useState({
        total: 10,
        page: 1,
        limit: 10
    })
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        _page: 1,
        _limit: 10,
        _sort: 'salePrice:ASC',
    })



    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true);
                const { data, pagination } = await productApi.getAll(filters);
                setProductList(data);
                setPaginationDisp(pagination);
            } catch (error) {
                console.log('Failed to fetch product list', error);
            }
            setLoading(false);
        }
        getProducts();
        return;
    }, [filters])

    const handlePageChange = (e, page) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            _page: page
        }))
    }

    const handleSortChange = (newSortValue) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            _sort: newSortValue
        }))
    }
    const handleFilterChange = (newFilters) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            ...newFilters
        }))
    }

    return (
        <Box>
            <Container>
                <Grid container spacing={1}>
                    <Grid item className={classes.left}>
                        <Paper elevation={0}>
                            <ProductFilter filters={filters} onChange={handleFilterChange} />
                        </Paper>
                    </Grid>

                    <Grid item className={classes.right}>
                        <Paper elevation={0}>
                            <ProductSort currentSort={filters._sort} onChange={handleSortChange} />
                            {loading ? <ProductSkeletonList /> : <ProductList data={productList} />}
                            <Box className={classes.pagination}>
                                <Pagination color="primary"
                                    count={Math.ceil(paginationDisp.total / paginationDisp.limit)}
                                    page={paginationDisp.page}
                                    onChange={handlePageChange}
                                />
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}


export default ListPage;

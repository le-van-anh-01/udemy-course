import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import productApi from 'api/productApi';
import React, { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
import Pagination from '@material-ui/lab/Pagination';
import ProductSort from '../components/ProductSort';
import ProductFilter from '../components/ProductFilter';
import FilterViewer from '../components/Filters/FilterViewer';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useMemo } from 'react';

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
    const history = useHistory();
    const location = useLocation();
    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search);
        return {
            ...params,
            _page: Number.parseInt(params._page) || 1,
            _limit: Number.parseInt(params._limit) || 10,
            _sort: params._sort || 'salePrice:ASC',
            isPromotion: params.isPromotion === "true",
            isFreeShip: params.isFreeShip === "true",

        }

    }, [location.search]);
    const [productList, setProductList] = useState([]);
    const [paginationDisp, setPaginationDisp] = useState({
        total: 10,
        page: 1,
        limit: 10
    })
    const [loading, setLoading] = useState(true);
    // const [filters, setFilters] = useState({
    //     ...queryParams,
    //     _page: Number.parseInt(queryParams._page) || 1,
    //     _limit: Number.parseInt(queryParams._limit) || 10,
    //     _sort: queryParams._sort || 'salePrice:ASC',
    // })

    // useEffect(() => {
    //     history.push({
    //         pathname: history.location.pathname,
    //         search: queryString.stringify(filters),
    //     })
    //     return;
    // }, [history, filters]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true);
                const { data, pagination } = await productApi.getAll(queryParams);
                setProductList(data);
                setPaginationDisp(pagination);
            } catch (error) {
                console.log('Failed to fetch product list', error);
            }
            setLoading(false);
        }
        getProducts();
        return;
    }, [queryParams])

    const handlePageChange = (e, page) => {
        // setFilters((prevFilters) => ({
        //     ...prevFilters,
        //     _page: page
        // }))
        const filters = {
            ...queryParams,
            _page: page,
        }

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters),
        })
    }

    const handleSortChange = (newSortValue) => {
        // setFilters((prevFilters) => ({
        //     ...prevFilters,
        //     _sort: newSortValue
        // }))
        const filters = {
            ...queryParams,
            _sort: newSortValue,
        }

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters),
        })
    }

    const handleFilterChange = (newFilters) => {
        // setFilters((prevFilters) => ({
        //     ...prevFilters,
        //     ...newFilters
        // }))
        const filters = {
            ...queryParams,
            ...newFilters
        }

        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(filters),
        })
    }

    const setNewFilters = (newFilters) => {
        // setFilters(newFilters)
        history.push({
            pathname: history.location.pathname,
            search: queryString.stringify(newFilters),
        })
    }

    return (
        <Box>
            <Container>
                <Grid container spacing={1}>
                    <Grid item className={classes.left}>
                        <Paper elevation={0}>
                            <ProductFilter filters={queryParams} onChange={handleFilterChange} />
                        </Paper>
                    </Grid>

                    <Grid item className={classes.right}>
                        <Paper elevation={0}>
                            <ProductSort currentSort={queryParams._sort} onChange={handleSortChange} />
                            <FilterViewer filters={queryParams} onChange={setNewFilters} />
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

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import categoryApi from 'api/categoryApi';


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },

    menu: {
        padding: '0',
        margin: '0',
        listStyleType: 'none',
        '& > li': {
            marginTop: theme.spacing(1),
            transition: 'all 0.25s',

            '&:hover': {
                color: theme.palette.primary.dark,
                cursor: 'pointer'
            }
        }

    }
}))


function FilterByCategory({ onChange }) {
    const classes = useStyles();
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const list = await categoryApi.getAll({});
                setCategoryList(list.map(x => ({
                    id: x.id,
                    name: x.name
                })))
            } catch (error) {
                console.log('Failed to fetch category list', error);
            }
        }
        getCategories();
        return;
    }, [])

    const handleCategoryClick = (category) => {
        if (!onChange) return;
        onChange({ 'category.id': category.id });
    }

    return (
        <Box className={classes.root}>
            <Typography variant='subtitle2'>種類</Typography>
            <ul className={classes.menu}>
                {categoryList.map(category => (<li key={category.id} onClick={() => handleCategoryClick(category)}>
                    <Typography variant='body2'>{category.name}</Typography>
                </li>))}
            </ul>
        </Box>
    )
}

FilterByCategory.propTypes = {
    onChange: PropTypes.func,
}

export default FilterByCategory


import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@material-ui/core';


const ProductSort = ({ currentSort, onChange }) => {

    const handleSortChange = (event, newValue) => {
        if (onChange) onChange(newValue);
    }
    return (
        <Tabs value={currentSort}
            indicatorColor='primary'
            textColor='primary'
            onChange={handleSortChange}
            aria-label='disable tabs example'
        >
            <Tab label='低→高' value='salePrice:ASC'></Tab>
            <Tab label='高→低' value='salePrice:DESC'></Tab>

        </Tabs>
    )
}

ProductSort.propTypes = {
    currentSort: PropTypes.string.isRequired,
    onChange: PropTypes.func,
}

export default ProductSort;

import React from 'react';
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';

const ProductFilter = ({ filters, onChange }) => {

    const handleCategoryChange = (newCategoryId) => {
        if (!onChange) return;
        const newFilters = {
            ...filters,
            "category.id": newCategoryId
        };

        onChange(newFilters);
    }
    return (
        <Box>
            <FilterByCategory onChange={handleCategoryChange} />
        </Box>
    )
}

ProductFilter.propTypes = {
    filters: PropTypes.object.isRequired,
    onChange: PropTypes.func,

}

export default ProductFilter

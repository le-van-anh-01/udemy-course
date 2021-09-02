import React from 'react';
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';

const ProductFilter = ({ filters, onChange }) => {

    const handleChange = (newValues) => {
        if (!onChange) return;
        const newFilters = {
            ...newValues
        };

        onChange(newFilters);
    }

    return (
        <Box>
            <FilterByCategory onChange={handleChange} />
            <FilterByPrice onChange={handleChange} />
            <FilterByService filters={filters} onChange={handleChange} />
        </Box>
    )
}

ProductFilter.propTypes = {
    filters: PropTypes.object.isRequired,
    onChange: PropTypes.func,

}

export default ProductFilter

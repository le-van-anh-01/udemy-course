import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { Box, Button, TextField } from '@material-ui/core';

const FilterByPrice = ({ onChange }) => {
    const [values, setValues] = useState({
        salePrice_gte: 0,
        salePrice_lte: 0,
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            name: value
        }))
    }

    const handleSubmit = () => {
        if (onChange) onChange(values);
    }

    return (
        <Box>
            <Box>
                <TextField name='salePrice_gte' value={values.salePrice_gte} onChange={handleChange} />
                <span>-</span>
                <TextField name='salePrice_lte' value={values.salePrice_lte} onChange={handleChange} />
            </Box>
            <Button variant='outlined' color='primary' onClick={handleSubmit}>Filter</Button>
        </Box>
    )
}

FilterByPrice.propTypes = {
    onChange: PropTypes.func,
}

export default FilterByPrice

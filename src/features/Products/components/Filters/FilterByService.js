import React from 'react';
import PropTypes from 'prop-types'
import { Box, Checkbox, FormControlLabel, makeStyles, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        borderTop: `1px solid ${theme.palette.grey[300]}`,

    },
    list: {
        padding: 0,
        margin: 0,
        listStyle: 'none',
        '& > li': {
        }
    }

}))

const FilterByService = ({ filters, onChange }) => {
    const classes = useStyles();

    const handleChange = (e) => {
        if (!onChange) return;
        const { name, checked } = e.target;
        onChange({ [name]: checked })
    }


    return (
        <Box className={classes.root}>
            <Typography variant='subtitle2'>Service</Typography>
            <ul className={classes.list}>
                {[{ value: 'isPromotion', label: '割引' }, { value: 'isFreeShip', label: 'FreeShip' }].map(service => (
                    <li key={service.value}>
                        <FormControlLabel
                            control={
                                <Checkbox checked={filters[service.value] || false}
                                    name={service.value}
                                    color='primary'
                                    onChange={handleChange}
                                />
                            }
                            label={service.label}
                        />
                    </li>
                ))}
            </ul>
        </Box>
    )
}

FilterByService.propTypes = {
    filters: PropTypes.object,
    onChange: PropTypes.func,
}

export default FilterByService

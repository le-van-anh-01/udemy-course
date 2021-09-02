import React from 'react';
import { Box, Chip, makeStyles } from '@material-ui/core';
import { useMemo } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        margin: theme.spacing(2, 0),
        listStyle: 'none',

        '& > li': {
            margin: 0,
            padding: theme.spacing(1),
        }

    },
}))

const FILTER_LIST = [
    {
        id: 1,
        getLabel: () => 'Free Ship',
        isActive: (filters) => filters.isFreeShip,
        isVisible: () => true,
        isRemovable: false,
        onRemove: () => { },
        onToggle: (filters) => {
            const newFilters = { ...filters };
            if (newFilters.isFreeShip) {
                delete newFilters.isFreeShip;
            } else {
                newFilters.isFreeShip = true;
            }

            return newFilters;
        },
    },
    {
        id: 2,
        getLabel: () => '割引',
        isActive: () => true,
        isVisible: (filters) => Object.keys(filters).includes('isPromotion') && filters.isPromotion,
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = { ...filters };
            delete newFilters.isPromotion;
            return newFilters;
        },
        onToggle: () => { },
    },
    {
        id: 3,
        getLabel: (filters) => `From ${filters.salePrice_gte} To ${filters.salePrice_lte}`,
        isActive: (filters) => true,
        isVisible: (filters) => (Object.keys(filters).includes('salePrice_lte') && Object.keys(filters).includes('salePrice_gte')),
        isRemovable: true,
        onRemove: (filters) => {
            const newFilters = { ...filters };
            delete newFilters.salePrice_lte;
            delete newFilters.salePrice_gte;
            return newFilters;
        },
        onToggle: () => { },
    },
    // {
    //     id: 4,
    //     getLabel: (filters) => '種類',
    //     isActive: (filters) => true,
    //     isVisible: (filters) => true,
    //     isRemovable: true,
    //     onRemove: (filters) => { },
    //     onToggle: (filters) => { },
    // },
]

const FilterViewer = ({ filters = {}, onChange = null }) => {
    const classes = useStyles();

    const visiableFilter = useMemo(() => {
        return FILTER_LIST.filter(x => x.isVisible(filters));
    }, [filters])
    return (
        <Box component='ul' className={classes.root}>
            {visiableFilter.map(x => (
                <li key={x.id}>
                    <Chip
                        label={x.getLabel(filters)}
                        color={x.isActive(filters) ? 'primary' : 'default'}
                        clickable={!x.isRemovable}
                        onClick={x.isRemovable ? null : () => {
                            if (!onChange) return;
                            const newFilters = x.onToggle(filters);
                            onChange(newFilters);
                        }}
                        onDelete={x.isRemovable ? () => {
                            if (!onChange) return;
                            const newFilters = x.onRemove(filters);
                            onChange(newFilters);
                        } : null}
                    />
                </li>
            ))}
        </Box>)
}


export default FilterViewer

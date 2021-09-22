
import React from 'react';
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core';
import { THUMBNAIL_PLACEHOLDER, STATIC_HOST } from 'constants/index';

function ProductThumbnail({ product }) {
    const thumbnailUrl = product.thumbnail ? `${STATIC_HOST}${product.thumbnail?.url}` : THUMBNAIL_PLACEHOLDER;
    return (
        <Box>
            <img
                src={thumbnailUrl}
                alt={product.name}
                width='100%'
            />
        </Box>
    )
}

ProductThumbnail.propTypes = {

}

export default ProductThumbnail


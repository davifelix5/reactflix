import React from 'react';
import { LoaderContainer, LoaderElement } from './styles';
import Proptypes from 'prop-types';

function Loader({ withContainer }) {
    return withContainer ? (
        <LoaderContainer>
            <LoaderElement />
        </LoaderContainer>
    ) : <LoaderElement />;
};

Loader.defaultProps = {
    withContainer: true
}

Loader.propTypes = {
    withCotainer: Proptypes.bool
}

export default Loader;

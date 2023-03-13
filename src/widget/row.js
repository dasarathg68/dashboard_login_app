import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export default function Row(props) {
    return (
        <RootLayout {...props}>
            {props.children}
        </RootLayout>
    );
}

Row.propTypes = {
    reverse: PropTypes.bool,
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string,
    borderRadius: PropTypes.string
}

const RootLayout = styled.div`
    box-sizing: border-box;
    width: ${props => props.width};
    height: ${props => props.height};
    display: flex;
    align-items: flex-start;
    flex-direction: ${props => props.reverse ? 'row-reverse' : 'row'};
    background-color: ${props => props.backgroundColor || 'transparent'};
    border-radius: ${props => props.borderRadius || '0px'};
`;
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Button} from '@material-ui/core'

var Color = require('color');

function getDisableColor(color) {
    var c = Color(color);
    return c.darken(0.15).hex();
}

export default function ButtonRound(props) {

    return (() => {
        return (
            <Btn
                disabled={!props.enable}
                variant='contained'
                color='primary'
                width={props.width}
                btncolor={props.btncolor}
                onClick={props.onClick}
                style={props.style}
                className={props.className}>
                {props.children}
            </Btn>
        );
    })();
}

ButtonRound.propTypes = {
    width: PropTypes.string.isRequired,
    btncolor: PropTypes.string.isRequired,
    enable: PropTypes.bool,
}

ButtonRound.defaultProps = {
    enable: true,
}

const Btn = styled(Button)`
  &.MuiButton-root {
    min-width: ${props => props.width};
  }

  &.MuiButton-containedPrimary {
    background-color: ${props => props.btncolor};
  }

  &.MuiButton-containedPrimary:hover {
    background-color: ${props => getDisableColor(props.btncolor)};
  }

  &.MuiButton-contained.Mui-disabled {
    background-color: #c0c0c0;
  }

  height: 50px;
  width: ${props => props.width};
  outline: none;
  font-size: 0.95rem;

  && {
    border-radius: 25px;
  }
`;
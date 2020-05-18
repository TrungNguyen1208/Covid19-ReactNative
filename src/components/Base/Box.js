import styled from 'styled-components';
import {View} from 'react-native';
import {
    compose,
    color,
    size,
    position,
    space,
    flexbox,
    margin,
    border,
    padding,
    shadow,
    background,
    borderRadius,
} from 'styled-system';

const Box = styled(View)(
    compose(
        color,
        size,
        position,
        space,
        flexbox,
        margin,
        border,
        padding,
        shadow,
        background,
        borderRadius,
    ),
);

export default Box;

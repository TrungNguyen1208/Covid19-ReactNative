import Box from './Base/Box';
import React from 'react';
import Text from './Base/Text';
import {Fade, Placeholder, PlaceholderLine} from 'rn-placeholder';

export default function CardInfo({icon, number, subtitle, placeholder}) {
    return (
        <Box
            flex={1}
            height={180}
            borderRadius={12}
            bg='white'
            mb={26}
            width='100%'
            flexDirection='column'
            alignItems='center'
            paddingVertical={20}
            boxShadow='0px 7px 6px #00000008'
        >
            {!placeholder ? (renderViewInfo(icon, number, subtitle)) : (renderPlaceHolder())}
        </Box>
    );
}

function renderViewInfo(icon, number, subtitle) {
    return (
        <Box flex={1} justifyContent='space-around' alignItems='center'>
            <Box>{icon}</Box>
            <Text fontSize={24} color='textDark' fontWeight='bold'>
                {number.toLocaleString()}
            </Text>
            <Text fontSize={16} color='textLight'>
                {subtitle}
            </Text>
        </Box>
    )
}

function renderPlaceHolder() {
    return (
        <Placeholder paddingLeft={20} paddingRight={20} Animation={Fade}>
            <PlaceholderLine width={60}/>
            <PlaceholderLine/>
            <PlaceholderLine/>
            <PlaceholderLine width={30}/>
        </Placeholder>
    );
}

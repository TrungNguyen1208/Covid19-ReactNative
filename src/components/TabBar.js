import React from 'react';
import { View } from 'react-native';
import Button from './Base/Button';
import SvgHome from '../assets/icons/SvgHome';
import SvgSearch from '../assets/icons/SvgSearch';
import Box from './Base/Box';
import theme from '../utils/theme';

function TabBar({ state, descriptors, navigation }) {
    return (
        <View
            style={{
                flexDirection: 'row',
                padding: 10,
            }}
        >
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index;
                const colorIcon = isFocused ? theme.colors.textDark : theme.colors.textLight;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <Button
                        key={label}
                        height={55}
                        flex={1}
                        pt={8}
                        justifyContent='center'
                        alignItems='center'
                        onPress={onPress}
                    >
                        {label === 'Home' && (
                            <SvgHome color={colorIcon} />
                        )}
                        {label === 'Search' && (
                            <SvgSearch color={colorIcon} />
                        )}
                        <Box
                            mt={8}
                            size={5}
                            borderRadius={20}
                            bg={isFocused ? 'textDark' : 'transparent'}
                        />
                    </Button>
                );
            })}
        </View>
    );
}

export default TabBar;

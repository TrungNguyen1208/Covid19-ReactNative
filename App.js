/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from 'styled-components';
import Box from './src/components/Base/Box';
import Theme from './src/utils/theme';
import TabBar from './src/components/TabBar';
import HomeStackScreen from './src/screens/Home';
import SearchStackScreen from './src/screens/Search';

const Tab = createBottomTabNavigator();

const App: () => React$Node = () => {
  return (
      <ThemeProvider theme={Theme}>
        <Box flex={1} as={SafeAreaView}>
          <NavigationContainer>
            <Tab.Navigator
                initialRouteName='Home'
                tabBar={props => <TabBar {...props} />}
            >
              <Tab.Screen name='Home' component={HomeStackScreen} />
              <Tab.Screen name='Search' component={SearchStackScreen} />
            </Tab.Navigator>

          </NavigationContainer>
        </Box>
      </ThemeProvider>
  );
};

export default App;

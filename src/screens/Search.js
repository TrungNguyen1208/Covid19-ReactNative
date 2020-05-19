import React, {
    useEffect,
    useState,
} from 'react';

import {
    ActivityIndicator,
    FlatList,
    Platform,
    StatusBar,
    TextInput,
} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Box from '../components/Base/Box';
import Button from '../components/Base/Button';
import Text from '../components/Base/Text';
import i18n from '../i18n';
import theme from '../utils/theme';

import {SafeAreaView} from 'react-native-safe-area-context';
import Snackbar from 'react-native-snackbar';
import SvgSearch from '../assets/icons/SvgSearch';
import CardCountry from '../components/CardCountry';
import CountryDetail from './CountryDetail';
import ChartCases from './ChartCase';
import ChartDeaths from './ChartDeaths';

const SearchStack = createStackNavigator();

function SearchStackScreen() {
    return (
        <SearchStack.Navigator headerMode='none'>
            <SearchStack.Screen name='Search' component={SearchScreen}/>
            <SearchStack.Screen name='CountryDetail' component={CountryDetail} />
            <SearchStack.Screen name='ChartCases' component={ChartCases} />
            <SearchStack.Screen name='ChartDeaths' component={ChartDeaths} />
        </SearchStack.Navigator>
    );
}

function SearchScreen({navigation}) {
    let [countriesData, setCountriesData] = useState([]);
    let [allData, setAllData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [updatedDate, setUpdatedDate] = useState('');
    const [isClickedSearch, setIsClickedSearch] = useState(false);

    const getSummaryData = async (sort = 'active') => {
        setLoading(true);
        const response = await fetch(
            `https://corona.lmao.ninja/v2/countries?sort=${sort}`,
        );
        const data = await response.json();
        setCountriesData(data);
        setAllData(data);

        const responseUpdate = await fetch('https://corona.lmao.ninja/v2/all');
        const dataUpdate = await responseUpdate.json();
        const lastDate = new Date(dataUpdate.updated).toLocaleTimeString();
        setUpdatedDate(lastDate);

        setLoading(false);
    };

    useEffect(() => {
        getSummaryData();
    }, []);

    useEffect(() => {
        if (isClickedSearch && this.inputSearch) {
            this.inputSearch.focus();
        }
    }, [isClickedSearch]);

    useFocusEffect(
        React.useCallback(() => {
            StatusBar.setBarStyle('dark-content');
            Platform.OS === 'android' && StatusBar.setBackgroundColor(theme.colors.bgLight);
        }, []),
    );

    const onRefresh = () => {
        setRefreshing(true);
        getSummaryData();
        setIsClickedSearch(false);
        setRefreshing(false);
        Snackbar.show({
            text: i18n.get('refreshing'),
            textColor: 'white',
            backgroundColor: theme.colors.success,
            duration: Snackbar.LENGTH_SHORT,
        });
    };

    const onClickOptionSearch = async () => {
        setIsClickedSearch(true);
    };

    const onChangeSearchText = (text) => {
        setSearchText(text);
        searchFilter(text);
    };

    const searchFilter = (text) => {
        const newData = allData.filter(item => {
            const listItem = `${item.country.toLocaleLowerCase()}`;
            return listItem.indexOf(text.toLowerCase()) > -1;
        });
        setCountriesData(newData);
    };

    const renderSearchHeader = () => {
        return (
            <TextInput
                style={{borderBottomWidth: 1, borderColor: '#cccc'}}
                height={40}
                onChangeText={onChangeSearchText}
                value={searchText}
                secureTextEntry={false}
                autoCapitalize='words'
                placeholder={i18n.get('enterCountry')}
                paddingLeft={10}
                ref={ref => (this.inputSearch = ref)}
            />
        );
    };

    const renderListData = () => {
        return (
            <FlatList
                flex={1}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={isClickedSearch ? renderSearchHeader() : null}
                style={{marginTop: 15, paddingRight: 12}}
                data={countriesData}
                renderItem={item => (
                    <CardCountry
                        country={item.item.country}
                        deaths={item.item.deaths}
                        active={item.item.active}
                        recovered={item.item.recovered}
                        navigation={navigation}
                    />
                )}
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={Platform.OS === 'ios' ? 0 : 16}
                refreshing={refreshing}
                onRefresh={onRefresh}
                ListEmptyComponent={renderEmpty}
            />
        );
    };

    const renderEmpty = () => {
        return (
            <Box flex={1} justifyContent='center' alignItems='center' mt={250}>
                <Text mt={5} color='textDark' fontFamily='Montserrat-SemiBold'>Không có dữ liệu tìm kiếm</Text>
            </Box>
        );
    };

    const renderLoadingView = () => {
        return (
            <Box flex={1} justifyContent='center' alignItems='center'>
                <ActivityIndicator size='large' color='textDark'/>
                <Text mt={5} color='textDark' fontFamily='Montserrat-SemiBold'>Đang cập nhật...</Text>
            </Box>
        );
    };

    return (
        <Box as={SafeAreaView} backgroundColor='bgLight' flex={1}
             height='100%' paddingTop={26} paddingLeft={26} paddingRight={14}>
            {/* BACKGROUND */}
            <Box flexDirection='row' justifyContent='space-between' alignItems='center' paddingRight={12}>
                <Text fontSize={23} fontWeight='bold'>{i18n.get('countries')}</Text>
                <Button onPress={onClickOptionSearch}>
                    <SvgSearch width={30} color='black'/>
                </Button>
            </Box>

            <Box flexDirection='row' alignItems='center' mt={12} justifyContent='space-between'>
                <Box flexDirection='row' alignItems='center'>
                    <Box size={8} bg='warning' borderRadius={4} mr={8}/>
                    <Text mr={10} fontSize={11} color='textDark'>{i18n.get('active')}</Text>
                </Box>
                <Box flexDirection='row' alignItems='center'>
                    <Box size={8} bg='success' borderRadius={4} mr={8}/>
                    <Text mr={10} fontSize={11} color='textDark'>{i18n.get('recovered')}</Text>
                </Box>
                <Box flexDirection='row' alignItems='center'>
                    <Box size={8} bg='danger' borderRadius={4} mr={8}/>
                    <Text mr={10} fontSize={11} color='textDark'>{i18n.get('death')}</Text>
                </Box>
                <Text fontSize={10} color='textDark' paddingRight={12} fontFamily='Montserrat-SemiBold'>
                    {i18n.get('lastUpdate')}: {updatedDate}
                </Text>
            </Box>

            {/* LIST DATA */}
            {!loading ? renderListData() : renderLoadingView()}
        </Box>
    );
}

export default SearchStackScreen;

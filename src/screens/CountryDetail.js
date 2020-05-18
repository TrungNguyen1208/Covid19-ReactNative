import React, {
    useEffect,
    useState,
} from 'react';

import {
    ActivityIndicator,
    Image,
    ScrollView,
} from 'react-native';

import Box from '../components/Base/Box';
import Button from '../components/Base/Button';
import Text from '../components/Base/Text';
import i18n from '../i18n';
import theme from '../utils/theme';

import SvgBack from '../assets/icons/SvgBack';
import SvgCase from '../assets/icons/SvgCase';
import SvgRecovered from '../assets/icons/SvgRecovered';
import SvgDeath from '../assets/icons/SvgDeath';
import SvgSick from '../assets/icons/SvgSick';
import SvgChart from '../assets/icons/SvgChart';

export default function CountryDetail({route, navigation}) {
    const [countryDetailData, setCountryDetailData] = useState([]);
    const [country, setCountry] = useState(null);
    const [loading, setLoading] = useState(true);

    const getCountryDetailData = async () => {
        setLoading(true);
        const country = route.params.country;
        const response = await fetch(
            `https://corona.lmao.ninja/v2/countries/${country}`,
        );
        const data = await response.json();
        setCountryDetailData(data);
        setCountry(country.toString());
        setLoading(false);
    };

    useEffect(() => {
        getCountryDetailData();
    }, []);

    const renderContentView = () => {
        return (
            <ScrollView flex={1} padding={25}>
                <Box flexDirection='row' justifyContent='center'>
                    <Button
                        position='absolute'
                        left={0}
                        onPress={() => navigation.goBack()}
                    >
                        <SvgBack color='black'/>
                    </Button>
                    <Text fontSize={22} fontWeight='bold'>{route.params.country}</Text>
                </Box>

                <Box flex={1}>
                    {renderInfoView()}
                    {renderChartView()}
                </Box>
            </ScrollView>
        );
    };

    const renderInfoView = () => {
        return (
            <Box
                borderRadius={12}
                backgroundColor='white'
                padding={26}
                flex={1}
                marginTop={25}
                boxShadow='0px 7px 6px #00000008'
            >
                <Box flexDirection='row' justifyContent='space-between' mb={34}>
                    <Text fontSize={16} fontWeight='bold'>{i18n.get('allInfo')}</Text>
                    <Image
                        style={{width: 32, height: 32, borderRadius: 16}}
                        source={{
                            uri: countryDetailData.countryInfo.flag,
                        }}
                    />
                </Box>
                <Box flexDirection='row' justifyContent='space-between'>
                    <Box flexDirection='row' alignItems='center'>
                        <SvgCase width={30} height={30}/>
                        <Box flexDirection='column' ml={13}>
                            <Text fontSize={14}>Nhiễm Bệnh</Text>
                            <Text fontSize={20} mt={7}>{countryDetailData.cases.toLocaleString()}</Text>
                        </Box>
                    </Box>

                    <Box flexDirection='row' alignItems='center'>
                        <SvgRecovered width={30} height={30}/>
                        <Box flexDirection='column' ml={13}>
                            <Text fontSize={14}>Bình Phục</Text>
                            <Text fontSize={20} mt={7}>{countryDetailData.recovered.toLocaleString()}</Text>
                        </Box>
                    </Box>
                </Box>

                <Box flexDirection='row' justifyContent='space-between' mt={32}>
                    <Box flexDirection='row' alignItems='center'>
                        <SvgDeath width={30} height={30}/>
                        <Box flexDirection='column' ml={13}>
                            <Text fontSize={14}>Tử Vong</Text>
                            <Text fontSize={20} mt={7}>{countryDetailData.deaths.toLocaleString()}</Text>
                        </Box>
                    </Box>

                    <Box flexDirection='row' alignItems='center'>
                        <SvgSick width={30} height={30}/>
                        <Box flexDirection='column' ml={13}>
                            <Text fontSize={14}>Điều Trị</Text>
                            <Text fontSize={20} mt={7}>{countryDetailData.recovered.toLocaleString()}</Text>
                        </Box>
                    </Box>
                </Box>

                <Box flexDirection='row' justifyContent='space-between' mt={48}>
                    <Box flexDirection='column'>
                        <Text fontSize={11} color='textDark'>{i18n.get('todayCases')}</Text>
                        <Text fontSize={18} mt={10}
                              fontWeight='bold'>{countryDetailData.todayCases.toLocaleString()}</Text>
                    </Box>
                    <Box flexDirection='column'>
                        <Text fontSize={11} color='textDark'>{i18n.get('todayDeaths')}</Text>
                        <Text fontSize={18} mt={10}
                              fontWeight='bold'>{countryDetailData.todayDeaths.toLocaleString()}</Text>
                    </Box>
                    <Box flexDirection='column'>
                        <Text fontSize={11} color='textDark'>{i18n.get('deathRatio')}</Text>
                        <Text fontSize={18} mt={10} fontWeight='bold'>
                            {(
                                (countryDetailData.recovered / countryDetailData.cases) * 100
                            ).toFixed(1)}{' '}%
                        </Text>
                    </Box>
                </Box>

            </Box>
        );
    };

    const renderChartView = () => {
        return (
            <Box flex={1}>
                <Button
                    onPress={() => navigation.navigate('ChartCases', { country })}
                    borderRadius={12}
                    backgroundColor='white'
                    flexDirection='row'
                    justifyContent='space-between'
                    alignItems='center'
                    mt={20}
                    p={20}
                    boxShadow='0px 7px 6px #00000008'
                >
                    <SvgChart/>
                    <Text>{i18n.get('numberOfCasesChart')}</Text>
                    <SvgBack
                        style={{transform: [{rotateY: '180deg'}]}}
                        color='black'
                    />
                </Button>

                <Button
                    onPress={() => navigation.navigate('ChartDeaths', { country })}
                    borderRadius={12}
                    backgroundColor='white'
                    flexDirection='row'
                    justifyContent='space-between'
                    alignItems='center'
                    mt={20}
                    mb={40}
                    p={20}
                    boxShadow='0px 7px 6px #00000008'
                >
                    <SvgChart/>
                    <Text>{i18n.get('numberOfDeathChart')}</Text>
                    <SvgBack
                        style={{transform: [{rotateY: '180deg'}]}}
                        color='black'
                    />
                </Button>
            </Box>
        );
    };

    const renderLoadingView = () => {
        return (
            <Box flex={1} justifyContent='center' alignItems='center'>
                <ActivityIndicator size='large' color='textDark'/>
                <Text mt={5} color='textDark' fontFamily='Montserrat-SemiBold'>Vui lòng đợi...</Text>
            </Box>
        );
    };

    return (
        <Box flex={1} bg='bgLight' justifyContent='center'>
            {!loading ? renderContentView() : renderLoadingView()}
        </Box>
    );
}

import React, { useEffect, useState } from 'react';
import LineChart from 'react-native-responsive-linechart';
import { ActivityIndicator, ScrollView } from 'react-native';

import i18n from '../i18n';

import Text from '../components/Base/Text';
import Box from '../components/Base/Box';
import theme from '../utils/theme';
import Button from '../components/Base/Button';
import SvgBack from '../assets/icons/SvgBack';

export default function ChartDeaths({ route, navigation }) {
    const [valuesData, setValuesData] = useState([]);
    const [keysData, setKeysData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getCountryData = async () => {
        setLoading(true);
        const response = await fetch(
            `https://corona.lmao.ninja/v2/historical/${route.params.country}`,
        );
        const res = await response.json();
        const data = res.timeline.deaths;

        const countryValues = Object.values(data);
        const keysValues = Object.keys(data);
        await setValuesData(countryValues);
        await setKeysData(keysValues);
        setLoading(false);
    };

    useEffect(() => {
        getCountryData();
    }, []);

    const configChart = {
        insetY: 12,
        insetX: 12,
        line: {
            visible: false,
            strokeWidth: 1,
            strokeColor: theme.colors.textLight,
        },
        area: {
            visible: true,
            gradientFrom: '#FF4444',
            gradientFromOpacity: 1,
            gradientTo: theme.colors.danger,
            gradientToOpacity: 0.4,
        },
        xAxis: {
            visible: true,
            labelFontSize: 12,
            labelColor: theme.colors.textDark,
        },
        dataPoint: {
            visible: true,
            color: '#D33030',
            radius: 2,
            label: { visible: true, marginBottom: 20 },
        },
        grid: {
            stepSize: 2500,
        },
        yAxis: {
            visible: true,
            labelColor: theme.colors.textDark,
        },
    };

    const renderChartView = () => {
        return (
            <ScrollView horizontal={true}>
                <LineChart
                    style={{ flex: 1, width: 2000}}
                    data={valuesData}
                    xLabels={keysData}
                    config={configChart}
                />
            </ScrollView>
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
        <Box flex={1} p={10} backgroundColor='bgLight'>
            <Box
                flexDirection='row'
                alignItems='center'
                justifyContent='center'
                py={18}
            >
                <Button
                    position='absolute'
                    left={10}
                    onPress={() => navigation.goBack()}
                >
                    <SvgBack color='black' />
                </Button>
                <Text fontWeight='bold' fontSize={15}>{i18n.get('numberOfDeathChart')}</Text>
            </Box>

            {!loading ? renderChartView() : renderLoadingView()}
        </Box>
    );
}

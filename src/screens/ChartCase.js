import React, { useEffect, useState } from 'react';
import LineChart from 'react-native-responsive-linechart';
import { ActivityIndicator, ScrollView } from 'react-native';

import i18n from '../i18n';
import _ from 'lodash'

import Text from '../components/Base/Text';
import Box from '../components/Base/Box';
import theme from '../utils/theme';
import Button from '../components/Base/Button';
import SvgBack from '../assets/icons/SvgBack';

export default function ChartCases({ route, navigation }) {
    const [valuesData, setValuesData] = useState([]);
    const [keysData, setKeysData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stepSize, setStepSize] = useState(2500);

    const getCountryData = async () => {
        setLoading(true);
        const response = await fetch(
            `https://corona.lmao.ninja/v2/historical/${route.params.country}`,
        );
        const res = await response.json();
        const data = res.timeline.cases;

        const countryValues = Object.values(data);
        const keysValues = Object.keys(data);
        const newestValue = _.last(countryValues);
        if (newestValue > 1000) {
            setStepSize(Math.round(newestValue / 10000) * 1000)
        } else {
            setStepSize(100);
        }
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
            gradientFrom: 'orange',
            gradientFromOpacity: 1,
            gradientTo: theme.colors.warning,
            gradientToOpacity: 0.4,
        },
        xAxis: {
            visible: true,
            labelFontSize: 12,
            labelColor: theme.colors.textDark,
        },
        dataPoint: {
            visible: true,
            color: '#E8CB32',
            radius: 2,
            label: { visible: true, marginBottom: 20 },
        },
        grid: {
            stepSize: stepSize,
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
                <Text fontWeight='bold' fontSize={15}>{i18n.get('numberOfCasesChart')}</Text>
            </Box>

            {!loading ? renderChartView() : renderLoadingView()}
        </Box>
    );
}

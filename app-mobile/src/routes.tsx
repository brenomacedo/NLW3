import React, { useEffect, useState } from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import OrphanagesMap from './pages/OrphanagesMap'
import OrphanageDetails from './pages/OrphanageDetails'
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition'
import OrphanageData from './pages/CreateOrphanage/OrphanageData'
import Header from './components/Header'
import Onboarding1 from './pages/Onboarding1'
import Onboarding2 from './pages/Onboarding2'
import AsyncStorage from '@react-native-community/async-storage'
import { Text } from 'react-native'

const AppStack = createStackNavigator()

const Routes = () => {

    const [init, setInit] = useState<string>()

    useEffect(() => {
        const verify = async () => {
            if(!await AsyncStorage.getItem('firstTime')) {
                setInit('onboarding1')
                await AsyncStorage.setItem('firstTime', 'true')
            } else {
                setInit('map')
            }
        }
        verify()
    }, [])

    if(!init) {
        return <Text>Loading</Text>
    }

    return (
        <NavigationContainer>
            <AppStack.Navigator initialRouteName={init} screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5' } }}>
                <AppStack.Screen name='onboarding2' component={Onboarding2} />
                <AppStack.Screen name='onboarding1' component={Onboarding1} />
                <AppStack.Screen name='map' component={OrphanagesMap} />
                <AppStack.Screen name='details' component={OrphanageDetails} options={{
                    headerShown: true,
                    header: () => <Header showCancel={false} title="Detalhes" />
                }} />
                <AppStack.Screen name='selectposition' component={SelectMapPosition} options={{
                    headerShown: true,
                    header: () => <Header title="Selecione no mapa" />
                }} />
                <AppStack.Screen name='data' component={OrphanageData} options={{
                    headerShown: true,
                    header: () => <Header title="Informe os detalhes" />
                }} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default Routes
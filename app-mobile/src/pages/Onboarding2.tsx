import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import Kids from '../images/kids.png'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

const Onboarding2 = () => {

    const { navigate } = useNavigation()

    return (
        <View style={styles.container}>
            <Image style={{ height: 320 }} resizeMode='contain' source={Kids} />
            <Text style={styles.title}>Leve felicidade para o mundo</Text>
            <Text style={styles.subTitle}>Visite orfanatos e mude o dia de muitas crianças.</Text>
            <View style={styles.bottomBar}>
                <View style={styles.progress}>
                    <View style={styles.progress2}></View>
                    <View style={styles.progress1}></View>
                </View>
                <RectButton onPress={() => navigate('map')} style={styles.next}>
                    <Feather name='arrow-right' size={20} color='#15B6D6' />
                </RectButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EDFFF6',
        padding: 35
    },
    title: {
        fontSize: 30,
        fontFamily: 'Nunito_800ExtraBold',
        color: '#0089A5'
    },
    subTitle: {
        fontSize: 16,
        fontFamily: 'Nunito_600SemiBold',
        color: '#0089A5'
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: 30
    },
    next: {
        width: 56,
        height: 56,
        backgroundColor: '#D1EDF2',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    progress: {
        flexDirection: 'row'
    },
    progress1: {
        width: 8,
        height: 4,
        backgroundColor: '#FFD152',
        borderRadius: 2,
    },
    progress2: {
        width: 16,
        marginRight: 4,
        height: 4,
        backgroundColor: '#BECFD8',
        borderRadius: 2
    }
})

export default Onboarding2
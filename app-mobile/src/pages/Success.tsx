import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Image, StyleSheet, View, Text } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import SuccessImg from '../images/success.png'

const Success = () => {

    const { navigate } = useNavigation()

    return (
        <View style={styles.container}>
            <Image source={SuccessImg} />
            <Text style={styles.title}>Ebaaaa!</Text>
            <Text style={styles.description}>O cadastro deu certo e foi
            enviado ao administrador para ser
            aprovado. Agora é só esperar :)</Text>
            <RectButton onPress={() => navigate('map')} style={styles.button}>
                <Text style={styles.buttonText}>Ok</Text>
            </RectButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#39CC83',
        justifyContent: 'center',
        alignItems: 'center'
    },
    description: {
        fontSize: 18,
        color: 'white',
        fontFamily: 'Nunito_800ExtraBold',
        width: 300,
        textAlign: 'center',
        marginTop: 10
    },
    title: {
        fontSize: 30,
        color: 'white',
        fontFamily: 'Nunito_800ExtraBold',
        marginTop: 20
    },
    button: {
        width: 120,
        height: 56,
        borderRadius: 16,
        backgroundColor: '#19C06D',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    buttonText: {
        fontSize: 20,
        fontFamily: 'Nunito_800ExtraBold',
        color: 'white'
    }
})

export default Success
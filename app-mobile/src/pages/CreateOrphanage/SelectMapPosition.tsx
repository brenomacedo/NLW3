import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text, Modal, Image, TouchableOpacity } from 'react-native';
import cursor from '../../images/cursor.png'
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';

import mapMarkerImg from '../../images/map-marker.png';

export default function SelectMapPosition() {
  const navigation = useNavigation();

  function handleNextStep() {
    navigation.navigate('data', { position });
  }

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })
  const [visible, setVisible] = useState(true)


  return (
    <View style={styles.container}>

      <Modal animationType='slide' transparent visible={visible}>
          <View style={styles.modalContainer}>
              <Image source={cursor} />
              <Text style={styles.modalText}>Toque no mapa para adicionar um orfanato</Text>
              <TouchableOpacity onPress={() => setVisible(false)} style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Entendi</Text>
              </TouchableOpacity>
          </View>
      </Modal>
      <MapView 
        initialRegion={{
          latitude: -27.2092052,
          longitude: -49.6401092,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={styles.mapStyle}
        onPress={e => {
          setPosition(e.nativeEvent.coordinate)
        }}
      >
        {position.latitude !== 0 && position.longitude !== 0 && <Marker 
          icon={mapMarkerImg}
          coordinate={{ latitude: position.latitude, longitude: position.longitude }}
        />}
      </MapView>

      {position.latitude !== 0 && position.longitude !== 0 && <RectButton style={styles.nextButton} onPress={handleNextStep}>
        <Text style={styles.nextButtonText}>Próximo</Text>
      </RectButton>}

  
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(21,195,214,0.6)',
    flex: 1
},
modalText: {
    color: 'white',
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 20,
    textAlign: 'center',
    width: 200,
    marginTop: 30
},
modalButton: {
    width: 200,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
},
modalButtonText: {
    color: 'rgb(21,195,214)',
    fontFamily: 'Nunito_800ExtraBold'
}
})
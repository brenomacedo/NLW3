import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'
import api from '../../services/api';

export default function OrphanageData2() {

  type RouteProps = {
    data: {
        latitude: number
        longitude: number
        name: string
        about: string
        images: string[]
    }
  }

  const [instructions, setInstructions] = useState('')
  const [opening_hours, setOpeningHours] = useState('')
  const [open_on_weekends, setOpenOnWeekends] = useState(true)

  const { navigate } = useNavigation()

  const route = useRoute<RouteProp<RouteProps, 'data'>>()
  const { latitude, longitude, name, about, images } = route.params

  const handleCreateOrphanage = async () => {
    const data = new FormData()

    data.append('name', name)
    data.append('about', about)
    data.append('latitude', String(latitude))
    data.append('longitude', String(longitude))
    data.append('instructions', instructions)
    data.append('opening_hours', opening_hours)
    data.append('open_on_weekends', String(open_on_weekends))

    images.forEach((image, index) => {
      data.append('images', {
        type: 'image/jpg',
        uri: image,
        name: `${index}-${Date.now()}.jpg`
      } as unknown as Blob)
    })

    try {
      await api.post('/orphanages', data)
      navigate('success')
    } catch(e) {
        console.log(e)
    }

  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput value={instructions} onChangeText={t => setInstructions(t)}
        style={[styles.input, { height: 110 }]}
        multiline
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput value={opening_hours} onChangeText={t => setOpeningHours(t)}
        style={styles.input}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={() => setOpenOnWeekends(true)}
            style={[styles.leftButton, { borderColor: open_on_weekends ? 'green' : '#ccc' }]}>
                <Text style={styles.buttonText}>Sim</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setOpenOnWeekends(false)}
            style={[styles.rightButton, { borderColor: open_on_weekends ? '#ccc' : 'red' }]}>
                <Text style={styles.buttonText}>Não</Text>
            </TouchableOpacity>
        </View>
      </View>

      {(!instructions || !opening_hours) ? (
        <RectButton style={styles.nextButtonDisabled} onPress={() => {}}>
            <Text style={styles.nextButtonText}>Cadastrar</Text>
        </RectButton>
      ) : (
        <RectButton style={styles.nextButton} onPress={handleCreateOrphanage}>
            <Text style={styles.nextButtonText}>Cadastrar</Text>
        </RectButton>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  switchContainer: {
    marginTop: 16
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },
  uploadedImage: {
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 32,
    marginRight: 8,
    position: 'relative'
  },
  uploadedImagesContainer: {
    flexDirection: 'row'
  },
  deleteImage: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    position: 'absolute',
    right: 8,
    top: 0,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    position: 'relative',
  },
  buttonsContainer: {
      width: "100%",
      height: 60,
      flexDirection: 'row'
  },
  leftButton: {
      width: '50%',
      height: 60,
      borderTopLeftRadius: 16,
      borderBottomLeftRadius: 16,
      borderWidth: 1,
      borderColor: '#ccc',
      justifyContent: 'center',
      alignItems: 'center'
  },
  rightButton: {
      width: '50%',
      height: 60,
      borderTopRightRadius: 16,
      borderBottomRightRadius: 16,
      borderWidth: 1,
      borderColor: '#ccc',
      justifyContent: 'center',
      alignItems: 'center'
  },
  buttonText: {
    fontFamily: 'Nunito_800ExtraBold',
    color: '#aaa'
  },
  nextButtonDisabled: {
    backgroundColor: '#ccc',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  }
})
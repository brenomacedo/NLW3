import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'
import api from '../../services/api';

export default function OrphanageData() {

  type RouteProps = {
    data: {
      position: {
        latitude: number
        longitude: number
      }
    }
  }

  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [images, setImages] = useState<string[]>([])

  const { navigate } = useNavigation()

  const { params: { position: { latitude, longitude } } } = useRoute<RouteProp<RouteProps, 'data'>>()



  const handleSelectImages = async () => {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync()
    if(status !== 'granted') {
      return alert('precisamos do acesso a sua camera')
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    })

    if(result.cancelled) {
      return
    }

    const { uri } = result
    setImages([...images, uri])
  }

  const deleteImage = (removeIndex: number) => {
    const newImages = images.filter((image, index) => index !== removeIndex)
    setImages(newImages)
  }

  const handleNext = () => {
    navigate('data2', {
      name, about, images, latitude, longitude
    })
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput value={name} onChangeText={t => setName(t)}
        style={styles.input}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput value={about} onChangeText={t => setAbout(t)}
        style={[styles.input, { height: 110 }]}
        multiline
      />

      <Text style={styles.label}>Fotos</Text>

      <View>
        {images.map((image, index) => {
          return (
            <View key={image} style={styles.imageContainer}>
              <Image source={{ uri: image }}
              style={styles.uploadedImage}>
              </Image>
              <View style={styles.imageInfo}>
                <Text style={styles.imageInfoName}>{image.split('/')[image.split('/').length - 1]}</Text>
              </View>
              <TouchableOpacity onPress={() => deleteImage(index)} style={styles.deleteImage}>
                <Feather name='x' size={40} color='#39CC83' />
              </TouchableOpacity>
            </View>
          )
        })}
      </View>

      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      {(!name || !about || images.length === 0) ? (
        <RectButton style={styles.nextButtonDisabled} onPress={() => {}}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      ) : (
        <RectButton style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Próximo</Text>
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
    marginTop: 5
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
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
    marginRight: 8,
    position: 'relative'
  },
  deleteImage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20
  },
  imageContainer: {
    position: 'relative',
    padding: 5,
    width: '100%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#39CC83',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5
  },
  nextButtonDisabled: {
    backgroundColor: '#ccc',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },
  imageInfo: {
      marginLeft: 10
  },
  imageInfoName: {
    color: '#39CC83',
    width: 150
  }
})
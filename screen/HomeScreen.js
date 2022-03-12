import { StyleSheet, View, Image, SafeAreaView } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import React from 'react';
import Navoptions from '../components/Navoptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_KEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';


const HomeScreen = () => {

  const dispatch = useDispatch();

  return (
    <SafeAreaView style={tw`bg-white`}>
      <View style={styles.container}>
        <Image
          style={styles.homeImg}
          source = {{
            uri: 'https://links.papareact.com/gzs',
          }}
        />
        <Navoptions />
        <GooglePlacesAutocomplete 
            style={{
              container: {
                flex: 1,
              },
              textInput: {
                fontSize: 30,
              },
            }}
            placeholder="Where From"
            debounce={400}
            query={{
              key: GOOGLE_MAPS_KEY,
              language: 'en'
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            enablePoweredByContainer={false}
            fetchDetails={true}
            onPress={(data, details = null) => {
              dispatch(setOrigin({
                location: details.geometry.location,
                description: data.description
              }));

              dispatch(setDestination(null));
            }}
        />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    homeImg: {
      width: 100, 
      height: 100, 
      resizeMode: 'contain'
    },

    container: {
      padding: 10,
      height: '100%'
    }
})
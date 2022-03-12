import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import tw from 'tailwind-react-native-classnames'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_KEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

const NavigateCard = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [implemented, setImplemented] = useState(true);

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
        <TouchableOpacity style={[tw`absolute top-3 left-5 p-3 rounded-full z-10`]} onPress={() => {navigation.navigate("HomeScreen")}}>
            <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-xl text-center py-5`}>NavigateCard</Text>
        <View style={tw`flex-shrink border-t border-gray-200`}>
            <View>
                <GooglePlacesAutocomplete 
                    styles={toInputBox}
                    placeholder="where to"
                    debounce={400}
                    enablePoweredByContainer={false}
                    fetchDetails={true}
                    returnKeyType={"search"}
                    minLength={2}
                    onPress={(data, details = null) => {
                        dispatch(setDestination({
                            location: details.geometry.location,
                            description: data.description
                        })
                        );

                        navigation.navigate("RideOptionsCard");
                    }}
                    query={{
                    key: GOOGLE_MAPS_KEY,
                    language: 'en'
                    }}
                    nearbyPlacesAPI="GooglePlacesSearch"
                />
            </View> 
            <View style={tw`py-2 mt-auto flex flex-row justify-evenly border-t border-gray-100`}>
                <TouchableOpacity
                    onPress={() => {navigation.navigate("RideOptionsCard")}}
                    style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
                >
                    <Icon name="car" type="font-awesome" color="white" size={16} />
                    <Text style={tw`text-white text-center`}>Rides</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {setImplemented(!implemented);}}
                    style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}
                >
                    <Icon name="fast-food-outline" type="ionicon" color="black" size={16} />
                    <Text style={tw`text-center text-black`}>Eats</Text>
                </TouchableOpacity>
            </View>
            {!implemented && (
                    <View role="alert" style={tw`border-l-4 p-4 flex flex-row justify-center`}>
                        <Text style={tw`font-bold`}>Not Implemented</Text>
                    </View>
            )}
        </View>
    </SafeAreaView>
  )
}

export default NavigateCard

const toInputBox = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 20,
        flex: 0
    },
    textInput: {
        backgroundColor: "#DDDDDF",
        borderRadius: 0,
        fontSize: 18,
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
    },
})
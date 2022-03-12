import { StyleSheet, Text,SafeAreaView, TouchableOpacity, View, FlatList, Image } from 'react-native'
import { Icon } from 'react-native-elements'
import React, { useState } from 'react'
import tw from 'tailwind-react-native-classnames'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectTravelTimeinformation } from '../slices/navSlice'
import 'intl'
import "intl/locale-data/jsonp/en"

const data = [
    {
      id: "Uber-X-123",
      title: "UberX",
      multiplier: 1,
      image: "https://links.papareact.com/3pn",
    },
    {
      id: "Uber-Van-456",
      title: "Uber Van",
      multiplier: 1.2,
      image: "https://links.papareact.com/5w8",
    },
    {
      id: "Uber-Comfort-789",
      title: "Uber Comfort",
      multiplier: 1.75,
      image: "https://links.papareact.com/7pf",
    },
  ];

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const travelTimeinformation = useSelector(selectTravelTimeinformation);
  const [selected,setSelected] = useState(null);
  const SURGE_CHARGE = 1.5;

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity style={[tw`absolute top-3 left-5 p-3 rounded-full z-10`]} onPress={() => {navigation.navigate("HomeScreen")}}>
            <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>Select a Ride - {travelTimeinformation?.distance.text}</Text>
      </View>
      <FlatList 
        data = {data}
        renderItem = { ({item}) => (
            <TouchableOpacity 
            onPress={() => setSelected(item)}
            style={tw`flex flex-row justify-between items-center px-5 ${ item.id === selected?.id && 'bg-gray-200'}`}
            >
                <Image 
                    style={{
                        width:80,
                        height:80,
                        resizeMode: 'contain'
                    }}
                    source = {{ uri: item.image }}
                />
                <View style={tw`-ml-4`}>
                    <Text style={tw`text-lg font-semibold`}>{item.title}</Text>
                    <Text>{travelTimeinformation?.duration.text}</Text>
                </View>
                <Text style={tw`text-xl`}>
                    {new Intl.NumberFormat('en-US',{style: 'currency', currency: 'USD'}).format(travelTimeinformation?.duration.value * SURGE_CHARGE * item.multiplier / 100)}
                </Text>
            </TouchableOpacity>
        )}
      />

      <View style={tw`bg-black py-3 m-3 ${!selected && 'bg-gray-300'}`}>
          <Text style={tw`text-xl text-center text-white`}>Choose {selected?.title}</Text>
      </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})
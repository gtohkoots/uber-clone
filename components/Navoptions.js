import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectOrigin } from '../slices/navSlice'

const data = [
    {
        id: '123',
        title: 'Get a ride',
        image: 'https://links.papareact.com/3pn',
        screen: 'MapScreen'
    },
    {
        id: '456',
        title: 'Order a food',
        image: 'https://links.papareact.com/28w',
        screen: 'EatsScreen'
    },    
]

const Navoptions = () => {
    const navigation = useNavigation();
    const origin = useSelector(selectOrigin);

    return (
        <FlatList 
            data={data}
            style={tw`max-h-60`}
            horizontal
            renderItem={({item}) => (
                <TouchableOpacity 
                onPress={ () => navigation.navigate(item.screen)}
                style={tw `p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-36`}
                disabled={!origin}
                >
                    <View style={tw`${!origin && "opacity-40"}`}>
                        <Image
                        style={styles.navImg}
                        source={{
                            uri: item.image
                        }}
                        />
                        <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
                        <Icon 
                        style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                        name="arrowright" type="antdesign" color="white" />
                    </View>
                </TouchableOpacity>
            )}
        />
    )
}

export default Navoptions

const styles = StyleSheet.create({
    navImg: {
      width: 100, 
      height: 100, 
      resizeMode: 'contain'
    }
})
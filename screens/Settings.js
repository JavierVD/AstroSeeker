import React, { useEffect, useState } from 'react';
import {
    Heading, Input, Center, NativeBaseProvider, Text, NativeProvider, Button, Box, AspectRatio, Image, Stack,
    HStack, ScrollView, FlatList, View, Pressable, Icon, Avatar, Checkbox
} from 'native-base';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import { TouchableOpacity, StyleSheet} from 'react-native';

var SharedPreferences = require('react-native-shared-preferences');

export default function Settings() {
    const [checked, setChecked] = React.useState(true);
    const [val, setVal] = useState('');
    useEffect(()=>{
        sett()
    })
    const sett = ()=>{
        //SharedPreferences.getItem("splash", (value)=> { this.setState({audio: parseFloat (value)})})
        SharedPreferences.getItem("splash", (value)=>{ setVal(value)})
        try{
            if(val==null){
                console.log("new")
                SharedPreferences.setItem('splash', '1.0');
                
            }else{
                setChecked((val=='1.0')? true : false)
            }
        }catch{
            SharedPreferences.setItem('splash', '1.0');
        }

    }
    const got = ()=>{
       if(checked){
            setChecked(false);  SharedPreferences.setItem("splash",'1.0'); SharedPreferences.getItem("splash",(value)=>{ console.log("new va - : " +  value)})} else{
            setChecked(true); SharedPreferences.setItem("splash",'0.0');  SharedPreferences.getItem("splash",(value)=>{ console.log("new va + : " +  value)})}   
    }
    return (
        <NativeBaseProvider>


            <Box paddingTop="20" alignItems="center">
            <Heading >Settings

                        </Heading>
                <Stack space={3}>
                    <Stack space={2}>
                        <Heading size="md" ml="-1" paddingTop="5">
                            <Checkbox onPress = {()=> got()}size="md" ml="-1" value={checked}><Text style={{color: 'black'}}> SplashScreen sound</Text></Checkbox>

                        </Heading>
                    </Stack>
                </Stack>

                <Stack space={3}>
                    <Stack space={2}>
                        <Heading size="md" ml="-1" paddingTop="5">
                       
                <TouchableOpacity   onPress={() => navigation.navigate("Configuracion")}>
                <Image width={25} height={25}           
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/1920px-Bandera_de_Espa%C3%B1a.svg.png',
                }}
              />
        </TouchableOpacity>
                                                    </Heading>
                    </Stack>
                </Stack>
                <Stack space={3}>
                    <Stack space={2}>
                        <Heading size="md" ml="-1" paddingTop="5">
                        <TouchableOpacity   onPress={() => navigation.navigate("Settings")}>
                        <Image width={25} height={25} paddingBottom="2"          
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Flag_of_the_United_States.png',
                }}
              />
        </TouchableOpacity>
               

                        </Heading>
                    </Stack>
                </Stack>
            </Box>


            <Box flex={1} bg="white" safeAreaTop>
                <Center flex={1}></Center>

            </Box>

        </NativeBaseProvider>
    )
}
import React, { useEffect, useState } from 'react';
import {
    Heading, Input, Center, NativeBaseProvider, Text, NativeProvider, Button, Box, AspectRatio, Image, Stack,
    HStack, ScrollView, FlatList, View, Pressable, Icon, Avatar, Checkbox
} from 'native-base';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
export default function App() {
    return (
        <NativeBaseProvider>
<Image width={50} height={50}           
                source={{
                  uri: 'https://cdn.icon-icons.com/icons2/2596/PNG/512/return_icon_154912.png',
                }}
              />
            <Box paddingTop="20" alignItems="center">
            <Heading >Ajustes

                        </Heading>
                <Stack space={3}>
                    <Stack space={2}>
                        <Heading size="md" ml="-1" paddingTop="5">
                            <Checkbox size="md" ml="-1" isChecked></Checkbox>
                            <Text> SplashScreen Animation</Text>

                        </Heading>
                    </Stack>
                </Stack>

                <Stack space={3}>
                    <Stack space={2}>
                        <Heading size="md" ml="-1" paddingTop="5">
                            <Checkbox size="md" ml="-1" isChecked></Checkbox>
                            <Text> Efectos de sonido</Text>
                        </Heading>
                    </Stack>
                </Stack>
                <Stack space={3}>
                    <Stack space={2}>
                        <Heading size="md" ml="-1" paddingTop="5">
                            <Checkbox size="md" ml="-1" isChecked></Checkbox>
                            <Text> musica de fondo</Text>
                        </Heading>
                    </Stack>
                </Stack>
                <Stack space={3}>
                    <Stack space={2}>
                        <Heading size="md" ml="-1" paddingTop="5">
                        <RadioButton
                    value="first"
               
                    onPress={() => setChecked('first')}
                />
                <Image width={25} height={25}           
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/1920px-Bandera_de_Espa%C3%B1a.svg.png',
                }}
              />

                        </Heading>
                    </Stack>
                </Stack>
                <Stack space={3}>
                    <Stack space={2}>
                        <Heading size="md" ml="-1" paddingTop="5">
                        <RadioButton
                    value="first"
               
                    onPress={() => setChecked('second')}
                />
                <Image width={25} height={25} paddingBottom="2"          
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Flag_of_the_United_States.png',
                }}
              />

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


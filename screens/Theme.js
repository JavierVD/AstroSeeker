import { React, useState, useEffect } from "react";
import { StyleSheet, View } from 'react-native';
import { Heading, AspectRatio, Image, Text, Center, HStack, Stack, Divider, TextArea, Input, Button, NativeBaseProvider, Box, Circle, ScrollView } from "native-base";
import { collection } from 'firebase/firestore';
import db from '../database/firebase';
import { getDocs } from 'firebase/firestore'

const Theme = ({ route, navigation }) => {
    const { item } = route.params;
    const [temas, setTemas] = useState()

    useEffect(() => {
        getData()
    }, [])


    const getData = () => {

        try {
            const colRef = collection(db, 'Temas')
            const dataRequest = getDocs(colRef)
                .then((snapshot) => {
                    let Temas = []
                    snapshot.docs.forEach((doc) => {
                        Temas.push({ ...doc.data(), id: doc.id })
                    })
                    setTemas(Temas)
                })
                .catch(err => {
                    console.log(err.message)
                })

        } catch (e) {
            console.log(e)
        }

    }


    return (
        <NativeBaseProvider>
            <ScrollView>
                <View style={Estilo.Contenedor}>
                    <Box alignItems="center" style={Estilo.Contenedor} >
                        <Box marginTop={3} width="90%" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                            borderColor: "coolGray.600",
                            backgroundColor: "gray.700"
                        }} _web={{
                            shadow: 2,
                            borderWidth: 0
                        }} _light={{
                            backgroundColor: "gray.50"
                        }}>
                            <Box>
                                <AspectRatio w="100%" ratio={16 / 9}>
                                    <Image source={{
                                        uri: item.img
                                    }} alt="image" />
                                </AspectRatio>
                            </Box>
                            <Stack p="4" space={3}>
                                <Stack space={2}>
                                    <Heading size="md" ml="-1">
                                        {item.Titulo}
                                    </Heading>
                                </Stack>
                                <Text fontWeight="400">
                                    {item.Cuerpo}
                                </Text>
                                <HStack alignItems="center" space={4} justifyContent="space-between">
                                </HStack>
                            </Stack>
                        </Box>
                    </Box>;
                </View>
            </ScrollView>
        </NativeBaseProvider>

    );
}

const Estilo = StyleSheet.create({
    Contenedor: {
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        height: '100%',
    },
    Inputs: {
        backgroundColor: 'black',
        width: "70%",
        height: 50,
        justifyContent: "center",
        borderRadius: 20,
        padding: 6,
        margin: 6,
    },
    Titulo: {
        padding: 2,
        marginLeft: 6,
        color: 'black',
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'center',
        borderRadius: 10
    },
    BordeExterior: {
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 20,
        backgroundColor: '#1e1e1e',
        padding: 10,
        margin: 1
    },
    BotonAceptar: {
        backgroundColor: '#000',
        padding: 8,
        margin: 0,
        color: 'white',
        borderColor: 'red',
        borderWidth: 2,
        borderRadius: 15,
        fontWeight: 'bold',
        fontSize: 15,
        height: 60,
        width: '94%',
        fontWeight: 'bold'
    },
    Marco: {
        borderRadius: 80,
        padding: 10,
        margin: 12,
        width: "80%",
        height: "50%"
    },
    ModalProc: {
        width: 300,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "center",
        padding: 22,
        margin: 5,
        borderWidth: 1,
        borderRadius: 50
    },
});



export default Theme;
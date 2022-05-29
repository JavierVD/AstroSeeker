import { React, useState, useEffect } from "react";
import { SafeAreaView, Alert, Modal, FlatList, StyleSheet, View, Pressable } from 'react-native';
import { Heading, AspectRatio, Image, Text, Center, HStack, Stack, Divider, TextArea, Input, Button, NativeBaseProvider, Box, Circle, ScrollView } from "native-base";
import { collection, addDoc, doc, setDoc, getDocFromServer } from 'firebase/firestore';
import db from '../database/firebase';
import { getFirestore, getDocs, snapshotEqual } from 'firebase/firestore'

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
                    //alert('Se accedio a la coleccion:' + snapshot.docs)
                    let Temas = []
                    snapshot.docs.forEach((doc) => {
                        Temas.push({ ...doc.data(), id: doc.id })
                    })
                    setTemas(Temas)
                    /* Temas.forEach(doc => {
                        alert(doc.Titulo)
                        console.log(doc)//doc.Titulo puede traer los titulños de cada documento
                    }); */
                })
                .catch(err => {
                    console.log(err.message)
                })

        } catch (e) {
            console.log(e)
        }

    }

    const Execute = () => {
        temas.forEach(element => {
            //<Text>${element.Titulo}</Text>
            console.log(element.Titulo)
        });
    }



    return (
        <NativeBaseProvider>
            <ScrollView>
                <View style={Estilo.Contenedor}>
                    <Box alignItems="center"  style={Estilo.Contenedor} >
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
                                {/* <Center bg="violet.500" _dark={{
                                    bg: "violet.400"
                                }} _text={{
                                    color: "warmGray.50",
                                    fontWeight: "700",
                                    fontSize: "xs"
                                }} position="absolute" bottom="0" px="3" py="1.5">
                                    Tema
                                </Center> */}
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
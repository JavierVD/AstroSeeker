import  React, {useState, useEffect } from "react";
import { SafeAreaView, Alert, Modal, FlatList, StyleSheet, View, Pressable, TouchableOpacity } from 'react-native';
import { Heading, AspectRatio, Image, Text, Center, HStack, Stack, Divider, TextArea, Input, Button, NativeBaseProvider, Box, Circle, ScrollView } from "native-base";
import firestore from '@react-native-firebase/firestore';
import Orientation from 'react-native-orientation';
const Temas = ({ navigation }) => {

    const [temas, setTemas] = useState()

    useEffect(() => {
        getData(),
        Orientation.lockToLandscape()
    }, [])

    const getData = () => {

        try {
            const colRef = firestore().collection('Temas')
            const dataRequest = colRef.get()
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

    const renderItem = ({ item }) => {
        return (<ScrollView>
            <View>
                <TouchableOpacity onPress={()=> navigation.navigate('Tablero')}><Text style={{color: 'white', fontSize: 25}}>Regresar</Text></TouchableOpacity>
                <Box alignItems="center" marginBottom={3} width="lg">
                    <Box maxW="lg" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                        borderColor: "coolGray.600",
                        backgroundColor: "gray.700"
                    }} _web={{
                        shadow: 2,
                        borderWidth: 0
                    }} _light={{
                        backgroundColor: "gray.50"
                    }}>
                        <Box width={"lg"} bgColor={"white"}>
                            <AspectRatio w="100%" ratio={16 / 9}>
                                <Image source={{
                                    //uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg"
                                    uri: item.img
                                }} alt="image" />
                            </AspectRatio>
                        </Box>
                        <Stack p="4" space={3}>
                            <Stack space={2}>
                                <Heading size="md" ml="-1" onPress={() => navigation.navigate('Tema',{item})}>
                                    {item.Titulo}
                                </Heading>
                            </Stack>
                            <HStack alignItems="center" space={4} justifyContent="space-between">
                            </HStack>
                        </Stack>
                    </Box>
                </Box>
            </View>
        </ScrollView>)
    }

    return (
        <NativeBaseProvider>
            <ScrollView>
                <SafeAreaView style={Estilo.Contenedor} >
                    <Box width="lg" marginTop={3}>
                        <Stack direction="column" space={4}>
                            <Stack style={Estilo.BordeExterior} direction="column" space={2}>
                                <FlatList data={temas} renderItem={renderItem} />
                                {/* <Button onPress={Execute}>Execute</Button> */}
                            </Stack>
                        </Stack>
                    </Box>
                </SafeAreaView>
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



export default Temas;
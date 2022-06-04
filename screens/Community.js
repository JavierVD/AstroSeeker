import React from "react";
import { useState, useEffect } from "react";
import { SafeAreaView, TouchableOpacity, Alert, TextInput, Modal, FlatList, StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { Stack, Divider, Input, Switch, Button, NativeBaseProvider, Box } from "native-base";
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';

export default function Community  ({ route, navigation }) {

    const FechaDeHoy = () => {

        const Dia = new Date().getDate();
        const Mes = new Date().getMonth() + 1;
        const Ano = new Date().getFullYear();

        const Meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

        return "".concat(Dia, "-", Meses[Mes - 1], "-", Ano);

    }


    useEffect(() => {
        BuscarInfo();
    }, [Bus]);

    useEffect(() => {
        BuscarInfo();
        Lista
    }, [route.params]);

    //Listado de 10 post 
    const [Temas, setTemas] = useState({
        Id: "",
        Autor: "",
        Tema: "",
        Descripcion: "",
        Fecha: ""
    })

    const [Bus, setBus] = useState("")

    const handleBus = (e) => { setBus(e.target.value); console.log("Bus: ", e.target.value) }

    const handleTema = (e) => {
        setTemas(e);
        console.log(Temas)
    }

    const BuscarInfo = async () => {
        console.log("Inicia")
        const Fila = [];

        if (Bus != "") {
            const gal = firestore().collection('Topicos').orderBy("Tema").startAt(Bus).get().then(querySnapshot => {
                querySnapshot.forEach((doc) => {
                const Id = doc.id;
                const { Autor, Tema, Descripcion, Fecha } = doc.data();
                Fila.push({
                    Id,
                    Autor,
                    Tema,
                    Descripcion,
                    Fecha
                });
            });
            handleTema(Fila);
            console.log("Temas", Temas);
            })
        }
        else {
            const gal = firestore().collection('Topicos').orderBy("Fecha", 'desc').limit(10).get().then(querySnapshot => {
            querySnapshot.forEach((doc) => {
                const Id = doc.id;
                const { Autor, Tema, Descripcion, Fecha } = doc.data();
                Fila.push({
                    Id,
                    Autor,
                    Tema,
                    Descripcion,
                    Fecha
                });
            });
            handleTema(Fila);
            console.log("Fila:\n", Fila);
        })
        console.log("Fin");
        return Fila;
    }
    }


    //HowTo Propio
    const [showModal, setShowModal] = useState(false)

    const HowTo = () => {

        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={showModal}
                    onRequestClose={() => {
                        alert("Hasta la proxima c:");
                        setShowModal(!showModal);
                    }}
                >
                    <View style={{ alignItems: 'center', padding: 22, margin: 5 }}>
                        <Text style={{ alignItems: 'center', padding: 22, margin: 5 }}>Bienvenido</Text>
                        <Text style={{ alignItems: 'center', padding: 22, margin: 5 }}>AQUI SE MUESTRAN LAS DIFERENTES INSTRUCCIONES PARA MANEJAR LA APLICACION</Text>
                        <Stack space={3} direction='row'>
                            <Button style={{ width: 100 }}>{"<-"}</Button>
                            <Button style={{ width: 100 }} onPress={() => setShowModal(!showModal)}>X</Button>
                            <Button style={{ width: 100 }}>{"->"}</Button>
                        </Stack>
                    </View>
                </Modal>
            </View>
        );
    }

    const NewPostButton = () => {
        return (
            <SafeAreaView>
                <View>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => { navigation.navigate("newPost") }}
                        style={Estilo.TouchableFlotante}>
                        <Image
                            source={require("./../assets/Agregar.png")}
                            style={Estilo.BotonFlotante} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    const ManagePostButton = () => {
        return (
            <SafeAreaView>
                <View>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => { navigation.navigate("ManagePost") }}
                        style={Estilo.TouchableFlotante3}>
                        <Image
                            source={require("./../assets/Lista.png")}
                            style={Estilo.BotonFlotante3} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    const HowToButton = () => {
        return (
            <SafeAreaView>
                <View>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => { setShowModal(!showModal) }}
                        style={Estilo.TouchableFlotante2}>
                        <Image
                            source={require("./../assets/Question.png")}
                            style={Estilo.BotonFlotante2} />

                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    //Componente del foro
    const Topicos = ({ item }) => {
        
        return (
            <View style={Estilo.Marco}>
                <Stack>
                    <Pressable style={{ height: Estilo.Titulo.height, width: Estilo.Titulo.width }} onPress={() => 
                        { navigation.navigate("ShowPost", { idPost: item.id, Autor: item.Autor, Descripcion: item.Descripcion, Tema: item.Tema }) }}>
                        <Text style={Estilo.Titulo}>{item.Tema}</Text>
                    </Pressable>
                    <Stack direction="row" space={2} style={Estilo.Caratula2}>
                        <Stack  style = {[Estilo.Caratula3, {width: 800}]} direction="row" space={2}>
                            <Image alt="Foto" style={{ borderColor: 'black', borderWidth: 2, borderRadius: 40, width: 45, height: 45 }}></Image>
                            <Text style={Estilo.Texto}>{item.Autor}</Text>
                        </Stack>
                    </Stack>
                </Stack>
            </View>

        );
    }

    const Lista = () => {
        return (
            <FlatList data={Temas} renderItem={Topicos} />
        );
    }

    return (
        <NativeBaseProvider>
            <Box flex={10} style={Estilo.Contenedor}>
                <Input value={Bus} onChange={handleBus} style={Estilo.InputBus} type="text" w="full" maxW="300px" py="0" InputRightElement=
                    {<Button size="xs" rounded="none" h="full" onPress={BuscarInfo}>Search
                    </Button>} placeholder="Tipea tu busqueda..." />
                <Divider />

                <Lista/>

                <HowTo />
            </Box>
            <NewPostButton />
            <ManagePostButton />
            <HowToButton />
        </NativeBaseProvider>


    );

}


//CSS
const Estilo = StyleSheet.create({
    Contenedor: {
        backgroundColor: '#0df',
        alignItems: 'center',
        justifyContent: 'center',
    },
    InputBus: {
        backgroundColor: '#fff',
        alignItems: 'center',
        margin: 3,
        padding: 5,
        justifyContent: 'center',
    },
    Texto: {
        backgroundColor: '#a64',
        color: 'white',
        padding: 14,
        fontWeight: 'bold',
        borderRadius: 8,
        margin: 2,
        height: 50,
        width: '70%',
    },
    Caratula: {
        width: '99%',
        alignItems: 'center',
        alignContent: 'center',
        height: '40%',
        borderRadius: 8,
        padding: 2,
        margin: 2
    },
    Caratula2: {
        width: '70%',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        height: '40%',
        borderRadius: 8,
        padding: 0,
        margin: 15
    },
    Caratula3: {
        width: '70%',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        height: '40%',
        borderRadius: 8,
        padding: 0,
        margin: 15
    },
    Lista: {
        width: '100%'
    },
    Marco: {
        backgroundColor: '#fff',
        padding: 8,
        margin: 4,
        borderColor: 'black',
        borderWidth: 5,
        borderRadius: 15,
        height: 150,
        width: 300,
    },
    Titulo: {
        backgroundColor: '#646',
        padding: 10,
        color: 'white',
        fontWeight: 'bold',
        width: '100%',
        height: 40,
        textAlign: 'center',
        borderRadius: 10
    },
    BotonEstilo: {
        backgroundColor: '#000',
        padding: 8,
        margin: 4,
        color: 'black',
        borderColor: 'red',
        borderWidth: 2,
        borderRadius: 15,
        height: 45,
        width: 70,
    },
    TouchableFlotante: {
        position: 'absolute',
        width: 65,
        height: 65,
        alignItems: 'center',
        justifyContent: 'center',
        right: 15,
        bottom: 15,
    },
    BotonFlotante: {
        resizeMode: 'contain',
        width: 65,
        height: 65,
        //backgroundColor:'black'
    },
    TouchableFlotante2: {
        position: 'absolute',
        width: 65,
        height: 65,
        alignItems: 'center',
        justifyContent: 'center',
        left: 15,
        bottom: 15,
    },
    BotonFlotante2: {
        resizeMode: 'contain',
        width: 65,
        height: 65,
        //backgroundColor:'black'
    },
    TouchableFlotante3: {
        position: 'absolute',
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        left: "45%",
        bottom: "45%",
    },
    BotonFlotante3: {
        resizeMode: 'contain',
        width: 65,
        height: 65,
        backgroundColor:'white',
        borderColor: 'white',
        borderRadius: 50,
        borderWidth: 2
    }

});


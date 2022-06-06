import React, { useEffect } from "react";
import { useState } from "react";
import { SafeAreaView, TextInput, TouchableOpacity, Alert, Modal, FlatList, StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { Heading, Stack, Button, NativeBaseProvider, Box, Divider } from "native-base";
import Orientation from 'react-native-orientation';

const Dashboard = ({ navigation }) => {
    
    const [showModal, setShowModal] = useState(false)
    useEffect(()=>{
        Orientation.lockToPortrait()
    })

    const HowTo = () => {
    
        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={showModal}
                    onRequestClose={() => {
                        Alert.alert("See you c:");
                        setShowModal(!showModal);
                    }}
                    >
                    <View style = {{alignItems: 'center', padding: 22, margin: 5}}>
                    <Text style = {{alignItems: 'center', padding: 22, margin: 5}}>Bienvenido</Text>
                        <Text style = {{alignItems: 'center', padding: 22, margin: 5}}>Aquí están las diferentes instrucciones para usar la Aplicación</Text>
                        <Stack space = {3} direction = 'row'>
                            <Button style = {{ width: 100}}>{"<-"}</Button>
                            <Button onPress = { () => setShowModal(!showModal) } style = {{ width: 100}}>X</Button>
                            <Button style = {{ width: 100}}>{"->"}</Button>
                            </Stack>
                    </View>
                </Modal>
            </View>
        );
    }

    const BotonFlotante = () =>{
        return (
            <SafeAreaView>
                <View>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={()=> { navigation.navigate("Tutorial") } }
                        style={Estilo.TouchableFlotante}>
                        <Image
                            source={require("../res/images/Question.png")}
                            style={Estilo.BotonFlotante}/>
                    
                    </TouchableOpacity>
                    </View>
            </SafeAreaView>
        );
    }

    return (
        <NativeBaseProvider>
            <Box flex={10} style={Estilo.Contenedor}>
                <Box style = {{height: 50, width: '100%', backgroundColor: 'gray'}}>
                    <Stack direction = "row" space = {2}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={()=> { navigation.navigate("Bluetooth") } }
                        style={{height: 30, width: 30, top: 10,left: 310, justifyContent: "center"}}>
                        <Image
                            source={require("../res/images/bluetooth.png")}
                            style={{width: 30, height: 30}}/>
                        </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={()=> { navigation.navigate("Configuracion")} }
                        style={{height: 30, width: 30, top: 10,left: 220, justifyContent: "center"}}>
                        <Image
                            source={require("../res/images/USA.png")}
                            style={{width: 30, height: 30}}/>
                        </TouchableOpacity>
                        </Stack>
                    </Box>
                <Box flex={10} style={Estilo.Marco}>
                    <Text style={Estilo.Titulo}>Bienvenido, Usuario X</Text>
                    <Image alt = "Foto" style = {{borderColor: 'black', borderWidth: 2, borderRadius: 60, width: 80, height: 80}}></Image>
                    <Divider style={Estilo.Divider} />
                    
                    <Stack padding = {4} space = {4} direction = "column">
                        
                        <Button onPress = { () => { navigation.navigate("Temas") } } style = {{color: "black",width: 300,height: 60,borderColor: 'blue',borderWidth: 2,borderRadius: 100,backgroundColor: "black"}}>Wiki</Button>
                        <Button onPress = { () => { navigation.navigate("Tabs") } } style = {{color: "black",width: 300,height: 60,borderColor: 'blue',borderWidth: 2,borderRadius: 100,backgroundColor: "black"}}>Panel</Button>
                        <Button onPress = { () => { navigation.navigate("Comunidad") } } style = {{color: "black",width: 300,height: 60,borderColor: 'blue',borderWidth: 2,borderRadius: 100,backgroundColor: "black"}}>Community</Button>
                        <Button onPress = { () => { navigation.navigate("Calificanos") } } style = {{color: "black",width: 300,height: 60,borderColor: 'blue',borderWidth: 2,borderRadius: 100,backgroundColor: "black"}}>Rate Us</Button>
                        <Button onPress = { () => { navigation.navigate("Sobrenosotros") } } style = {{color: "black",width: 300,height: 60,borderColor: 'blue',borderWidth: 2,borderRadius: 100,backgroundColor: "black"}}>About Us</Button>
                        </Stack>

                    </Box>
                    <HowTo/>
                    <BotonFlotante/>
            </Box>
        </NativeBaseProvider>


    );
}

//CSS
const Estilo = StyleSheet.create({
    Contenedor: {
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    Marco: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        height: '90%',
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        borderColor: 'blue',
        borderWidth: 2,
        padding: 2,
        margin: 2,
    },
    Titulo: {
        fontSize: 30,
        color: 'black',
        padding: 5,
        fontWeight: 'bold'
    },
    Texto: {
        textAlign: 'justify',
        color: 'black',
        padding: 5

    },
    Divider: {
        margin: 6,
        height: 2,
        width: '95%',
    },
    TouchableFlotante: {
        position: 'absolute',
        width: 65,
        height: 65,
        alignItems: 'center',
        justifyContent: 'center',
        left: 80,
        bottom: 10,
    },
    BotonFlotante: {
        resizeMode: 'contain',
        width: 65,
        height: 65,
    },
});


export default Dashboard;
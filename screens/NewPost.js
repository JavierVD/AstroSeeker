import  React,{ useState } from "react";
import { Alert, Modal, FlatList, StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { Stack, Divider, TextArea, Input, Button, NativeBaseProvider, Box, Circle } from "native-base";
import auth from "@react-native-firebase/auth";
import firestore from '@react-native-firebase/firestore';
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";

const NewPost = ({ navigation }) => {


    const [Usr, setUsr] = useState("Carlos") 
    //const CargarUsrLogeado = () => {
        //Aqui se asigna al usuario logeado con el Auth
        //Lo dejo fijo, para que lo asignes javys
   //     setUsr("");
   // }

    const FechaDeHoy = () => {

        const Dia = new Date().getDate();
        const Mes = new Date().getMonth() + 1;
        const Ano = new Date().getFullYear();

        const Meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

        return "".concat(Dia, "-", Meses[Mes - 1], "-", Ano);

    }

    const FechaFinal = "".concat(new Date().getDate(), "/", new Date().getMonth() + 1, "/", new Date().getFullYear())

    const [showModal, setShowModal] = useState(false)

    const changeShowModal = () => setShowModal(!showModal)

    const ProcederModal = () => {

        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={showModal}
                onRequestClose={() => {
                    alert("Hasta luego");
                    setShowModal(!showModal);
                }}
            >
                <View style={Estilo.ModalProc}>
                    <Text style={{ alignItems: 'center', padding: 22, margin: 5 , color: 'black'}}>Antes de continuar...</Text>
                    <Text style={{ alignItems: 'center', padding: 22, margin: 5 , color: 'black'}}>¿Realmente desea publicar este post?</Text>
                    <Stack space={2} direction='column'>
                        <Button style={{ width: 100 }} onPress={CrearPost}>Continuar</Button>
                        <Button style={{ width: 100 }} onPress={changeShowModal}>Cancelar</Button>
                    </Stack>
                </View>
            </Modal>
        );
    }

    const BotonVolver = () => {
        return (
            <Button style={Estilo.BotonVolver} onPress={() => { navigation.navigate("Comm") }}>Volver</Button>
        );
    }

    const CrearPost = async () => {
        console.log(Topico)
        if (Topico.Tema != "" && Topico.Descripcion != "") {

            const ref = firestore().collection('Topicos');
            await ref.add({
                Autor: Topico.Autor,
                Tema: Topico.Tema,
                Descripcion: Topico.Descripcion,
                Fecha: FechaFinal
            });

            if (ref.id != ""){
                alert("Registro exitoso");
                setShowModal(!showModal);
                navigation.navigate("Comm", { Cambio: "SI" })
            }
            else
                alert("Hubo un error al registrar");
        }
        else {
            alert("No deje los campos vacios")
        }

    }

    const [Topico, setTopico] = useState({
        Autor: Usr, 
        Tema: "",
        Descripcion: "",
        Fecha: FechaDeHoy
    })

    const handleChange = (e) => {
        console.log(e.target.pendingProps)
        e.preventDefault()
        setTopico({ ...Topico, [e.target.placeholder]: e.target.value });

    }

    return (
        <NativeBaseProvider style={Estilo.Contenedor}>
            <ProcederModal />
            <Box style={Estilo.Contenedor}>
                <Box style={Estilo.Marco}>

                    <Stack direction="column" space={4}>

                        <Stack style={Estilo.BordeExterior} direction="column" space={2}>
                            <Stack style={Estilo.BordeExterior} direction="row" space={2}>
                                <Text style={Estilo.Fecha}><FechaDeHoy /></Text>
                                <BotonVolver />
                            </Stack>

                            <Divider />
                            <Text style={Estilo.Titulo}>Topico:</Text>
                            <Input value={Topico.Tema} onChangeText={(txt)=> setTopico({ ...Topico, Tema: txt })} variant="rounded" mx="3" placeholder="Tema" />
                            <Stack style={Estilo.BordeExterior} direction="column" space={2}>
                                <Text style={Estilo.Titulo}>Descripcion:</Text>
                                <TextArea onChangeText={(txt)=> setTopico({ ...Topico, Descripcion: txt })} value={Topico.Descripcion} variant="rounded" placeholder="Descripcion" Width={Estilo.Inputs.width} />
                            </Stack>
                            <Divider />
                            <Button style={Estilo.BotonAceptar} onPress={changeShowModal}>Publicar</Button>
                        </Stack>

                    </Stack>
                </Box>
            </Box>

        </NativeBaseProvider>

    );
}

//CSS
const Estilo = StyleSheet.create({
    Contenedor: {
        backgroundColor: '#0df',
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
    Fecha: {
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'left',
    },
    BordeExterior: {
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 20,
        backgroundColor: 'white',
        padding: 10,
        margin: 1,
        width: '100%'
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
    BotonVolver: {
        backgroundColor: '#000',
        color: 'white',
        borderColor: 'red',
        borderWidth: 2,
        borderRadius: 15,
        fontWeight: 'bold',
        fontSize: 15,
        height: 40,
        width: 200,
        fontWeight: 'bold'
    }
});



export default NewPost;
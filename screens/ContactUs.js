import { React, useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Heading, Image, Text, HStack, Stack, Button, NativeBaseProvider, Box, ScrollView } from "native-base";
import { Linking } from 'react-native';

const ContactUs = ({ navigation }) => {

    const RenderItem = () => {
        return (<ScrollView>
            <View>
                <Box alignItems="center" marginBottom={3} width="lg">
                    <Box maxW="md" margin={3} rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                        borderColor: "coolGray.600",
                        backgroundColor: "gray.700"
                    }} _web={{
                        shadow: 2,
                        borderWidth: 0
                    }} _light={{
                        backgroundColor: "gray.50"
                    }}>
                        <Stack p="4" space={3}>
                            <Stack space={2}>
                                <Heading >
                                    Do you have a question? </Heading><Heading size="md" ml="-1">Send us a message!!.
                                </Heading>
                            </Stack>
                            <HStack alignItems="center" space={4} justifyContent="space-between">
                            </HStack>
                        </Stack>
                        <View style={styles.container}>
                            <Text style={styles.title}>
                                AstroSeeker
                            </Text>
                            <Image style={styles.logo} source={require('../assets/facebook.png')} alt='image' />
                            <Text style={styles.paragraph}>
                                Fb/AstroSeeker
                            </Text>
                            <Button onPress={() => Linking.openURL('https://facebook.com')}>Facebook</Button>

                            <Image marginTop={12} style={styles.gmail} source={require('../assets/gmail.png')} alt='image' />
                            <Text style={styles.paragraph}>
                                gmail: astroseeker@xeoty.com
                            </Text>
                            <Button onPress={() => Linking.openURL('https://gmail.com')}>Gmail</Button>
                        </View>
                    </Box>
                </Box>
            </View>
        </ScrollView>)
    }

    return (
        <NativeBaseProvider>
            <ScrollView>
                <SafeAreaView style={Estilo.Contenedor} >
                    <Box width="lg" height="xl" marginTop={3} marginBottom={20}>
                        <Stack direction="column" space={4}>
                            <Stack style={Estilo.BordeExterior} padding="" direction="column" space={2}>
                                <RenderItem />
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
        margin: 1,
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

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        backgroundColor: '#101010'
    },
    paragraph: {
        margin: 0,
        marginTop: 0,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
    title: {
        margin: 0,
        marginBottom: 12,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
    logo: {
        height: 128,
        width: 128,
    },
    gmail: {
        height: 85,
        width: 135,
        marginTop: 15
    }
});

export default ContactUs;
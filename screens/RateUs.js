import { React} from "react";
import { SafeAreaView, StyleSheet, View, Pressable } from 'react-native';
import { Heading, AspectRatio, Image, HStack, Stack, NativeBaseProvider, Box, ScrollView } from "native-base";
import { Linking } from 'react-native';

const RateUs = ({ navigation }) => {

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
                                <Heading size="md" ml="-1"  onPress={() => Linking.openURL('https://play.google.com')}>
                                    Please rate us and get a gift!!!.
                                </Heading>
                                <Heading alignContent={"center"}  onPress={() => Linking.openURL('https://play.google.com')}>⭐⭐⭐⭐⭐</Heading>
                            </Stack>
                            <HStack alignItems="center" space={4} justifyContent="space-between">
                            </HStack>
                        </Stack>
                        <Box width={"lg"} bgColor={"white"}>
                            <AspectRatio w="100%" ratio={16 / 9}>
                            <Image source={require('../assets/starfall.gif')}  onPress={() => Linking.openURL('https://play.google.com')} alt="Image"/>
                            </AspectRatio>
                        </Box>
                    </Box>
                </Box>
            </View>
        </ScrollView>)
    }

    return (
        <NativeBaseProvider>
            <ScrollView>
                <SafeAreaView style={Estilo.Contenedor} >
                    <Box width="lg" height="xl" marginTop={3} >
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



export default RateUs;
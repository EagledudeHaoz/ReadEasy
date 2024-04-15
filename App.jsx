import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TextInput, ImageBackground, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Speech from 'expo-speech';
import { pickImageCamera } from './components/pickImageCamera';
import { pickDocument, PickDocument } from './components/PickDocument';
import Slider from '@react-native-community/slider';

export default function App() {
    const [image, setImage] = useState(null);
    const [document, setDocument] = useState(null);
    const [extractedText, setExtractedText] = useState("");
    const [speed, setSpeed] = useState(1);
    const [pitch, setPitch] = useState(1);
    const [speaking, setSpeaking] = useState(false);
    const [ocrFailed, setOcrFailed] = useState(false);

    useEffect(() => {
        if (speaking) {
            Speech.speak(extractedText, {
                rate: speed,
                pitch: pitch,
            });
        } else {
            Speech.stop();
        }
    }, [speaking, extractedText, speed, pitch]);

    const toggleSpeak = () => {
        if (speaking) {
            Speech.stop();
            setSpeaking(false);
        } else {
            if (!extractedText) {
                Speech.speak("Text fail to be detected");
                return;
            }
    
            Speech.speak(extractedText, {
                rate: speed,
                pitch: pitch,
                onDone: () => {
                    setSpeaking(false); // Stop speaking after speaking once
                },
                onError: (error) => {
                    console.error("Speech error:", error);
                }
            });
            setSpeaking(true); // Set speaking to true when speech starts
        }
    };

    const handleSpeakButton = () => {
        toggleSpeak();
    };

    const handleOcrFail = () => {
        setExtractedText("Fail to perform OCR");
        setOcrFailed(true);
    };

    return (
        <ImageBackground source={require('./ReadEasy Logo.png')} style={styles.container} resizeMode="repeat">
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.content}>
                    {image && <Image source={{ uri: image }} style={styles.image} />}
                    {document && <Image source={{ uri: document }} style={styles.document} />}
                    <Text style={styles.heading}>Extracted text:</Text>
                    <TextInput
                        style={[styles.textInput, ocrFailed && styles.failText]}
                        value={extractedText}
                        onChangeText={setExtractedText}
                        multiline
                    />
                    <View style={styles.sliderContainer}>
                        <Text style={styles.sliderText}>Speed: <Text style={styles.bold}>{speed.toFixed(1)}</Text></Text>
                        <Slider
                            style={styles.slider}
                            minimumValue={0.5}
                            maximumValue={2}
                            step={0.1}
                            value={speed}
                            onValueChange={(value) => setSpeed(value)}
                        />
                    </View>
                    <View style={styles.sliderContainer}>
                        <Text style={styles.sliderText}>Pitch: <Text style={styles.bold}>{pitch.toFixed(1)}</Text></Text>
                        <Slider
                            style={styles.slider}
                            minimumValue={0.5}
                            maximumValue={2}
                            step={0.1}
                            value={pitch}
                            onValueChange={(value) => setPitch(value)}
                        />
                    </View>
                    <Button title={speaking ? "Stop" : "Speak"} onPress={handleSpeakButton} />
                    <View style={styles.buttonContainer}>
                        <Button
                            style={styles.button}
                            title="Camera"
                            onPress={() => pickImageCamera(setImage, setExtractedText, handleOcrFail)}
                        />
                        <Button
                            style={styles.button}
                            title="Document"
                            onPress={() => pickDocument(setDocument, setExtractedText, handleOcrFail)}
                        />
                    </View>
                </View>
            </ScrollView>
            <StatusBar style="auto" />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 50,
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: 'black',
        padding: 10, 
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
    },
    image: {
        width: 250,
        height: 200,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    document: {
        width: 300,
        height: 200,
        marginBottom: 10,
    },
    textInput: {
        width: '100%',
        height: 200,
        borderColor: 'gray',
        borderWidth: 3,
        marginTop: 20,
        padding: 10, 
    },
    failText: {
        color: 'red',
    },
    sliderContainer: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    
    slider: {
        width: '70%',
    },
    
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        paddingHorizontal: 10,
        columnGap: 20,
    },

    sliderText: {
        fontSize: 16,
    },

    bold: {
        fontWeight: 'bold',
    },

    button: {
        width: 120,
    },
});

//
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//
//
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
//               佛祖保佑         永无BUG
//
//
//                   ( (   ( (   ( (
//                    ) )   ) )   ) )
//                   ( (   ( (   ( (
//                    )_)   )_)   )_)
//                    | |   | |   | |
//                    | |   | |   | |          
//                    | |   | |   | |          
//                    | |   | |   | |
//                    | |   | |   | |
//                    |_|   |_|   |_|
//                    | |   | |   | |
//              ______|_|___|_|___|_|_____
//             /                          \
//            /                            \66
//           /    阿弥陀佛       我佛慈悲     \
//          (                                )
//           \                              /
//            \____________________________/
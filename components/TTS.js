import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

const TTS = ({ extractedText, status, setStatus }) => {
    const [speed, setSpeed] = useState(1);
    const [pitch, setPitch] = useState(1);    
    const [speaking, setSpeaking] = useState(false);

    useEffect(() => {
        if (speaking) {
            Speech.speak(extractedText, {
                rate: speed,
                pitch: pitch,
            }).then(() => setSpeaking(false)); // After speaking, set speaking to false
        }
    }, [speaking, extractedText, speed, pitch]);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Text to Speech</Text>
            <View style={styles.sliderContainer}>
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
            </View>    
        </View>
    );
};

const styles = StyleSheet.create({
    label: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    text: {
        fontSize: 20,
        marginBottom: 20,
    },

    container: {
        alignItems: 'center',
    },

    controlContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },

    value: {
        marginLeft: 10,
        marginRight: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },

    sliderContainer: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
    },

    sliderText: {
        fontSize: 16,
    },

    bold: {
        fontWeight: 'bold',
    },
});

export { TTS };

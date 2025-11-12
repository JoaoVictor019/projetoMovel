// screens/SplashScreen.js
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
    const navigation = useNavigation();
    const [progress, setProgress] = useState(0); // Estado para controlar a porcentagem
    const progressAnim = useRef(new Animated.Value(0)).current; // Valor animado para a barra de progresso

    useEffect(() => {
        // Função para animar a barra de carregamento de 0 a 100%
        Animated.timing(progressAnim, {
            toValue: 100,
            duration: 3000, // Duração de 3 segundos
            useNativeDriver: false,
        }).start();

        // Atualiza a porcentagem de progresso
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev < 100) {
                    return prev + 1;
                } else {
                    clearInterval(interval);
                    return prev;
                }
            });
        }, 30); // Atualiza a cada 30ms para coincidir com a duração

        // Navega para a tela de login após 3 segundos
        const timer = setTimeout(() => {
            navigation.replace('Login');
        }, 3000);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [navigation, progressAnim]);

    const widthInterpolated = progressAnim.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
    });

    return (
        <View style={styles.container}>
            <Image
                source={require('../images/logo.png')} // Caminho atualizado para o logo
                style={styles.logo}
                resizeMode="contain"
            />

            {/* Barra de progresso */}
            <View style={styles.progressBarContainer}>
                <Animated.View style={[styles.progressBar, { width: widthInterpolated }]} />
            </View>

            {/* Texto indicando a porcentagem */}
            <Text style={styles.progressText}>{progress}%</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#12023d', // Cor de fundo
    },
    logo: {
        width: '80%',
        height: '40%',
        marginBottom: 20,
    },
    progressBarContainer: {
        width: '80%',
        height: 10,
        borderWidth: 2,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#250155',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#fff',
    },
    progressText: {
        marginTop: 10,
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SplashScreen;

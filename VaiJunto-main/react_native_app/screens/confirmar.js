import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const ConfirmarCarona = () => {
    const navigation = useNavigation();
    const route = useRoute();

    // Recebe os dados da carona a partir da tela anterior
    const { carona } = route.params;

    const handleConfirmar = () => {
        // Lógica para confirmar a carona
        console.log('Carona confirmada:', carona);
        // Após confirmação, navegar para a tela de confirmação ou principal
        navigation.navigate('TelaPrincipal');
    };

    return (
        <View style={styles.screenContainer}>
            <Text style={styles.title}>Confirme as informações</Text>

            {/* Informações de Local de Saída, Destino e Data */}
            <View style={styles.infoContainer}>
                <View style={styles.rowContainer}>
                    <Icon name="place" size={24} color="#fff" style={styles.icon} />
                    <Text style={styles.labelText}>Local de saída:</Text>
                    <Text style={styles.valueText}>{carona.localSaida}</Text>
                </View>

                <View style={styles.rowContainer}>
                    <Icon name="place" size={24} color="#fff" style={styles.icon} />
                    <Text style={styles.labelText}>Destino:</Text>
                    <Text style={styles.valueText}>{carona.destino}</Text>
                </View>

                <View style={styles.rowContainer}>
                    <Icon name="calendar-today" size={24} color="#fff" style={styles.icon} />
                    <Text style={styles.labelText}>Data:</Text>
                    <Text style={styles.valueText}>{carona.data}</Text>
                </View>
            </View>

            {/* Informações do Motorista */}
            <View style={styles.infoContainer}>  
                <View style={styles.driverContainer}>
                    <Image source={{ uri: 'https://thispersondoesnotexist.com' }} style={styles.driverImage} />
                    <View style={styles.driverInfo}>
                        <View style={styles.rowContainer}>
                            <Icon name="person" size={24} color="#fff" style={styles.icon} />
                            <Text style={styles.labelText}>Motorista:</Text>
                            <Text style={styles.valueText}>{carona.nomeMotorista}</Text>
                        </View>

                        <View style={styles.rowContainer}>
                            <Icon name="school" size={24} color="#fff" style={styles.icon} />
                            <Text style={styles.labelText}>Curso:</Text>
                            <Text style={styles.valueText}>{carona.curso}</Text>
                        </View>

                        <View style={styles.rowContainer}>
                            <Icon name="directions-car" size={24} color="#fff" style={styles.icon} />
                            <Text style={styles.labelText}>Carro:</Text>
                            <Text style={styles.valueText}>{carona.modeloCarro}</Text>
                        </View>

                        <View style={styles.rowContainer}>
                            <Icon name="people" size={24} color="#fff" style={styles.icon} />
                            <Text style={styles.labelText}>Número de pessoas:</Text>
                            <Text style={styles.valueText}>{carona.numeroPessoas}</Text>
                        </View>

                        <View style={styles.rowContainer}>
                            <Icon name="access-time" size={24} color="#fff" style={styles.icon} />
                            <Text style={styles.labelText}>Horário:</Text>
                            <Text style={styles.valueText}>{carona.horarioSaida}</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Botão de Confirmar */}
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmar}>
                <Text style={styles.buttonText}>Confirmar Carona</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#12023d',
        padding: 16,
    },
    title: {
        marginTop: 70,
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: '#fff',
    },
    infoContainer: {
        backgroundColor: '#250155',
        borderColor: '#4f0466',
        borderWidth: 4,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    icon: {
        marginRight: 8,
    },
    labelText: {
        color: '#999',
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,  // Ocupa espaço restante
    },
    valueText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    driverContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    driverImage: {
        width: 80,
        height: 80,
        borderRadius: 40,  // Para tornar a imagem circular
        marginRight: 16,
    },
    driverInfo: {
        flex: 1,
    },
    confirmButton: {
        backgroundColor: '#ff4800',
        borderRadius: 10,
        paddingVertical: 16,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ConfirmarCarona;

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MatchScreen = () => {
    const navigation = useNavigation();

    // Dados fictícios para exibir na tela
    const caronas = [
        {
            id: '1',
            nome: 'João Silva',
            foto: 'https://thispersondoesnotexist.com',
            data: '22/10/2024',
            horarioSaida: '08:00',
            vagas: 3,
            modeloCarro: 'Fusca',
            corCarro: 'Azul',
        },
        {
            id: '2',
            nome: 'Maria Oliveira',
            foto: 'https://thispersondoesnotexist.com',
            data: '23/10/2024',
            horarioSaida: '09:00',
            vagas: 2,
            modeloCarro: 'Civic',
            corCarro: 'Preto',
        },
        // Adicione mais dados aqui conforme necessário
    ];

    const handlePress = (carona) => {
        navigation.navigate('Confirmar', { carona });
    };

    const renderCarona = ({ item }) => (
        <TouchableOpacity style={styles.container} onPress={() => handlePress('item')}>
            <View style={styles.circle}>
                <Image source={{ uri: item.foto }} style={styles.userImage} />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.nameText}>{item.nome}</Text>

                {/* Linha Vertical Separadora */}
                <View style={styles.separator} />
                
                {/* Ícone do carro e informações do carro */}
                <View style={styles.carInfoContainer}>
                    <Icon name="directions-car" size={20} color="#fff" style={styles.icon} />
                    <Text style={styles.carText}>{`${item.modeloCarro} - ${item.corCarro}`}</Text>
                </View>

                {/* Ícones para data, horário e vagas */}
                <View style={styles.rowContainer}>
                    <Icon name="calendar-today" size={20} color="#fff" style={styles.icon} />
                    <View style={styles.infoTextContainer}>
                        <Text style={styles.labelText}>Data:</Text>
                        <Text style={styles.valueText}>{item.data}</Text>
                    </View>
                </View>
                
                <View style={styles.rowContainer}>
                    <Icon name="access-time" size={20} color="#fff" style={styles.icon} />
                    <View style={styles.infoTextContainer}>
                        <Text style={styles.labelText}>Horário de saída:</Text>
                        <Text style={styles.valueText}>{item.horarioSaida}</Text>
                    </View>
                </View>
                
                <View style={styles.rowContainer}>
                    <Icon name="person" size={20} color="#fff" style={styles.icon} />
                    <View style={styles.infoTextContainer}>
                        <Text style={styles.labelText}>Vagas disponíveis:</Text>
                        <Text style={styles.valueText}>{item.vagas}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.screenContainer}>
            <Text style={styles.title}>Encontrar carona</Text>
            <FlatList
                data={caronas}
                renderItem={renderCarona}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#12023d',
    },
    list: {
        padding: 16,
        flexGrow: 1,
    },
    title: {
        marginTop: 70,
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: '#fff',
    },
    container: {
        flexDirection: 'row',
        backgroundColor: '#250155',
        borderColor: '#4f0466',
        borderWidth: 4,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        alignItems: 'center',
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: 'hidden',
        marginRight: 16,
    },
    userImage: {
        width: '100%',
        height: '100%',
    },
    infoContainer: {
        flex: 1,
    },
    nameText: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
    carInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    carText: {
        marginTop: 8,
        color: '#fff',
        fontSize: 16,
        marginLeft: 20,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start', // Alinha os ícones e textos na parte superior
        marginTop: 5,
    },
    infoTextContainer: {
        marginLeft: 8,
        marginLeft: 20,

    },
    labelText: {
        color: '#999',
        fontSize: 14,
    },
    valueText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    separator: {
        marginTop: 35,
        height: 158, // Altura da linha vertical
        width: 4, // Largura da linha
        backgroundColor: '#4f0466', // Cor da linha
        position: 'absolute',
        left: 26, // Ajuste a posição da linha conforme necessário
        top: 0, // Começa do topo do container
        bottom: 0, // Vai até o fundo do container
    },
    icon: {
        marginTop: 12,
    },
});

export default MatchScreen;

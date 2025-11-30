// frontend/react_native_app/screens/MinhasCaronas.js
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MinhasCaronasScreen({ navigation }) {
  const [caronas, setCaronas] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarCaronas = async () => {
    try {
      const armazenadas = await AsyncStorage.getItem('minhasCaronas');
      if (armazenadas) {
        setCaronas(JSON.parse(armazenadas));
      } else {
        setCaronas([]);
      }
    } catch (error) {
      console.error('[MINHAS CARONAS] Erro ao carregar:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      carregarCaronas();
    });

    return unsubscribe;
  }, [navigation]);

  const cancelarCarona = (index) => {
    Alert.alert(
      'Cancelar carona',
      'Tem certeza que deseja cancelar esta carona?',
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim',
          style: 'destructive',
          onPress: async () => {
            try {
              const novaLista = [...caronas];
              novaLista.splice(index, 1);
              setCaronas(novaLista);
              await AsyncStorage.setItem('minhasCaronas', JSON.stringify(novaLista));
            } catch (error) {
              console.error('[MINHAS CARONAS] Erro ao cancelar:', error);
              Alert.alert('Erro', 'Não foi possível cancelar a carona.');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.content}>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>Minhas Caronas</Text>
          <Text style={styles.subtitle}>Caronas que você aceitou</Text>
        </View>

        {loading ? (
          <Text style={styles.loadingText}>Carregando...</Text>
        ) : caronas.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>Nenhuma carona aceita ainda.</Text>
            <Text style={styles.emptyText}>
              Vá até a tela "Buscar Carona" e aceite uma carona para vê-la aqui.
            </Text>
          </View>
        ) : (
          <ScrollView
            style={styles.list}
            contentContainerStyle={styles.listContent}
          >
            {caronas.map((carona, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.route}>
                  {carona.origem} → {carona.destino}
                </Text>
                <Text style={styles.info}>
                  Dia {carona.data} às {carona.horario}
                </Text>
                <Text style={styles.info}>
                  Motorista: {carona.motorista || carona.motorista_nome}
                </Text>
                <Text style={styles.info}>Vagas: {carona.vagas}</Text>

                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => cancelarCarona(index)}
                >
                  <Text style={styles.cancelText}>Cancelar carona</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6B46C1',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 6,
    marginTop: 10,
    marginBottom: 10,
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#E9D5FF',
  },
  loadingText: {
    color: '#FFF',
    textAlign: 'center',
    marginTop: 20,
  },
  list: {
    flex: 1,
    marginTop: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  route: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 4,
  },
  info: {
    fontSize: 14,
    color: '#444',
    marginBottom: 2,
  },
  cancelButton: {
    marginTop: 10,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EF4444',
    alignItems: 'center',
  },
  cancelText: {
    color: '#EF4444',
    fontWeight: 'bold',
  },
  emptyCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 6,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
});

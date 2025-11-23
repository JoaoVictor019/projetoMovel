import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from '../services/supabase';

export default function BuscarCaronaScreen({ navigation }) {
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [caronas, setCaronas] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [caronaSelecionada, setCaronaSelecionada] = useState(null);

  // máscaras iguais às que eu te passei antes
  const formatarData = (texto) => {
    const somenteDigitos = texto.replace(/\D/g, '').slice(0, 8);
    let formatado = somenteDigitos;

    if (somenteDigitos.length > 4) {
      formatado = `${somenteDigitos.slice(0, 2)}/${somenteDigitos.slice(
        2,
        4
      )}/${somenteDigitos.slice(4)}`;
    } else if (somenteDigitos.length > 2) {
      formatado = `${somenteDigitos.slice(0, 2)}/${somenteDigitos.slice(2)}`;
    }

    return formatado;
  };

  const formatarHorario = (texto) => {
    const somenteDigitos = texto.replace(/\D/g, '').slice(0, 4);
    let formatado = somenteDigitos;

    if (somenteDigitos.length > 2) {
      formatado = `${somenteDigitos.slice(0, 2)}:${somenteDigitos.slice(2)}`;
    }

    return formatado;
  };

  const handleBuscar = async () => {
    if (!origem || !destino || !data || !horario) {
      Alert.alert(
        'Campos obrigatórios',
        'Preencha origem, destino, data e horário para buscar caronas.'
      );
      return;
    }

    try {
      let query = supabase
        .from('caronas')
        .select('*')
        .order('data', { ascending: true })
        .order('horario', { ascending: true });

      // filtros básicos (usar %texto% pra facilitar)
      if (origem) {
        query = query.ilike('origem', `%${origem}%`);
      }
      if (destino) {
        query = query.ilike('destino', `%${destino}%`);
      }
      if (data) {
        query = query.eq('data', data);
      }
      if (horario) {
        // aqui podemos usar eq ou ilike pra permitir "18"
        query = query.eq('horario', horario);
      }

      const { data: resultado, error } = await query;

      if (error) {
        console.error('[BUSCAR] Erro Supabase:', error);
        Alert.alert('Erro', 'Não foi possível buscar caronas agora.');
        return;
      }

      if (!resultado || resultado.length === 0) {
        setCaronas([]);
        Alert.alert('Nenhuma carona encontrada', 'Tente outro horário ou data.');
        return;
      }

      // adapta pro formato usado no resto da tela
      const caronasAdaptadas = resultado.map((c) => ({
        id: c.id,
        origem: c.origem,
        destino: c.destino,
        motorista: c.motorista_nome || 'Motorista',
        vagas: c.vagas,
        data: c.data,
        horario: c.horario,
        observacoes: c.observacoes,
      }));

      setCaronas(caronasAdaptadas);
    } catch (error) {
      console.error('[BUSCAR] Erro inesperado:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao buscar caronas.');
    }
  };

  const abrirModal = (carona) => {
    setCaronaSelecionada(carona);
    setModalVisible(true);
  };

  const handleAceitarCarona = async () => {
    if (!caronaSelecionada) return;

    try {
      const armazenadas = await AsyncStorage.getItem('minhasCaronas');
      let lista = [];

      if (armazenadas) {
        try {
          lista = JSON.parse(armazenadas);
        } catch (e) {
          console.error('[MINHAS CARONAS] Erro ao parsear JSON:', e);
          lista = [];
        }
      }

      const novaCarona = {
        ...caronaSelecionada,
        aceitaEm: new Date().toISOString(),
      };

      lista.push(novaCarona);

      await AsyncStorage.setItem('minhasCaronas', JSON.stringify(lista));

      Alert.alert(
        'Carona aceita!',
        'Essa carona foi adicionada em "Minhas Caronas".'
      );

      setModalVisible(false);
    } catch (error) {
      console.error('[MINHAS CARONAS] Erro ao salvar carona:', error);
      Alert.alert('Erro', 'Não foi possível salvar a carona. Tente novamente.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>

            {/* 🔙 BOTÃO VOLTAR */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.backButtonText}>← Voltar</Text>
            </TouchableOpacity>

            <View style={styles.header}>
              <Text style={styles.title}>Buscar Carona</Text>
              <Text style={styles.subtitle}>Encontre caronas disponíveis</Text>
            </View>

            <View style={styles.form}>
              <Text style={styles.label}>Origem</Text>
              <TextInput
                style={styles.input}
                placeholder="De onde você vai partir?"
                placeholderTextColor="#999"
                value={origem}
                onChangeText={setOrigem}
              />

              <Text style={styles.label}>Destino</Text>
              <TextInput
                style={styles.input}
                placeholder="Para onde você quer ir?"
                placeholderTextColor="#999"
                value={destino}
                onChangeText={setDestino}
              />

              <Text style={styles.label}>Data</Text>
              <TextInput
                style={styles.input}
                placeholder="DD/MM/AAAA"
                placeholderTextColor="#999"
                value={data}
                onChangeText={(t) => setData(formatarData(t))}
                keyboardType="numeric"
              />

              <Text style={styles.label}>Horário</Text>
              <TextInput
                style={styles.input}
                placeholder="HH:MM"
                placeholderTextColor="#999"
                value={horario}
                onChangeText={(t) => setHorario(formatarHorario(t))}
                keyboardType="numeric"
              />

              <TouchableOpacity style={styles.button} onPress={handleBuscar}>
                <Text style={styles.buttonText}>Buscar Caronas</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.resultsSection}>
              <Text style={styles.sectionTitle}>Caronas Disponíveis</Text>

              {caronas.length === 0 ? (
                <View style={styles.resultCard}>
                  <Text style={styles.resultText}>Nenhuma carona encontrada ainda.</Text>
                  <Text style={styles.resultSubtext}>
                    Preencha os campos acima e toque em "Buscar Caronas"
                  </Text>
                </View>
              ) : (
                <ScrollView style={styles.resultsScroll} contentContainerStyle={styles.resultsScrollContent}>
                  {caronas.map((carona) => (
                    <TouchableOpacity
                      key={carona.id}
                      style={styles.resultCard}
                      onPress={() => abrirModal(carona)}
                    >
                      <Text style={styles.resultRoute}>
                        {carona.origem} → {carona.destino}
                      </Text>
                      <Text style={styles.resultInfo}>
                        Dia {carona.data} às {carona.horario}
                      </Text>
                      <Text style={styles.resultDriver}>
                        Motorista: {carona.motorista} • Vagas: {carona.vagas}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            {caronaSelecionada && (
              <>
                <Text style={styles.modalTitle}>
                  {caronaSelecionada.origem} → {caronaSelecionada.destino}
                </Text>

                <Text style={styles.modalInfo}>
                  Dia {caronaSelecionada.data} às {caronaSelecionada.horario}
                </Text>

                <Text style={styles.modalInfo}>
                  Motorista: {caronaSelecionada.motorista}
                </Text>

                <Text style={styles.modalInfo}>
                  Vagas disponíveis: {caronaSelecionada.vagas}
                </Text>

                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={handleAceitarCarona}
                >
                  <Text style={styles.acceptText}>Aceitar Carona</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeText}>Fechar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ... (pode manter exatamente os mesmos estilos que você já tinha)
  container: {
    flex: 1,
    backgroundColor: '#6B46C1',
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 6,
    marginBottom: 10,
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  keyboardView: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#E9D5FF',
  },
  form: {
    width: '100%',
    marginBottom: 30,
  },
  label: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#F97316',
    borderRadius: 10,
    padding: 18,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultsSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 15,
  },
  resultsScroll: {
    maxHeight: 260,
  },
  resultsScrollContent: {
    paddingBottom: 10,
  },
  resultCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },
  resultRoute: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 4,
  },
  resultInfo: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
  resultDriver: {
    fontSize: 14,
    color: '#555',
  },
  resultText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
    textAlign: 'center',
  },
  resultSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: '#FFF',
    width: '85%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInfo: {
    fontSize: 16,
    marginBottom: 6,
  },
  acceptButton: {
    backgroundColor: '#16A34A',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
  },
  acceptText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
  },
  closeText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

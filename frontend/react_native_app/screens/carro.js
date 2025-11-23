import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import supabase from '../services/supabase';

export default function CadastroCarro({ navigation }) {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [cor, setCor] = useState('');
  const [placa, setPlaca] = useState('');
  const [modalMarcaVisible, setModalMarcaVisible] = useState(false);
  const [modalCorVisible, setModalCorVisible] = useState(false);

  const marcas = ['Fiat', 'Chevrolet', 'Volkswagen', 'Ford', 'Toyota', 'Honda', 'Nissan', 'Outro'];
  const cores = ['Branco', 'Preto', 'Cinza', 'Prata', 'Vermelho', 'Azul', 'Outro'];

  const handleCadastroCarro = async () => {
    if (!marca || !modelo || !cor || !placa) {
      Alert.alert('Campos obrigatórios', 'Preencha Marca, Modelo, Cor e Placa.');
      return;
    }

    try {
      const { data: authData, error: authError } = await supabase.auth.getUser();

      if (authError || !authData?.user) {
        console.error('[CARRO] Erro ao pegar usuário:', authError);
        Alert.alert('Erro', 'Usuário não autenticado.');
        return;
      }

      const user = authData.user;

      const { error: insertError } = await supabase
        .from('carros')
        .insert([
          {
            user_id: user.id,
            marca: marca,
            modelo: modelo,
            cor: cor,
            placa: placa,
          },
        ]);

      if (insertError) {
        console.error(
          '[CARRO] Erro ao salvar carro:',
          insertError.message,
          insertError.details,
          insertError.hint,
          insertError.code
        );
        Alert.alert('Erro', 'Não foi possível cadastrar o carro.');
        return;
      }

      // ✅ Aviso de sucesso + navegação
      Alert.alert('Sucesso!', 'Carro cadastrado com sucesso!', [
        { text: 'OK', onPress: () => navigation.navigate('Home') },
      ]);

      // limpa campos (se o usuário voltar pra tela depois)
      setMarca('');
      setModelo('');
      setCor('');
      setPlaca('');
    } catch (e) {
      console.error('[CARRO] Erro inesperado:', e);
      Alert.alert('Erro inesperado', 'Ocorreu um erro ao cadastrar o carro.');
    }
  };

  const selectMarca = (selectedMarca) => {
    setMarca(selectedMarca);
    setModalMarcaVisible(false);
  };

  const selectCor = (selectedCor) => {
    setCor(selectedCor);
    setModalCorVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>

            {/* 🔙 Botão Voltar */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.backButtonText}>← Voltar</Text>
            </TouchableOpacity>

            <View style={styles.header}>
              <Text style={styles.title}>Cadastrar Carro</Text>
              <Text style={styles.subtitle}>Informe os dados do seu veículo</Text>
            </View>

            <View style={styles.form}>
              <Text style={styles.label}>Marca</Text>
              <TouchableOpacity
                style={styles.selectInput}
                onPress={() => setModalMarcaVisible(true)}
              >
                <Text style={marca ? styles.selectText : styles.selectPlaceholder}>
                  {marca || 'Selecione a marca'}
                </Text>
              </TouchableOpacity>

              <Text style={styles.label}>Modelo</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Uno, Onix, Corolla..."
                placeholderTextColor="#999"
                value={modelo}
                onChangeText={setModelo}
              />

              <Text style={styles.label}>Cor</Text>
              <TouchableOpacity
                style={styles.selectInput}
                onPress={() => setModalCorVisible(true)}
              >
                <Text style={cor ? styles.selectText : styles.selectPlaceholder}>
                  {cor || 'Selecione a cor'}
                </Text>
              </TouchableOpacity>

              <Text style={styles.label}>Placa</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: ABC1D23"
                placeholderTextColor="#999"
                value={placa}
                onChangeText={setPlaca}
                autoCapitalize="characters"
              />

              <TouchableOpacity style={styles.button} onPress={handleCadastroCarro}>
                <Text style={styles.buttonText}>Cadastrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal Marca */}
      <Modal
        animationType="slide"
        transparent
        visible={modalMarcaVisible}
        onRequestClose={() => setModalMarcaVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Selecione a marca</Text>
            <FlatList
              data={marcas}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => selectMarca(item)}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalMarcaVisible(false)}
            >
              <Text style={styles.modalCloseText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal Cor */}
      <Modal
        animationType="slide"
        transparent
        visible={modalCorVisible}
        onRequestClose={() => setModalCorVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Selecione a cor</Text>
            <FlatList
              data={cores}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => selectCor(item)}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalCorVisible(false)}
            >
              <Text style={styles.modalCloseText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6B46C1', // mesmo roxo das outras telas
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },

  // botão voltar
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
    marginBottom: 30,
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
    marginTop: 10,
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

  // "input" de seleção (marca/cor)
  selectInput: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    justifyContent: 'center',
  },
  selectText: {
    fontSize: 16,
    color: '#333',
  },
  selectPlaceholder: {
    fontSize: 16,
    color: '#999',
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

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: '#FFF',
    width: '85%',
    maxHeight: '70%',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#EEE',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  modalCloseButton: {
    marginTop: 15,
    backgroundColor: '#F97316',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalCloseText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

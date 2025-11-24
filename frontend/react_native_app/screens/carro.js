import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView,  Platform, Modal, FlatList } from 'react-native';

const CadastroCarro = ({ navigation }) => {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [cor, setCor] = useState('');
  const [placa, setPlaca] = useState('');
  const [modalMarcaVisible, setModalMarcaVisible] = useState(false);
  const [modalCorVisible, setModalCorVisible] = useState(false);

  const marcas = ['Ford', 'Chevrolet', 'Volkswagen', 'Fiat', 'Toyota', 'Honda', 'Nissan', 'Outro'];
  const cores = ['Branco', 'Preto', 'Cinza', 'Prata', 'Vermelho', 'Outro'];

  const handleCadastroCarro = () => {
    // Aqui, você pode implementar a lógica para armazenar as informações do carro
    navigation.goBack(); // Voltar para a tela anterior após o cadastro
  };

  const selectMarca = (selectedMarca) => {
    setMarca(selectedMarca);
    setModalMarcaVisible(false); // Fechar o modal após a seleção
  };

  const selectCor = (selectedCor) => {
    setCor(selectedCor);
    setModalCorVisible(false);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80} // Ajuste para a posição do teclado
    >
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.innerContainer}>
          <Text style={styles.title}>Cadastrar Carro</Text>

          <TouchableOpacity style={styles.input} onPress={() => setModalMarcaVisible(true)}>
            <Text style={marca ? styles.selectedText : styles.placeholderText}>
              {marca || 'Marca'}
            </Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Modelo"
            placeholderTextColor="#FFF"
            value={modelo}
            onChangeText={setModelo}
          />

          <TouchableOpacity style={styles.input} onPress={() => setModalCorVisible(true)}>
            <Text style={cor ? styles.selectedText : styles.placeholderText}>
              {cor || 'Cor'}
            </Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Placa"
            placeholderTextColor="#FFF"
            value={placa}
            onChangeText={setPlaca}
          />

          <TouchableOpacity style={styles.button} onPress={handleCadastroCarro}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Modal para seleção de marcas */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalMarcaVisible}
          onRequestClose={() => setModalMarcaVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <FlatList
                data={marcas}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    style={styles.modalItem} 
                    onPress={() => selectMarca(item)}
                  >
                    <Text style={styles.modalText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalCorVisible(false)}>
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal para seleção de cores */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalCorVisible}
          onRequestClose={() => setModalCorVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <FlatList
                data={cores}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    style={styles.modalItem} 
                    onPress={() => selectCor(item)}
                  >
                    <Text style={styles.modalText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalCorVisible(false)}>
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12023d',
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    fontSize: 18,
    margin: 10,
    height: 50,
    borderColor: '#4f0466',
    borderWidth: 4,
    paddingHorizontal: 10,
    borderRadius: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  placeholderText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#ff4800',
    borderWidth: 2,
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
    width: 300,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semitransparente
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#12023d',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#4f0466',
    width: '100%',
  },
  modalText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#ff4800',
    padding: 15,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default CadastroCarro;

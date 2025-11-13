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
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function OferecerCaronaScreen({ navigation }) {
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [vagas, setVagas] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const handleOferecer = () => {
    // Lógica de oferta de carona aqui
    console.log('Oferecer carona:', { origem, destino, data, horario, vagas, observacoes });
    // Salvar carona e mostrar confirmação
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>Oferecer Carona</Text>
              <Text style={styles.subtitle}>Compartilhe sua viagem</Text>
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
                placeholder="Para onde você está indo?"
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
                onChangeText={setData}
                keyboardType="numeric"
              />

              <Text style={styles.label}>Horário</Text>
              <TextInput
                style={styles.input}
                placeholder="HH:MM"
                placeholderTextColor="#999"
                value={horario}
                onChangeText={setHorario}
                keyboardType="numeric"
              />

              <Text style={styles.label}>Número de Vagas</Text>
              <TextInput
                style={styles.input}
                placeholder="Quantas vagas disponíveis?"
                placeholderTextColor="#999"
                value={vagas}
                onChangeText={setVagas}
                keyboardType="numeric"
              />

              <Text style={styles.label}>Observações (Opcional)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Informações adicionais sobre a carona..."
                placeholderTextColor="#999"
                value={observacoes}
                onChangeText={setObservacoes}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />

              <TouchableOpacity
                style={styles.button}
                onPress={handleOferecer}
              >
                <Text style={styles.buttonText}>Publicar Carona</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6B46C1',
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
  textArea: {
    minHeight: 100,
    paddingTop: 15,
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
});


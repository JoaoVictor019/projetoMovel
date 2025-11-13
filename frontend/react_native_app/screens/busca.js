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

export default function BuscarCaronaScreen({ navigation }) {
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');

  const handleBuscar = () => {
    // Lógica de busca de carona aqui
    console.log('Buscar carona:', { origem, destino, data, horario });
    // Navegar para resultados ou mostrar lista
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

              <TouchableOpacity
                style={styles.button}
                onPress={handleBuscar}
              >
                <Text style={styles.buttonText}>Buscar Caronas</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.resultsSection}>
              <Text style={styles.sectionTitle}>Caronas Disponíveis</Text>
              <View style={styles.resultCard}>
                <Text style={styles.resultText}>Nenhuma carona encontrada ainda.</Text>
                <Text style={styles.resultSubtext}>Faça uma busca para ver resultados</Text>
              </View>
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
  resultCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  resultSubtext: {
    fontSize: 14,
    color: '#999',
  },
});


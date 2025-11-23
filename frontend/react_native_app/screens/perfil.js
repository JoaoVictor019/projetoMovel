import React, { useState, useEffect } from 'react';
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
  ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from '../services/supabase';

export default function PerfilScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [matricula, setMatricula] = useState('');
  const [curso, setCurso] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    carregarPerfil();
  }, []);

  const carregarPerfil = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data, error } = await supabase
          .from('perfis')
          .select('*')
          .eq('id', user.id)
          .single();

        if (data && !error) {
          setNome(data.nomeCompleto || '');
          setCpf(data.cpf || '');
          setEmail(data['e-mail'] || '');
          setTelefone(data.telefone || '');
          setMatricula(data.matrícula || '');
          setCurso(data.curso || '');
          
          const perfil = {
            nome: data.nomeCompleto || '',
            cpf: data.cpf || '',
            email: data['e-mail'] || '',
            telefone: data.telefone || '',
            matricula: data.matrícula || '',
            curso: data.curso || '',
          };
          await AsyncStorage.setItem('perfil', JSON.stringify(perfil));
          return;
        }
      }

      const perfilData = await AsyncStorage.getItem('perfil');
      if (perfilData) {
        const perfil = JSON.parse(perfilData);
        setNome(perfil.nome || '');
        setCpf(perfil.cpf || '');
        setEmail(perfil.email || '');
        setTelefone(perfil.telefone || '');
        setMatricula(perfil.matricula || '');
        setCurso(perfil.curso || '');
      }
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
    }
  };

  const salvarPerfil = async () => {
    setLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { error } = await supabase
          .from('perfis')
          .update({
            nomeCompleto: nome,
            cpf: cpf,
            'e-mail': email.trim(),
            telefone: telefone || '',
            matrícula: matricula,
            curso: curso,
          })
          .eq('id', user.id);

        if (error) {
          console.error('Erro ao atualizar perfil no Supabase:', error);
          Alert.alert('Erro', 'Não foi possível salvar o perfil no servidor.');
          setLoading(false);
          return;
        }
      }

      const perfil = {
        nome,
        cpf,
        email: email.trim(),
        telefone,
        matricula,
        curso,
      };
      
      await AsyncStorage.setItem('perfil', JSON.stringify(perfil));
      
      Alert.alert('Sucesso!', 'Perfil salvo com sucesso!', [{ text: 'OK' }]);
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      Alert.alert('Erro', 'Não foi possível salvar o perfil.');
    } finally {
      setLoading(false);
    }
  };

  const handleSalvar = () => {
    if (!nome || !email) {
      Alert.alert('Erro', 'Por favor, preencha pelo menos o nome e o email.');
      return;
    }
    salvarPerfil();
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

            {/* 🔙 BOTÃO VOLTAR */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.backButtonText}>← Voltar</Text>
            </TouchableOpacity>

            <View style={styles.header}>
              <Text style={styles.title}>Editar Perfil</Text>
              <Text style={styles.subtitle}>Atualize suas informações</Text>
            </View>

            <View style={styles.form}>
              <Text style={styles.label}>Nome Completo</Text>
              <TextInput
                style={styles.input}
                placeholder="Seu nome completo"
                placeholderTextColor="#999"
                value={nome}
                onChangeText={setNome}
              />

              <Text style={styles.label}>CPF</Text>
              <TextInput
                style={styles.input}
                placeholder="000.000.000-00"
                placeholderTextColor="#999"
                value={cpf}
                onChangeText={setCpf}
                keyboardType="numeric"
              />

              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="seu@email.com"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Text style={styles.label}>Telefone</Text>
              <TextInput
                style={styles.input}
                placeholder="(00) 00000-0000"
                placeholderTextColor="#999"
                value={telefone}
                onChangeText={setTelefone}
                keyboardType="phone-pad"
              />

              <Text style={styles.label}>Matrícula</Text>
              <TextInput
                style={styles.input}
                placeholder="Sua matrícula"
                placeholderTextColor="#999"
                value={matricula}
                onChangeText={setMatricula}
              />

              <Text style={styles.label}>Curso</Text>
              <TextInput
                style={styles.input}
                placeholder="Seu curso"
                placeholderTextColor="#999"
                value={curso}
                onChangeText={setCurso}
              />

              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleSalvar}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text style={styles.buttonText}>Salvar Perfil</Text>
                )}
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

  // 🔙 ESTILO DO BOTÃO VOLTAR
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
  buttonDisabled: {
    opacity: 0.6,
  },
});

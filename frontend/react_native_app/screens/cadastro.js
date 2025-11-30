// frontend/react_native_app/screens/cadastro.js
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
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import supabase from '../services/supabase';

export default function CadastroScreen({ navigation }) {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [matricula, setMatricula] = useState('');
  const [curso, setCurso] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCadastro = async () => {
    if (!nomeCompleto || !email || !senha) {
      Alert.alert('Campos obrigatórios', 'Preencha nome, email e senha.');
      return;
    }

    try {
      setLoading(true);

      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password: senha,
      });

      if (signUpError || !signUpData?.user) {
        console.error('[CADASTRO] Erro signUp:', signUpError);
        Alert.alert('Erro', 'Não foi possível criar o usuário.');
        setLoading(false);
        return;
      }

      const user = signUpData.user;

      const { error: perfilError } = await supabase
        .from('perfis')
        .insert([
          {
            id: user.id,
            nomeCompleto,
            email: email.trim(),
            telefone,
            cpf,
            matricula,
            curso,
            is_motorista: false,
          },
        ]);

      if (perfilError) {
        console.error('[CADASTRO] Erro ao salvar perfil:', perfilError);
        Alert.alert(
          'Atenção',
          'Usuário criado, mas ocorreu um erro ao salvar o perfil.'
        );
        setLoading(false);
        return;
      }

      Alert.alert(
        'Sucesso!',
        'Cadastro realizado com sucesso!',
        [{ text: 'OK', onPress: () => navigation.replace('Login') }]
      );
    } catch (error) {
      console.error('[CADASTRO] Erro inesperado:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao realizar o cadastro.');
    } finally {
      setLoading(false);
    }
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
              <Text style={styles.title}>Criar conta</Text>
              <Text style={styles.subtitle}>Preencha seus dados</Text>
            </View>

            <View style={styles.form}>
              <Text style={styles.label}>Nome completo</Text>
              <TextInput
                style={styles.input}
                placeholder="Seu nome"
                placeholderTextColor="#999"
                value={nomeCompleto}
                onChangeText={setNomeCompleto}
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

              <Text style={styles.label}>E-mail institucional</Text>
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

              <Text style={styles.label}>Senha</Text>
              <TextInput
                style={styles.input}
                placeholder="Sua senha"
                placeholderTextColor="#999"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
              />

              <TouchableOpacity
                style={[styles.button, loading && { opacity: 0.6 }]}
                onPress={handleCadastro}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? 'Cadastrando...' : 'Cadastrar'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.linkButton}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.linkText}>Já tenho conta</Text>
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
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
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
  linkButton: {
    marginTop: 12,
    alignItems: 'center',
  },
  linkText: {
    color: '#FFF',
    textDecorationLine: 'underline',
  },
});

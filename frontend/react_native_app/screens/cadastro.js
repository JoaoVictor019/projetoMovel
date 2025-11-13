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
  ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from '../services/supabase';

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [matricula, setMatricula] = useState('');
  const [curso, setCurso] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCadastro = async () => {
    // Validação básica
    if (!nome || !cpf || !email || !matricula || !curso || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (senha.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setLoading(true);

    try {
      // Criar usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email.trim(),
        password: senha,
      });

      if (authError) {
        Alert.alert('Erro no Cadastro', authError.message);
        setLoading(false);
        return;
      }

      if (authData.user) {
        // Salvar dados do perfil no Supabase
        const { error: profileError } = await supabase
          .from('usuarios')
          .insert([
            {
              id: authData.user.id,
              nome_completo: nome,
              cpf: cpf,
              email: email.trim(),
              telefone: telefone || '',
              matricula: matricula,
              curso: curso,
            },
          ]);

        if (profileError) {
          console.error('Erro ao salvar perfil:', profileError);
          // Mesmo com erro no perfil, o usuário foi criado no auth
        }

        // Salvar dados do perfil localmente também
        const perfil = {
          nome,
          cpf,
          email: email.trim(),
          telefone: telefone || '',
          matricula,
          curso,
        };
        
        await AsyncStorage.setItem('perfil', JSON.stringify(perfil));
        
        // Resetar loading antes de mostrar alerta
        setLoading(false);
        
        // Mostrar alerta de sucesso e navegar
        Alert.alert(
          'Sucesso!',
          'Conta criada com sucesso!',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.replace('Login');
              },
            },
          ]
        );
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
      setLoading(false);
      Alert.alert('Erro', 'Não foi possível criar a conta. Tente novamente.');
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
              <Text style={styles.logo}>VaiJunto</Text>
              <Text style={styles.subtitle}>Crie sua conta</Text>
            </View>

            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Nome Completo"
                placeholderTextColor="#999"
                value={nome}
                onChangeText={setNome}
              />
              <TextInput
                style={styles.input}
                placeholder="CPF"
                placeholderTextColor="#999"
                value={cpf}
                onChangeText={setCpf}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder="Telefone"
                placeholderTextColor="#999"
                value={telefone}
                onChangeText={setTelefone}
                keyboardType="phone-pad"
              />
              <TextInput
                style={styles.input}
                placeholder="Matrícula"
                placeholderTextColor="#999"
                value={matricula}
                onChangeText={setMatricula}
              />
              <TextInput
                style={styles.input}
                placeholder="Curso"
                placeholderTextColor="#999"
                value={curso}
                onChangeText={setCurso}
              />
              <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#999"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
              />

              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleCadastro}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text style={styles.buttonText}>Cadastrar</Text>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Já tem uma conta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.footerLink}>Entrar</Text>
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
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#E9D5FF',
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#F97316',
    borderRadius: 10,
    padding: 18,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#E9D5FF',
    fontSize: 14,
  },
  footerLink: {
    color: '#F97316',
    fontSize: 14,
    fontWeight: 'bold',
  },
});


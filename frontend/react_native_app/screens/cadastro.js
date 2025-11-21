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
    const normalizedEmail = email.trim().toLowerCase();

    // 🔎 validação de campos obrigatórios
    if (!nome || !cpf || !normalizedEmail || !matricula || !curso || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // 🔐 tamanho mínimo de senha
    if (senha.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    // 📧 obrigar e-mail institucional
    if (!normalizedEmail.endsWith('@alunos.unimetrocamp.edu.br')) {
      Alert.alert(
        'E-mail institucional obrigatório',
        'Use seu e-mail institucional no formato: suamatricula@alunos.unimetrocamp.edu.br'
      );
      return;
    }

    // validação básica de formato de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      Alert.alert('Erro', 'Formato de e-mail inválido.');
      return;
    }

    setLoading(true);

    try {
      // 1) Criar usuário no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: normalizedEmail,
        password: senha,
      });

      if (authError) {
        console.log('[CADASTRO] Erro Supabase Auth:', authError);
        Alert.alert('Erro no Cadastro', authError.message);
        setLoading(false);
        return;
      }

      if (!authData || !authData.user) {
        console.log('[CADASTRO] signUp retornou sem user');
        setLoading(false);
        Alert.alert('Erro', 'Não foi possível criar a conta. Tente novamente.');
        return;
      }

      // 2) Salvar dados do perfil na tabela "perfis"
      //    Usa exatamente os nomes das colunas do print:
      //    id, nomeCompleto, email, telefone, cpf, matricula, curso, is_motorista
      const { error: profileError } = await supabase
        .from('perfis')
        .insert([
          {
            id: authData.user.id,      // liga o perfil ao usuário do Auth
            nomeCompleto: nome,
            email: normalizedEmail,
            telefone: telefone || '',
            cpf: cpf,
            matricula: matricula,
            curso: curso,
            is_motorista: false,       // por padrão não é motorista
          },
        ]);

      if (profileError) {
        console.log(
          '[CADASTRO] Erro ao salvar perfil:',
          profileError.message,
          profileError.details,
          profileError.hint,
          profileError.code
        );

        Alert.alert(
          'Erro ao salvar perfil',
          profileError.message ||
            'Usuário foi criado no Auth, mas houve erro ao salvar os dados do perfil. Verifique a tabela "perfis" no Supabase.'
        );

        setLoading(false);
        return; // não mostra alerta de sucesso
      }

      console.log('✅ Perfil salvo com sucesso no Supabase');

      // 3) Salvar dados localmente
      const perfil = {
        nome,
        cpf,
        email: normalizedEmail,
        telefone: telefone || '',
        matricula,
        curso,
      };

      await AsyncStorage.setItem('perfil', JSON.stringify(perfil));

      // 4) Salvar email e senha para uso na tela de login
      const dadosLogin = {
        email: normalizedEmail,
        senha: senha,
      };
      await AsyncStorage.setItem('dadosLogin', JSON.stringify(dadosLogin));

      setLoading(false);

      // 5) Mostrar alerta de sucesso e ir para Login
      Alert.alert('Sucesso!', 'Conta criada com sucesso!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.replace('Login');
          },
        },
      ]);
    } catch (error) {
      console.error('Erro no cadastro (try/catch):', error);
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
                placeholder="E-mail institucional"
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

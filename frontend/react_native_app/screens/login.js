import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from '../services/supabase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const inicializar = async () => {
      // Verificar se já há sessão ativa
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigation.navigate('Home');
      } else {
        // Só carrega os dados de login se não houver sessão
        carregarDadosLogin();
      }
    };
    inicializar();
  }, []);


  const carregarDadosLogin = async () => {
    try {
      const dadosLoginData = await AsyncStorage.getItem('dadosLogin');
      if (dadosLoginData) {
        const dadosLogin = JSON.parse(dadosLoginData);
        if (dadosLogin.email) {
          setEmail(dadosLogin.email);
        }
        if (dadosLogin.senha) {
          setSenha(dadosLogin.senha);
        }
        console.log('Dados de login carregados do AsyncStorage');
      }
    } catch (error) {
      console.error('Erro ao carregar dados de login:', error);
    }
  };

  const handleLogin = async () => {
    // Validar se ambos os campos estão preenchidos
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);

    try {
      // Fazer login no Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: senha,
      });

      if (error) {
        console.log('[LOGIN] Erro Supabase Auth:', error);
        Alert.alert('Erro no Login', error.message);
        setLoading(false);
        return;
      }

      if (data?.user) {
        // Carregar perfil do Supabase
        await carregarPerfilDoSupabase(data.user.id);
        
        // Navegar para Home
        navigation.replace('Home');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      Alert.alert('Erro', 'Não foi possível fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const carregarPerfilDoSupabase = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('perfis')
        .select('*')
        .eq('id', userId)
        .single();

      if (data && !error) {
        const perfil = {
          nome: data.nomeCompleto || '',
          cpf: data.cpf || '',
          email: data.email || email,
          telefone: data.telefone || '',
          matricula: data.matricula || '',
          curso: data.curso || '',
        };
        await AsyncStorage.setItem('perfil', JSON.stringify(perfil));
      }
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.logo}>VaiJunto</Text>
          <Text style={styles.subtitle}>Entre na sua conta</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            onSubmitEditing={() => {
              console.log('Enter pressionado no email');
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#999"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            autoComplete="password"
            onSubmitEditing={handleLogin}
          />

          <TouchableOpacity
            style={[
              styles.button,
              (loading || !email.trim() || !senha.trim()) && styles.buttonDisabled,
            ]}
            onPress={handleLogin}
            disabled={loading || !email.trim() || !senha.trim()}
            activeOpacity={0.7}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" size="small" />
            ) : (
              <Text style={styles.buttonText}>Entrar</Text>
            )}
          </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('RecuperarSenha')}
              style={styles.linkButton}
            >
              <Text style={styles.linkText}>Esqueceu sua senha?</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Não tem uma conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
              <Text style={styles.footerLink}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>
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
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
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
    justifyContent: 'center',
    marginTop: 10,
    minHeight: 56,
    width: '100%',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  linkButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  linkText: {
    color: '#E9D5FF',
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
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


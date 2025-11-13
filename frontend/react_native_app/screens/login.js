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
    // Não carregar email automaticamente - deixar o usuário digitar
    // carregarEmailSalvo();
    verificarSessao();
  }, []);

  const verificarSessao = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Usuário já está logado, navegar para Home
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Erro ao verificar sessão:', error);
    }
  };

  const carregarEmailSalvo = async () => {
    try {
      const perfilData = await AsyncStorage.getItem('perfil');
      if (perfilData) {
        const perfil = JSON.parse(perfilData);
        if (perfil.email) {
          setEmail(perfil.email);
          console.log('Email carregado do AsyncStorage:', perfil.email);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar email:', error);
    }
  };

  const handleLogin = async () => {
    // Navegação simples para teste
    console.log('Botão Entrar clicado - navegando para Home');
    navigation.replace('Home');
  };

  const carregarPerfilDoSupabase = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('id', userId)
        .single();

      if (data && !error) {
        const perfil = {
          nome: data.nome_completo || '',
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
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={(e) => {
              console.log('🎯 BOTÃO PRESSIONADO!');
              console.log('Event:', e);
              e?.preventDefault?.();
              handleLogin();
            }}
            onPressIn={() => console.log('onPressIn disparado')}
            onPressOut={() => console.log('onPressOut disparado')}
            disabled={loading}
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


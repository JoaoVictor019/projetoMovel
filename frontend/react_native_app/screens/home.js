import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import supabase from '../services/supabase';

export default function HomeScreen({ navigation }) {


  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigation.replace('Login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.logo}>VaiJunto</Text>
          <Text style={styles.welcome}>Bem-vindo!</Text>
        </View>

        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.navigate('BuscarCarona')}
          >
            <Text style={styles.menuButtonText}>Buscar Carona</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.navigate('OferecerCarona')}
          >
            <Text style={styles.menuButtonText}>Oferecer Carona</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.navigate('Perfil')}
          >
            <Text style={styles.menuButtonText}>Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => navigation.navigate('CadastrarCarro')}
          >
            <Text style={styles.menuButtonText}>Cadastrar Carro</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
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
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  welcome: {
    fontSize: 20,
    color: '#E9D5FF',
  },
  menu: {
    flex: 1,
    justifyContent: 'center',
  },
  menuButton: {
    backgroundColor: '#F97316',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  menuButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#F97316',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutButtonText: {
    color: '#F97316',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


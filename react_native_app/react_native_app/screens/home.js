import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>O que você busca hoje?</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Buscar')}
      >
        <Text style={styles.buttonText}>Buscar carona</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Oferecer')}>
        <Text style={styles.buttonText}>Oferecer carona</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#12023d', 
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: 'white',
  },
  button: {
    backgroundColor: '#4CAF50', 
    borderRadius: 24, 
    paddingVertical: 15, 
    paddingHorizontal: 40, 
    marginVertical: 10, 
    width: 250, 
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 

const CadastroScreen = () => {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [matricula, setMatricula] = useState('');
  const [curso, setCurso] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [serverIp, setServerIp] = useState(''); // Para armazenar o IP do servidor

  const navigation = useNavigation(); // Obtenha o objeto de navegação

  // Função para cadastrar um usuário
  const handleCadastroUsuario = async () => {
    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem!");
      return;
    }

    const dadosCadastro = {
      nome: nomeCompleto,
      cpf: cpf,
      email: email,
      telefone: telefone,
      matricula: matricula,
      curso: curso,
      senha: senha,
    };

    try {
      const response = await fetch(`http://172.16.15.23/api/cadastrar_usuario/`, {  // Ajuste na URL da requisição
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosCadastro),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
        navigation.navigate('Home'); // Navegue para a tela Home
      } else {
        console.error('Erro ao cadastrar usuário:', response.status);
        Alert.alert("Erro", "Não foi possível cadastrar o usuário.");
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
      Alert.alert("Erro", "Falha na conexão com o servidor.");
    }
  };

  // Buscar o IP do servidor
  useEffect(() => {
    const getPublicIp = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setServerIp(data.ip);  // Armazena o IP público da máquina
      } catch (error) {
        console.error(error);
      }
    };
    getPublicIp();
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80} // Ajuste para a posição do teclado
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <SafeAreaView style={styles.innerContainer}>
          <Text style={styles.title}>VaiJunto?</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome completo"
            placeholderTextColor="#ccc"
            value={nomeCompleto}
            onChangeText={setNomeCompleto}
          />

          <TextInput
            style={styles.input}
            placeholder="CPF"
            placeholderTextColor="#ccc"
            value={cpf}
            onChangeText={setCpf}
            keyboardType="numeric"
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Telefone"     
            placeholderTextColor="#ccc"
            value={telefone}
            onChangeText={setTelefone}
            keyboardType="phone-pad"
          />

          <TextInput
            style={styles.input}
            placeholder="Matrícula (RA)"
            placeholderTextColor="#ccc"
            value={matricula}
            onChangeText={setMatricula}
            keyboardType="numeric"
          />

          <TextInput
            style={styles.input}
            placeholder="Curso"
            placeholderTextColor="#ccc"
            value={curso}
            onChangeText={setCurso}
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#ccc"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          <TextInput
            style={styles.input}
            placeholder="Confirmar Senha"
            placeholderTextColor="#ccc"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleCadastroUsuario}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
          
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12023d', // Azul escuro próximo do roxo
  },
  innerContainer: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginTop: 40,
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#fff', // Cor branca para o texto
  },
  input: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    margin: 10,
    height: 50,
    borderColor: '#4f0466',
    borderWidth: 4,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 24,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#ff4800',
    borderWidth: 2,
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
    width: 300,
    alignSelf: 'center', 
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CadastroScreen;

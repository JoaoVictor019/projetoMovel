import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator
} from 'react-native';
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
  const [serverIp, setServerIp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const handleCadastroUsuario = async () => {
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem!');
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

    setIsLoading(true);
    try {
      const response = await fetch(`http://172.16.15.23/api/cadastrar_usuario/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosCadastro),
      });

      if (response.ok) {
        // mostra alerta com botão OK — só navega após usuário confirmar
        Alert.alert(
          'Sucesso',
          'Usuário cadastrado com sucesso!',
          [
            {
              text: 'OK',
              onPress: () => {
                // Se preferir voltar para a tela anterior use navigation.goBack()
                navigation.navigate('Home'); 
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        console.error('Erro ao cadastrar usuário:', response.status);
        Alert.alert('Erro', 'Não foi possível cadastrar o usuário.');
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
      Alert.alert('Erro', 'Falha na conexão com o servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getPublicIp = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        setServerIp(data.ip);
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
      keyboardVerticalOffset={80}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <SafeAreaView style={styles.innerContainer}>

          {/* Botão Voltar no topo */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              // Use navigate('Home') ou goBack() conforme sua navegação
              navigation.navigate('Home');
              // navigation.goBack();
            }}
          >
            <Text style={styles.backText}>← Voltar</Text>
          </TouchableOpacity>

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

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleCadastroUsuario}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Cadastrar</Text>
            )}
          </TouchableOpacity>

        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12023d',
  },
  innerContainer: {
    flex: 1,
    padding: 16,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: Platform.OS === 'ios' ? 50 : 20,
    zIndex: 10,
    padding: 6,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
  },
  title: {
    marginTop: 40,
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#fff',
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
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CadastroScreen;

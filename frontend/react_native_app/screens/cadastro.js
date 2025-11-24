import React, { useState } from 'react';
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
  ActivityIndicator,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../lib/supabase';

const CadastroScreen = () => {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [matricula, setMatricula] = useState('');
  const [curso, setCurso] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [successVisible, setSuccessVisible] = useState(false);
  const [successMsg, setSuccessMsg] = useState('Cadastro realizado com sucesso!');

  const navigation = useNavigation();

  const validarCampos = () => {
    if (
      !nomeCompleto.trim() ||
      !cpf.trim() ||
      !email.trim() ||
      !telefone.trim() ||
      !matricula.trim() ||
      !curso.trim() ||
      !senha.trim() ||
      !confirmarSenha.trim()
    ) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return false;
    }

    if (cpf.length !== 11 || !/^\d+$/.test(cpf)) {
      Alert.alert('Atenção', 'CPF inválido. Deve conter 11 dígitos numéricos.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Atenção', 'E-mail inválido.');
      return false;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return false;
    }

    return true;
  };

  const limparFormulario = () => {
    setNomeCompleto('');
    setCpf('');
    setEmail('');
    setTelefone('');
    setMatricula('');
    setCurso('');
    setSenha('');
    setConfirmarSenha('');
  };

  const handleCadastroUsuario = async () => {
    try {
      console.log('[CADASTRO] onPress');
      if (!validarCampos()) return;

      setIsLoading(true);
      console.log('[CADASTRO] Inserindo no Supabase...');

      // Insere na tabela "usuarios"
      const { data: usuario, error } = await supabase
        .from('usuarios')
        .insert([
          {
            nome_completo: nomeCompleto,
            cpf,
            email,
            telefone,
            matricula,
            curso,
            motorista: false,   // ajuste quando tiver o toggle de motorista
            foto_url: null,     // preencheremos após implementar upload
          },
        ])
        .select()
        .single();

      if (error) {
        console.log('[CADASTRO] erro supabase:', error);
        Alert.alert('Erro', error.message || 'Não foi possível cadastrar o usuário.');
        return;
      }

      console.log('[CADASTRO] usuário criado:', usuario?.id);

      // Caso já tenha campos de veículo na tela (modelo/placa), a gente cria aqui:
      // const { error: vehErr } = await supabase
      //   .from('veiculos')
      //   .insert([{ motorista_id: usuario.id, modelo, placa }]);
      // if (vehErr) Alert.alert('Aviso', 'Usuário criado, mas houve erro ao salvar o veículo.');

      // Sucesso → modal + limpar + navegar
      setSuccessMsg('Usuário cadastrado com sucesso!');
      setSuccessVisible(true);
      limparFormulario();

      await new Promise((r) => setTimeout(r, 1000));
      setSuccessVisible(false);
      navigation.navigate('Home');
    } catch (err) {
      console.log('[CADASTRO] erro inesperado:', err?.message || err);
      Alert.alert('Erro', 'Falha ao cadastrar. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <SafeAreaView style={styles.innerContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('Home')}
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
            autoCapitalize="none"
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
            activeOpacity={0.7}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Cadastrar</Text>
            )}
          </TouchableOpacity>

          {/* Modal de sucesso */}
          <Modal
            visible={successVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setSuccessVisible(false)}
          >
            <View style={styles.modalBackdrop}>
              <View style={styles.modalCard}>
                <Text style={styles.modalIcon}>✔</Text>
                <Text style={styles.modalTitle}>Cadastro realizado!</Text>
                <Text style={styles.modalText}>{successMsg}</Text>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#12023d' },
  innerContainer: { flex: 1, padding: 16 },
  backButton: { position: 'absolute', left: 16, top: Platform.OS === 'ios' ? 50 : 20, zIndex: 10, padding: 6 },
  backText: { color: '#fff', fontSize: 16 },
  title: { marginTop: 40, fontSize: 48, fontWeight: 'bold', marginBottom: 16, textAlign: 'center', color: '#fff' },
  input: {
    fontSize: 18, textAlign: 'center', color: '#fff',
    margin: 10, height: 50, borderColor: '#4f0466', borderWidth: 4,
    marginBottom: 12, paddingHorizontal: 10, borderRadius: 24, fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#ff4800', borderWidth: 2, borderRadius: 24, paddingVertical: 10,
    paddingHorizontal: 20, alignItems: 'center', marginTop: 20, width: 300, alignSelf: 'center',
  },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },

  // Modal
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', alignItems: 'center', justifyContent: 'center' },
  modalCard: {
    width: '80%', backgroundColor: '#1c0a4d', borderRadius: 20,
    paddingVertical: 24, paddingHorizontal: 16, alignItems: 'center',
    borderWidth: 2, borderColor: '#4f0466',
  },
  modalIcon: { fontSize: 40, color: '#32d74b', marginBottom: 8 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 6 },
  modalText: { fontSize: 14, color: '#ddd', textAlign: 'center' },
});

export default CadastroScreen;

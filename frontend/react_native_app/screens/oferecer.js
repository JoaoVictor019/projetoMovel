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
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import supabase from '../services/supabase';

export default function OferecerCaronaScreen({ navigation }) {
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [vagas, setVagas] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [loading, setLoading] = useState(false);

  // 🗓️ máscara de data DD/MM/AAAA
  const formatarData = (texto) => {
    const somenteDigitos = texto.replace(/\D/g, '').slice(0, 8); // ddmmaaaa

    let formatado = somenteDigitos;

    if (somenteDigitos.length > 4) {
      formatado = `${somenteDigitos.slice(0, 2)}/${somenteDigitos.slice(
        2,
        4
      )}/${somenteDigitos.slice(4)}`;
    } else if (somenteDigitos.length > 2) {
      formatado = `${somenteDigitos.slice(0, 2)}/${somenteDigitos.slice(2)}`;
    }

    return formatado;
  };

  // ⏰ máscara de horário HH:MM
  const formatarHorario = (texto) => {
    const somenteDigitos = texto.replace(/\D/g, '').slice(0, 4); // hhmm
    let formatado = somenteDigitos;

    if (somenteDigitos.length > 2) {
      formatado = `${somenteDigitos.slice(0, 2)}:${somenteDigitos.slice(2)}`;
    }

    return formatado;
  };

  const handleOferecer = async () => {
    if (!origem || !destino || !data || !horario || !vagas) {
      Alert.alert('Campos obrigatórios', 'Preencha origem, destino, data, horário e vagas.');
      return;
    }

    const vagasNum = parseInt(vagas, 10);
    if (isNaN(vagasNum) || vagasNum <= 0) {
      Alert.alert('Vagas inválidas', 'Informe um número de vagas maior que zero.');
      return;
    }

    try {
      setLoading(true);

      // usuário logado
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError || !authData?.user) {
        Alert.alert('Erro', 'Não foi possível identificar o usuário logado.');
        setLoading(false);
        return;
      }

      const user = authData.user;

      // pega nome do motorista na tabela "perfis"
      let motoristaNome = 'Motorista';
      const { data: perfil, error: perfilError } = await supabase
        .from('perfis')
        .select('nomeCompleto')
        .eq('id', user.id)
        .single();

      if (!perfilError && perfil?.nomeCompleto) {
        motoristaNome = perfil.nomeCompleto;
      }

      // salva na tabela "caronas"
      const { error: insertError } = await supabase
        .from('caronas')
        .insert([
          {
            motorista_id: user.id,
            motorista_nome: motoristaNome,
            origem,
            destino,
            data,
            horario,
            vagas: vagasNum,
            observacoes,
          },
        ]);

      if (insertError) {
        console.error('[OFERECER] Erro ao salvar carona:', insertError);
        Alert.alert('Erro', 'Não foi possível publicar a carona.');
        setLoading(false);
        return;
      }

      Alert.alert(
        'Sucesso!',
        'Carona publicada com sucesso! Ela já pode aparecer na busca de outros alunos.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home'),
          },
        ]
      );

      // limpa campos
      setOrigem('');
      setDestino('');
      setData('');
      setHorario('');
      setVagas('');
      setObservacoes('');
    } catch (error) {
      console.error('[OFERECER] Erro inesperado:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao publicar a carona.');
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

            {/* 🔙 BOTÃO VOLTAR */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.backButtonText}>← Voltar</Text>
            </TouchableOpacity>

            <View style={styles.header}>
              <Text style={styles.title}>Oferecer Carona</Text>
              <Text style={styles.subtitle}>Compartilhe sua viagem</Text>
            </View>

            <View style={styles.form}>
              <Text style={styles.label}>Origem</Text>
              <TextInput
                style={styles.input}
                placeholder="De onde você vai partir?"
                placeholderTextColor="#999"
                value={origem}
                onChangeText={setOrigem}
              />

              <Text style={styles.label}>Destino</Text>
              <TextInput
                style={styles.input}
                placeholder="Para onde você está indo?"
                placeholderTextColor="#999"
                value={destino}
                onChangeText={setDestino}
              />

              <Text style={styles.label}>Data</Text>
              <TextInput
                style={styles.input}
                placeholder="DD/MM/AAAA"
                placeholderTextColor="#999"
                value={data}
                onChangeText={(texto) => setData(formatarData(texto))}
                keyboardType="numeric"
              />

              <Text style={styles.label}>Horário</Text>
              <TextInput
                style={styles.input}
                placeholder="HH:MM"
                placeholderTextColor="#999"
                value={horario}
                onChangeText={(texto) => setHorario(formatarHorario(texto))}
                keyboardType="numeric"
              />

              <Text style={styles.label}>Número de Vagas</Text>
              <TextInput
                style={styles.input}
                placeholder="Quantas vagas disponíveis?"
                placeholderTextColor="#999"
                value={vagas}
                onChangeText={setVagas}
                keyboardType="numeric"
              />

              <Text style={styles.label}>Observações (Opcional)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Informações adicionais sobre a carona..."
                placeholderTextColor="#999"
                value={observacoes}
                onChangeText={setObservacoes}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />

              <TouchableOpacity
                style={[styles.button, loading && { opacity: 0.6 }]}
                onPress={handleOferecer}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? 'Publicando...' : 'Publicar Carona'}
                </Text>
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

  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 6,
    marginBottom: 10,
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
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
    marginBottom: 30,
    marginTop: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
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
  textArea: {
    minHeight: 100,
    paddingTop: 15,
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
});

import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Modal, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment'; // Importa a biblioteca moment.js para formatação de data
import { Picker } from '@react-native-picker/picker';

const BuscarCarona = () => {
  const navigation = useNavigation();

  const [localizacaoAtual, setLocalizacaoAtual] = useState('');
  const [destino, setDestino] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [vagasDisponiveis, setVagasDisponiveis] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [horarioHora, setHorarioHora] = useState('19');
  const [horarioMinuto, setHorarioMinuto] = useState('45');
  
  // Estados para autocomplete de endereços
  const [sugestoesOrigem, setSugestoesOrigem] = useState([]);
  const [sugestoesDestino, setSugestoesDestino] = useState([]);
  const [mostrarSugestoesOrigem, setMostrarSugestoesOrigem] = useState(false);
  const [mostrarSugestoesDestino, setMostrarSugestoesDestino] = useState(false);
  const [carregandoOrigem, setCarregandoOrigem] = useState(false);
  const [carregandoDestino, setCarregandoDestino] = useState(false);

  const options = ['1 pessoa', '2 pessoas', '3 pessoas', '4 pessoas'];

  // Gera opções de horas (00-23)
  const horasOptions = Array.from({ length: 24 }, (_, i) => {
    const hora = i.toString().padStart(2, '0');
    return { label: hora, value: hora };
  });

  // Gera opções de minutos (00-59)
  const minutosOptions = Array.from({ length: 60 }, (_, i) => {
    const minuto = i.toString().padStart(2, '0');
    return { label: minuto, value: minuto };
  });

  // Valida e formata o horário digitado
  const formatarHorario = (texto) => {
    // Remove tudo que não é número
    const numeros = texto.replace(/\D/g, '');
    
    // Limita a 4 dígitos
    const limitado = numeros.slice(0, 4);
    
    // Formata como HH:MM
    if (limitado.length <= 2) {
      return limitado;
    } else {
      return limitado.slice(0, 2) + ':' + limitado.slice(2, 4);
    }
  };

  // Valida se o horário está no formato correto
  const validarHorario = (texto) => {
    const regex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(texto);
  };

  const handleBuscar = () => {
    // Lógica para buscar carona
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  }; //Para seleção de vagas

  const toggleCalendar = () => {
    setCalendarVisible(!isCalendarVisible);
  }; //Para o calendário

  const togglePicker = () => {
    setPickerVisible(!isPickerVisible);
  }; //Para seleção de horário

  const handleOptionSelect = (option) => {
    setVagasDisponiveis(option);
    toggleModal();
  };

  const handleDateSelect = (day) => {
    const formattedDate = moment(day.dateString).format('DD/MM/YYYY');
    setData(formattedDate);
    toggleCalendar();
  };

  const handleHorarioSelect = () => {
    const horarioFormatado = `${horarioHora}:${horarioMinuto}`;
    setHorario(horarioFormatado);
    togglePicker();
  };

  const handleHorarioChange = (texto) => {
    const formatado = formatarHorario(texto);
    setHorario(formatado);
    
    // Se o horário estiver completo e válido, atualiza os pickers
    if (validarHorario(formatado)) {
      const [hora, minuto] = formatado.split(':');
      setHorarioHora(hora);
      setHorarioMinuto(minuto);
    }
  };

  const today = moment().format('YYYY-MM-DD'); // Formato 'YYYY-MM-DD'

  // Função para buscar sugestões de endereços
  const buscarSugestoesEndereco = async (texto, tipo) => {
    if (!texto || texto.length < 3) {
      if (tipo === 'origem') {
        setSugestoesOrigem([]);
        setMostrarSugestoesOrigem(false);
      } else {
        setSugestoesDestino([]);
        setMostrarSugestoesDestino(false);
      }
      return;
    }

    try {
      if (tipo === 'origem') {
        setCarregandoOrigem(true);
      } else {
        setCarregandoDestino(true);
      }

      // Usa a API do OpenStreetMap Nominatim (gratuita)
      // Limita a busca apenas para Campinas, SP, Brasil
      const textoComLocalizacao = `${texto}, Campinas, SP, Brasil`;
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(textoComLocalizacao)}&limit=5&addressdetails=1&countrycodes=br`;
      
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'VaiJuntoApp/1.0' // Requerido pela API
        }
      });
      
      const data = await response.json();
      
      // Filtra apenas resultados de Campinas, SP
      const sugestoes = data
        .filter(item => {
          const address = item.address || {};
          const city = (address.city || address.town || address.municipality || '').toLowerCase();
          const state = (address.state || '').toLowerCase();
          // Verifica se é Campinas, SP
          return city.includes('campinas') && state.includes('são paulo');
        })
        .map(item => ({
          id: item.place_id,
          endereco: item.display_name,
          lat: parseFloat(item.lat),
          lon: parseFloat(item.lon)
        }));

      if (tipo === 'origem') {
        setSugestoesOrigem(sugestoes);
        setMostrarSugestoesOrigem(sugestoes.length > 0);
        setCarregandoOrigem(false);
      } else {
        setSugestoesDestino(sugestoes);
        setMostrarSugestoesDestino(sugestoes.length > 0);
        setCarregandoDestino(false);
      }
    } catch (error) {
      console.error('Erro ao buscar endereços:', error);
      if (tipo === 'origem') {
        setCarregandoOrigem(false);
        setSugestoesOrigem([]);
      } else {
        setCarregandoDestino(false);
        setSugestoesDestino([]);
      }
    }
  };

  // Debounce para evitar muitas requisições
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  };

  const buscarSugestoesOrigemDebounced = debounce((texto) => {
    buscarSugestoesEndereco(texto, 'origem');
  }, 500);

  const buscarSugestoesDestinoDebounced = debounce((texto) => {
    buscarSugestoesEndereco(texto, 'destino');
  }, 500);

  const handleOrigemChange = (texto) => {
    setLocalizacaoAtual(texto);
    buscarSugestoesOrigemDebounced(texto);
    setMostrarSugestoesOrigem(true);
  };

  const handleDestinoChange = (texto) => {
    setDestino(texto);
    buscarSugestoesDestinoDebounced(texto);
    setMostrarSugestoesDestino(true);
  };

  const selecionarSugestaoOrigem = (sugestao) => {
    setLocalizacaoAtual(sugestao.endereco);
    setSugestoesOrigem([]);
    setMostrarSugestoesOrigem(false);
  };

  const selecionarSugestaoDestino = (sugestao) => {
    setDestino(sugestao.endereco);
    setSugestoesDestino([]);
    setMostrarSugestoesDestino(false);
  };

  

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <SafeAreaView style={styles.innerContainer}>
          <Text style={styles.title}>Buscar carona</Text>

          <View style={styles.autocompleteContainer}>
            <TextInput
              style={styles.input}
              placeholder="Localização atual"
              placeholderTextColor="#ccc"
              value={localizacaoAtual}
              onChangeText={handleOrigemChange}
              onFocus={() => {
                if (sugestoesOrigem.length > 0) {
                  setMostrarSugestoesOrigem(true);
                }
              }}
              onBlur={() => {
                // Delay para permitir clique na sugestão
                setTimeout(() => setMostrarSugestoesOrigem(false), 200);
              }}
            />
            {mostrarSugestoesOrigem && (
              <View style={styles.sugestoesContainer}>
                {carregandoOrigem ? (
                  <Text style={styles.sugestaoItem}>Carregando...</Text>
                ) : (
                  sugestoesOrigem.map((sugestao) => (
                    <TouchableOpacity
                      key={sugestao.id}
                      style={styles.sugestaoItem}
                      onPress={() => selecionarSugestaoOrigem(sugestao)}
                    >
                      <Text style={styles.sugestaoText}>{sugestao.endereco}</Text>
                    </TouchableOpacity>
                  ))
                )}
              </View>
            )}
          </View>
          
          <View style={styles.autocompleteContainer}>
            <TextInput
              style={styles.input}
              placeholder="Destino"
              placeholderTextColor="#ccc"
              value={destino}
              onChangeText={handleDestinoChange}
              onFocus={() => {
                if (sugestoesDestino.length > 0) {
                  setMostrarSugestoesDestino(true);
                }
              }}
              onBlur={() => {
                // Delay para permitir clique na sugestão
                setTimeout(() => setMostrarSugestoesDestino(false), 200);
              }}
            />
            {mostrarSugestoesDestino && (
              <View style={styles.sugestoesContainer}>
                {carregandoDestino ? (
                  <Text style={styles.sugestaoItem}>Carregando...</Text>
                ) : (
                  sugestoesDestino.map((sugestao) => (
                    <TouchableOpacity
                      key={sugestao.id}
                      style={styles.sugestaoItem}
                      onPress={() => selecionarSugestaoDestino(sugestao)}
                    >
                      <Text style={styles.sugestaoText}>{sugestao.endereco}</Text>
                    </TouchableOpacity>
                  ))
                )}
              </View>
            )}
          </View>
          
          <TouchableOpacity style={styles.input} onPress={toggleCalendar}>
            <Text style={styles.placeholderText}>{data || 'Data'}</Text>
          </TouchableOpacity>
          
          <View style={styles.horarioContainer}>
            <TextInput
              style={[styles.input, styles.horarioInput]}
              placeholder="Horário (ex: 19:45)"
              placeholderTextColor="#ccc"
              value={horario}
              onChangeText={handleHorarioChange}
              keyboardType="numeric"
              maxLength={5}
            />
            <TouchableOpacity
              style={styles.horarioButton}
              onPress={togglePicker}
            >
              <Text style={styles.horarioButtonText}>🕐</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.pickerContainer} onPress={toggleModal}>
            <Text style={styles.pickerLabel}>{vagasDisponiveis || 'Número de pessoas'}</Text>
          </TouchableOpacity>

          <Modal
            visible={isModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={toggleModal}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContent}>
                <FlatList
                  data={options}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.option}
                      onPress={() => handleOptionSelect(item)}
                    >
                      <Text style={styles.optionText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item}
                />
              </View>
            </View>
          </Modal>

          <Modal
            visible={isCalendarVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={toggleCalendar}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContent}>
                <Calendar
                  current={today}
                  minDate={today}
                  onDayPress={handleDateSelect}
                  theme={{
                    todayTextColor: '#ff4800',
                    arrowColor: '#ff4800',
                    monthTextColor: '#fff',
                    textDayFontWeight: 'bold',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: 'bold',
                    textDayColor: '#fff',
                    textMonthColor: '#fff',
                    textDayHeaderFontSize: 16,
                    textMonthFontSize: 18,
                    textDayFontSize: 16,
                    backgroundColor: '#12023d',
                    calendarBackground: '#12023d',
                  }}
                />
              </View>
            </View>
          </Modal>

          <Modal
            visible={isPickerVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={togglePicker}
          >
            <View style={styles.modalBackground}>
              <View style={styles.pickerModalContent}>
                <Text style={styles.pickerModalTitle}>Selecione o Horário</Text>
                <View style={styles.pickerRowContainer}>
                  <View style={styles.pickerColumn}>
                    <Text style={styles.pickerColumnLabel}>Hora</Text>
                    <Picker
                      selectedValue={horarioHora}
                      onValueChange={setHorarioHora}
                      style={styles.picker}
                      itemStyle={styles.pickerItem}
                    >
                      {horasOptions.map((item) => (
                        <Picker.Item key={item.value} label={item.label} value={item.value} />
                      ))}
                    </Picker>
                  </View>
                  <View style={styles.pickerColumn}>
                    <Text style={styles.pickerColumnLabel}>Minuto</Text>
                    <Picker
                      selectedValue={horarioMinuto}
                      onValueChange={setHorarioMinuto}
                      style={styles.picker}
                      itemStyle={styles.pickerItem}
                    >
                      {minutosOptions.map((item) => (
                        <Picker.Item key={item.value} label={item.label} value={item.value} />
                      ))}
                    </Picker>
                  </View>
                </View>
                <View style={styles.pickerButtonContainer}>
                  <TouchableOpacity
                    style={styles.pickerButtonCancel}
                    onPress={togglePicker}
                  >
                    <Text style={styles.pickerButtonText}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.pickerButtonConfirm}
                    onPress={handleHorarioSelect}
                  >
                    <Text style={styles.pickerButtonText}>Confirmar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('Match')}>
            <Text style={styles.buttonText}>Confirmar</Text>
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
    justifyContent: 'center',
  },
  horarioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    marginBottom: 12,
  },
  horarioInput: {
    flex: 1,
    margin: 0,
    marginRight: 10,
  },
  horarioButton: {
    width: 50,
    height: 50,
    backgroundColor: '#4f0466',
    borderRadius: 24,
    borderWidth: 4,
    borderColor: '#4f0466',
    justifyContent: 'center',
    alignItems: 'center',
  },
  horarioButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  placeholderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pickerContainer: {
    margin: 10,
    borderColor: '#4f0466',
    borderWidth: 4,
    borderRadius: 24,
    paddingHorizontal: 10,
    paddingVertical: 15,
    justifyContent: 'center',
    backgroundColor: '#12023d',
  },
  pickerLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pickerModalContent: {
    backgroundColor: '#1c0a4d',
    borderRadius: 20,
    width: '90%',
    maxWidth: 400,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4f0466',
  },
  pickerModalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pickerRowContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  pickerColumn: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  pickerColumnLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker: {
    width: 120,
    height: 200,
    backgroundColor: '#12023d',
    borderColor: '#4f0466',
    borderWidth: 4,
    borderRadius: 24,
    color: '#fff',
  },
  pickerItem: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pickerButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  pickerButtonCancel: {
    backgroundColor: '#666',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 24,
    minWidth: 120,
    alignItems: 'center',
  },
  pickerButtonConfirm: {
    backgroundColor: '#ff4800',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 24,
    minWidth: 120,
    alignItems: 'center',
  },
  pickerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  autocompleteContainer: {
    position: 'relative',
    zIndex: 1,
  },
  sugestoesContainer: {
    position: 'absolute',
    top: 50,
    left: 10,
    right: 10,
    backgroundColor: '#1c0a4d',
    borderColor: '#4f0466',
    borderWidth: 2,
    borderRadius: 12,
    maxHeight: 200,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  sugestaoItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#4f0466',
  },
  sugestaoText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: '#12023d',
    borderRadius: 10,
    width: '80%',
    padding: 20,
    alignItems: 'center',
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
  },
  optionText: {
    fontSize: 16,
    color: '#fff',
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
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BuscarCarona;

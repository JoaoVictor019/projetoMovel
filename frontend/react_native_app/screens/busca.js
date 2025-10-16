import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Modal, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment'; // Importa a biblioteca moment.js para formatação de data
import RNPickerSelect from 'react-native-picker-select'; // Importa a biblioteca RNPickerSelect

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

  const options = ['1 pessoa', '2 pessoas', '3 pessoas', '4 pessoas'];

  const horarioOptions = [
    { label: '08:00', value: '08:00' },
    { label: '09:00', value: '09:00' },
    { label: '10:00', value: '10:00' },
    { label: '11:00', value: '11:00' },
    { label: '12:00', value: '12:00' },
    { label: '13:00', value: '13:00' },
    { label: '14:00', value: '14:00' },
    { label: '15:00', value: '15:00' },
    { label: '16:00', value: '16:00' },
    { label: '17:00', value: '17:00' },
    { label: '18:00', value: '18:00' },
    { label: '19:00', value: '19:00' },
    { label: '20:00', value: '20:00' },
    { label: '21:00', value: '21:00' },
    { label: '22:00', value: '22:00' },
  ];

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

  const handleHorarioSelect = (value) => {
    setHorario(value);
    togglePicker();
  };

  const today = moment().format('YYYY-MM-DD'); // Formato 'YYYY-MM-DD'

  

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <SafeAreaView style={styles.innerContainer}>
          <Text style={styles.title}>Buscar carona</Text>

          <TextInput
            style={styles.input}
            placeholder="Localização atual"
            placeholderTextColor="#ccc"
            value={localizacaoAtual}
            onChangeText={setLocalizacaoAtual}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Destino"
            placeholderTextColor="#ccc"
            value={destino}
            onChangeText={setDestino}
          />
          
          <TouchableOpacity style={styles.input} onPress={toggleCalendar}>
            <Text style={styles.placeholderText}>{data || 'Data'}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.input}>
            <RNPickerSelect
              onValueChange={handleHorarioSelect}
              items={horarioOptions}
              placeholder={{ 
                label: 'Horário', 
                value: null,
                color: '#fff',
                fontWeight: 'bold',
                }}
              value={horario}
              style={{
                inputAndroid: {
                  color: horario ? '#fff' : '#999',
                  fontSize: 18,
                  fontWeight: 'bold',
                  textAlign: 'center',
                },
                inputIOS: {
                  color: horario ? '#fff' : '#999',
                  fontSize: 18,
                  fontWeight: 'bold',
                  textAlign: 'center',
                },
                placeholder: {
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 18,
                  textAlign: 'center',
                },
              }}
            />
          </TouchableOpacity>
          
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

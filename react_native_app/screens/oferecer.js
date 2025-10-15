import { supabase } from '../react_native_app/supabase'; // no topo

const handleOferecer = async () => {
  const user = supabase.auth.user();
  const { error } = await supabase.from('caronas').insert([{
    user_id: user.id,
    localizacaoAtual,
    destino,
    data,
    horario,
    vagasDisponiveis
  }]);
  if (error) {
    Alert.alert("Erro", error.message);
    return;
  }
  Alert.alert("Sucesso", "Carona oferecida!");
  navigation.navigate('Home');
};
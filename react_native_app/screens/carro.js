import { supabase } from '../supabase'; // no topo

const handleCadastroCarro = async () => {
  const user = supabase.auth.user();
  const { error } = await supabase.from('carros').insert([{
    user_id: user.id,
    marca,
    modelo,
    cor,
    placa
  }]);
  if (error) {
    Alert.alert("Erro", error.message);
    return;
  }
  Alert.alert("Sucesso", "Carro cadastrado!");
  navigation.goBack();
};
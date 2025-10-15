import { supabase } from '../react_native_app/supabase';

const handleBuscar = async () => {
  const { data, error } = await supabase
    .from('caronas')
    .select('*')
    .eq('destino', destino) // exemplo de filtro
    .eq('data', data);
  if (error) {
    Alert.alert("Erro", error.message);
    return;
  }
  // Atualize o estado para exibir os resultados
  setResultados(data);
};
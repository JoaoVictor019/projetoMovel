import { supabase } from '../supabase'; // no topo

const handleLogin = async () => {
  if (matricula === '' || senha === '') {
    Alert.alert("Erro", "Preencha todos os campos!");
    return;
  }
  // Use email como login padrão Supabase
  const { error } = await supabase.auth.signInWithPassword({
    email: matricula,
    password: senha,
  });
  if (error) {
    Alert.alert("Erro", error.message);
  } else {
    Alert.alert("Sucesso", "Login realizado!");
    navigation.navigate('Home');
  }
};
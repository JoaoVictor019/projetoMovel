import { supabase } from '../supabase'; // no topo do arquivo

const handleCadastroUsuario = async () => {
  if (!email.endsWith('@unimetrocamp.edu.br')) {
    Alert.alert("Erro", "Cadastre-se usando seu e-mail institucional (@unimetrocamp.edu.br)");
    return;
  }
  if (senha !== confirmarSenha) {
    Alert.alert("Erro", "As senhas não coincidem!");
    return;
  }
  const { data, error } = await supabase.auth.signUp({
    email,
    password: senha,
  });
  if (error) {
    Alert.alert("Erro", error.message);
    return;
  }
  // Salvar dados extras na tabela "usuarios"
  const { error: upsertError } = await supabase.from('usuarios').insert([{
    user_id: data.user?.id,
    nome: nomeCompleto,
    cpf,
    telefone,
    matricula,
    curso,
  }]);
  if (upsertError) {
    Alert.alert("Erro", upsertError.message);
    return;
  }
  Alert.alert("Sucesso", "Cadastro realizado! Verifique seu e-mail.");
  navigation.navigate('Login');
};
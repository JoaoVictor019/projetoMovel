# 🚗💜 VaiJunto — Caronas entre alunos da Unimetrocamp

O **VaiJunto** é um aplicativo mobile criado para facilitar o compartilhamento de caronas entre os alunos da **Unimetrocamp**.  
O objetivo é tornar o deslocamento dos estudantes mais prático, econômico e colaborativo, conectando colegas que vão para os mesmos destinos.

Com o app, os alunos podem:

- Buscar caronas disponíveis  
- Oferecer caronas para outros estudantes  
- Combinar viagens rapidamente  
- Ajudar uns aos outros no dia a dia

Desenvolvido com **React Native + Expo** e **Supabase**, o VaiJunto apresenta uma experiência simples e funcional, pensada especialmente para a rotina dos alunos da Unimetrocamp.

---

## 📱 Funcionalidades do App

- 🔐 **Login e Cadastro de Usuário**
- 🧭 **Fluxo de navegação entre telas utilizando React Navigation**
- 🚗 **Oferecer carona**
- 🔍 **Buscar caronas disponíveis**
- 🤝 **Match entre motorista e passageiro**
- 👤 **Tela de perfil**
- 🛠 **Integração com Supabase para autenticação e banco de dados**
- 📅 **Confirmação de viagem**
- 🔑 **Recuperação de senha**

---

## 🏗 Arquitetura do Projeto

O projeto é organizado assim:
```text
PROJETOMOVEL/
│
├── Vaijunto/
│   ├── apresentacao/
│   ├── backend/
│   ├── documentacao/
│   ├── frontend/
│   │   └── react_native_app/
│   │       ├── assets/
│   │       ├── images/
│   │       ├── screens/
│   │       ├── services/
│   │       ├── App.js
│   │       ├── app.json
│   │       ├── package.json
│   │       └── supabase/
│   ├── video/
│   └── README.md
│
├── .gitignore
├── LICENSE
├── package.json
└── package-lock.json
```


---

## 🧩 Telas do Aplicativo

As telas principais ficam em:

react_native_app/screens/

Incluindo:

- `login.js` — Autenticação  
- `cadastro.js` — Registro de usuário  
- `home.js` — Hub principal  
- `buscar.js` — Busca de caronas  
- `oferecer.js` — Oferecer carona  
- `match.js` — Match entre caronas encontradas  
- `confirmar.js` — Confirmação  
- `perfil.js` — Perfil do usuário  
- `RecuperarSenhaScreen.js` — Recuperação de senha  
- `splash.js` — Tela inicial

---

## ⚙️ Tecnologias Utilizadas

- **React Native**
- **Expo**
- **JavaScript**
- **Supabase (Auth + Database)**
- **React Navigation**
- **Babel**
- **Node.js / npm**

---

## ▶️ Como Rodar o Projeto

Acesse o diretório do app:


cd Vaijunto/frontend/react_native_app
Instale as dependências:


npm install
Execute o projeto:

npx expo start
📱 Escaneie o QR Code gerado no terminal usando o app Expo Go no seu celular.

---

## 🔌 Integração com **Supabase**
O arquivo principal de conexão está localizado em:

react_native_app/services/supabase.js
Ele é responsável por:

🔐 Autenticação

👤 Criação de usuário

🔑 Login

🗄 Conexão com o banco de dados

🔒 Persistência de sessão

---

## 🚀 Próximas Melhorias

🔔 Notificações push

💬 Chat em tempo real

⭐ Avaliação de motoristas e passageiros

🗺 Integração com mapas e rotas

📜 Histórico de viagens

🎨 Melhorias de UI/UX

---

## 📄 Licença
Este projeto está sob a licença MIT.

---

## 💜 Contribuição
Sinta-se à vontade para contribuir abrindo Issues ou Pull Requests!
Qualquer ajuda é bem-vinda. 🚀

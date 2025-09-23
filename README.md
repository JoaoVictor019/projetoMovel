# VaiJunto

## Descrição do Projeto
O **VaiJunto** é um aplicativo mobile desenvolvido para facilitar a conexão entre estudantes universitários que desejam compartilhar caronas. A ideia central do projeto é permitir que os usuários ofereçam ou encontrem caronas de maneira prática e segura, economizando tempo e recursos. Com o app, os estudantes podem buscar caronas disponíveis, oferecer vagas em seus veículos e se conectar com outros colegas que seguem rotas semelhantes.

## Funcionalidades
- **Buscar Carona**: O usuário pode pesquisar caronas disponíveis para uma determinada localização e horário.
- **Oferecer Carona**: Os usuários que desejam oferecer caronas podem cadastrar rotas, horários e quantas vagas estão disponíveis.
- **Seleção de Vagas Disponíveis**: Função interativa para selecionar o número de vagas no carro.
  
## Ferramentas e Linguagens Utilizadas
- **React Native**: Framework utilizado para desenvolvimento de aplicativos móveis multiplataforma.
- **Expo**: Ferramenta utilizada para facilitar o desenvolvimento e o deploy do app React Native.
- **JavaScript**: Linguagem de programação utilizada no desenvolvimento do aplicativo.
- **React Navigation**: Biblioteca para gerenciar as rotas e navegação entre as telas do aplicativo.
- **@react-native-picker/picker**: Utilizado para implementar seleções interativas (dropdowns).

## Instalação de Dependências e Configuração

### Pré-requisitos
- **Node.js**: Plataforma para rodar JavaScript fora do navegador, essencial para o ambiente de desenvolvimento React Native.
- **Expo CLI**: Interface de linha de comando para desenvolvimento e execução de projetos Expo.

### Instalação do Node.js
Para instalar o **Node.js**, siga o tutorial disponível no site oficial [Node.js](https://nodejs.org).

### Instalação do Expo CLI
Após instalar o Node.js, instale o **Expo CLI** executando o seguinte comando no terminal:
- **npm install -g expo-cli**


### Dependências do Projeto
No diretório do projeto, execute o seguinte comando para instalar todas as dependências necessárias, como React Navigation e o Picker:
- **npm install**


### Instalação das Dependências Individuais

1. **React Navigation**: Para instalar o sistema de navegação do React Native, use o seguinte comando:
- **npm install @react-navigation/native**

2. **React Native Screens e React Native Safe Area Context**:
- **npm install react-native-screens react-native-safe-area-context**

3. **Picker**: Instale a biblioteca de seleção interativa:
- **npm install @react-native-picker/picker**

4. **React Native Calendars**:
- **npm install react-native-calendars**

5. **Back-end requirements**:
No diretório 'django_backend', siga os passos:
- Crie um ambiente virtual com **python -m venv venv**.

- Ative o ambiente virtual com **venv\Scripts\activate** (Windows) ou **source venv/bin/activate** (MacOS/Linux)

- Com o ambiente virtual ativado, rode **pip install -r requirements.txt**



### Rodando o Projeto
Após instalar todas as dependências, você pode iniciar o projeto com o comando:
- **expo start**

### Verificando o Banco de dados
Execute o comando **python manage.py runserver "IP LOCAL":800**
Substitua IP LOCAL pelo seu endereço IP (pode ser consultado executando "ipconfig" no terminal)

Isso abrirá o **Expo Dev Tools** no seu navegador. Com ele, você poderá executar o aplicativo no emulador, no seu dispositivo móvel ou no simulador de iOS/Android.

## Sobre Expo e Node.js
- **Expo**: Uma plataforma para desenvolvimento de aplicativos em React Native, que facilita o processo de desenvolvimento, permitindo que você teste seu aplicativo diretamente em dispositivos móveis com o Expo Go.
- **Node.js**: Uma plataforma que executa JavaScript no servidor, essencial para a instalação e gerenciamento de pacotes com o NPM (Node Package Manager) e para o desenvolvimento de projetos em React Native.

Com essas instruções, você poderá instalar e configurar o ambiente de desenvolvimento do BlaBlaluno e rodar o aplicativo no Expo!















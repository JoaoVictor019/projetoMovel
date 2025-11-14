## VaiJunto?

Projeto da disciplina de programação de dispositivos móveis com ReactNative + Expo (Android)

Orientador: Prof. Luiz Gustavo Turatti

A solução compartilhada neste repositório consiste no desenvolvimento de uma plataforma para ...

## Equipe do projeto
202402531425 - João Victor Romagnoli

202403000857 - Victor Felipe Pires

202303292406 - Felipe do Santos

## Sumario
1 Requisitos
2 Configuração de acesso aos dados
3 Estrutura do projeto
4 Instale os requisitos do projeto
5 Executando o projeto
6 Telas do projeto

## 🔧 Requisitos:
NodeJS se possível a versão mais recente

React Native se possível a versão mais recente

ExpoGo (link googlePlayStore: https://play.google.com/store/search?q=expo+go&c=apps) / (link applePlayStore: https://apps.apple.com/br/app/expo-go/id982107779)

Banco de dados: Supabase.

## 🗃️ Tabela 'usuários' com os seguintes campos:
<img width="1214" height="306" alt="image" src="https://github.com/user-attachments/assets/0ef72daa-0567-4cb9-acd8-c89640308c35" />
<img width="1220" height="412" alt="image" src="https://github.com/user-attachments/assets/19a7102e-2d35-4dcd-b0c9-e5a7386b649f" />

## 🔐 Configuração de acesso ao banco de dados
DATABASE_URL=https://qcmlftwkovmajwtljauv.supabase.co

DATABASE_KEY=chave_de_acesso: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjbWxmdHdrb3ZtYWp3dGxqYXV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MjQ0MzgsImV4cCI6MjA3NjIwMDQzOH0.pQUnYLfGgvTAQFXr5Y-d8-jsFHFNt3Eoknz1d3P6qQw


## 📦 Instale os requisitos do projeto:

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
Node.JS sempre a versão mais recente
React Native sempre a versão mais recente

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
- **npm start**

### Verificando o Banco de dados
Execute o comando **python manage.py runserver "IP LOCAL":800**
Substitua IP LOCAL pelo seu endereço IP (pode ser consultado executando "ipconfig" no terminal)

Isso abrirá o **Expo Dev Tools** no seu navegador. Com ele, você poderá executar o aplicativo no emulador, no seu dispositivo móvel ou no simulador de iOS/Android.

## Sobre Expo e Node.js
- **Expo**: Uma plataforma para desenvolvimento de aplicativos em React Native, que facilita o processo de desenvolvimento, permitindo que você teste seu aplicativo diretamente em dispositivos móveis com o Expo Go.
- **Node.js**: Uma plataforma que executa JavaScript no servidor, essencial para a instalação e gerenciamento de pacotes com o NPM (Node Package Manager) e para o desenvolvimento de projetos em React Native.

Com essas instruções, você poderá instalar e configurar o ambiente de desenvolvimento do VaiJunto! e rodar o aplicativo no Expo!

Instruções para instalação em um computador com Windows 11

Caso não tenha o chocolate instalado, inicie o preparo do sistema abrindo um término do powershell com privilégio de administrador

PS> Set-ExecutionPolicy AllSigned

PS> Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

PS> choco --version
Com o chocolate instalado, continuamos com a instalação dos requisitos do projeto

PS> choco install nodejs-lts -y

PS> choco install openjdk17 -y

PS> choco install nvm -y

 ## 🚀 Execute o projeto:
npx expo start

## Telas do projeto
Capture todas as telas do projeto e identifique-as

<img width="1264" height="705" alt="image" src="https://github.com/user-attachments/assets/9a26741a-41c5-4775-a7e0-3ccb0b9d08ce" />

<img width="1278" height="887" alt="image" src="https://github.com/user-attachments/assets/3b265db4-17cf-40ed-82d5-7365f81801ee" />

<img width="1276" height="710" alt="image" src="https://github.com/user-attachments/assets/1f19c80c-301e-412b-93c4-16e17d337634" />

<img width="1279" height="885" alt="image" src="https://github.com/user-attachments/assets/3f5ace67-160b-4293-953f-5fd7fcbcbe20" />

<img width="1279" height="804" alt="image" src="https://github.com/user-attachments/assets/6b97bca4-88e9-49c6-8120-03a45dcf8145" />

<img width="1277" height="845" alt="image" src="https://github.com/user-attachments/assets/c4fdf23e-7daa-414c-9314-328b1626b6c4" />

<img width="1278" height="886" alt="image" src="https://github.com/user-attachments/assets/b0fff35b-74de-4e34-a7c9-16ce101d6fc2" />

<img width="1278" height="708" alt="image" src="https://github.com/user-attachments/assets/4342cfc0-171d-4587-adfc-cc832a8dcec3" />









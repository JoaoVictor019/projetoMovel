// frontend/react_native_app/App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './screens/splash';
import LoginScreen from './screens/login';
import CadastroScreen from './screens/cadastro';
import RecuperarSenhaScreen from './screens/RecuperarSenhaScreen';
import HomeScreen from './screens/home';
import BuscarCaronaScreen from './screens/busca';
import OferecerCaronaScreen from './screens/oferecer';
import CadastroCarroScreen from './screens/carro';
import PerfilScreen from './screens/perfil';
import MatchScreen from './screens/match';
import ConfirmarCaronaScreen from './screens/confirmar';
import MinhasCaronasScreen from './screens/MinhasCaronas';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cadastro"
          component={CadastroScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RecuperarSenha"
          component={RecuperarSenhaScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BuscarCarona"
          component={BuscarCaronaScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OferecerCarona"
          component={OferecerCaronaScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CadastrarCarro"
          component={CadastroCarroScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Perfil"
          component={PerfilScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Match"
          component={MatchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Confirmar"
          component={ConfirmarCaronaScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MinhasCaronas"
          component={MinhasCaronasScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

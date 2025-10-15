import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './react_native_app/screens/splash';
import LoginScreen from './react_native_app/screens/login'; 
import CadastroScreen from './react_native_app/screens/cadastro'; 
import HomeScreen from './react_native_app/screens/home';
import BuscarCarona from './react_native_app/screens/busca';
import OferecerCarona from './react_native_app/screens/oferecer';
import CadastroCarro from './react_native_app/screens/carro';
import MatchScreen from './react_native_app/screens/match';
import ConfirmarCarona from './react_native_app/screens/confirmar';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false}}
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
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Buscar"
          component={BuscarCarona}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Oferecer"
          component={OferecerCarona}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Carro"
          component={CadastroCarro}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="Match"
          component={MatchScreen}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="Confirmar"
          component={ConfirmarCarona}
          options={{ headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
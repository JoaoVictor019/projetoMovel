import React from 'react';
import { AppRegistry } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/splash';
import LoginScreen from './screens/login'; 
import CadastroScreen from './screens/cadastro'; 
import HomeScreen from './screens/home';
import BuscarCarona from './screens/busca';
import OferecerCarona from './screens/oferecer';
import CadastroCarro from './screens/carro';
import MatchScreen from './screens/match';
import ConfirmarCarona from './screens/confirmar';
import { name as VaiJunto } from './app.json'; 

const Stack = createStackNavigator();

const App = () => {
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
};
AppRegistry.registerComponent(VaiJunto, () => App);

export default App;

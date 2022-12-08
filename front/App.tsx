import { StatusBar } from "expo-status-bar";

import ViewNav1 from "./src/screens/ViewNav1";
import ViewTasks from "./src/screens/ViewTasks";

import ViewUsers from "./src/screens/ViewUsers";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator } from "react-native";

import {
  RobotoSlab_300Light,
  RobotoSlab_400Regular,
  RobotoSlab_700Bold,
  RobotoSlab_900Black
} from '@expo-google-fonts/roboto-slab'
import { useFonts } from 'expo-font'; //1
import { AppProvider } from "./src/context/AppContext";

import ViewNewLogin from "./src/screens/ViewNewLogin";

const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    'Inter-Black': require('./src/assets/fonts/Inter-Black.ttf'),
    'Inter-Bold': require('./src/assets/fonts/Inter-Bold.ttf'),
    RobotoSlab_300Light,
    RobotoSlab_400Regular,
    RobotoSlab_700Bold,
    RobotoSlab_900Black
  }); // 2

  if (fontsLoaded) { //3
    return (
      <AppProvider>
        <>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Login"
              screenOptions={{ headerShown: true }} >
              <Stack.Screen name="Menu" component={ViewNav1} />
              <Stack.Screen name="Usuários" component={ViewUsers} />
              <Stack.Screen name="Login" component={ViewNewLogin} />
              <Stack.Screen name="Tarefas" component={ViewTasks} />
            </Stack.Navigator>
          </NavigationContainer>

          <StatusBar
            translucent={false}
            backgroundColor="#fff"
            style="auto" />
        </>
      </AppProvider>
    );
  } else {
    return (
      <>
        <ActivityIndicator size="large" color="#000" />

        <StatusBar
          translucent={false}
          backgroundColor="#fff"
          style="auto" />
      </>
    )
  }
}
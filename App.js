import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homescreen from './screens/Homescreen';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, presentation: "fullScreenModal" }}>
        <Stack.Screen name="Homescreen" component={Homescreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
      <StatusBar style="inverted" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;

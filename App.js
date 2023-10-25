import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, View, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PagCadastro from './src/Pages/PagCadastro';
import PagDepois from './src/Pages/PagDepois';
import ModalMenu from './src/components/ModalMenu';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {
  const Stack = createNativeStackNavigator();
  const [modalVisible, setModalVisible] = useState(false)

  return(
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='PagCadastro'
        screenOptions={({route, navigation}) => 
        ({ headerLeft: () => (<Image style={styles.imagemLogo} source={require("./src/img/Logo.png")}/>), 
          headerTitle: "", 
          headerRight: () => (
          <View>
            <Icon size={30} name="bars" onPress={() => setModalVisible(true)}/>
            <ModalMenu navigation={navigation} modalVisible={modalVisible} setModalVisible={setModalVisible}/>
          </View>
          ), 
          animation: 'slide_from_right'  })}>

        <Stack.Screen options={{headerShown: false}} name='PagCadastro' component={PagCadastro}/>
        <Stack.Screen  name='PagDepois' component={PagDepois}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  imagemLogo: {
    width: 100,
    height: 55,
  },
});

import { useState, useEffect } from 'react';
import { StyleSheet, Image, View, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PagCadastro from './src/Pages/PagCadastro';
import PagDepois from './src/Pages/PagDepois';
import ModalMenu from './src/components/ModalMenu';
import Icon from 'react-native-vector-icons/FontAwesome';
import { criaTabela } from './src/database/Queries';
import PagLogin from './src/Pages/PagLogin';
import { ProcuraUsuario } from './src/mongoDB';

export default function App() {
  const Stack = createNativeStackNavigator();
  const [modalVisible, setModalVisible] = useState(false)

    // é feito ao carregar a página
    useEffect(() => {
      criaTabela();
    }, []);
    
  return(
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='PagLogin'
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

        <Stack.Screen options={{headerShown: false, animation: 'default'}} name='PagCadastro' component={PagCadastro}/>
        <Stack.Screen options={{headerShown: false, animation: 'default'}} name='PagLogin' component={PagLogin}/>
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

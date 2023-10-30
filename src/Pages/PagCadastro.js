import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, SafeAreaView, ImageBackground, Keyboard, Dimensions } from 'react-native';
import { registraLogin, buscaExiste } from '../database/Queries';
import { TextInputMask } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get("window");

export default function PagCadastro({ navigation }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  

  // função p/ saber quando teclado está aberto
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          setKeyboardVisible(true); // or some other action
        }
      );
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          setKeyboardVisible(false); // or some other action
        }
      );

      return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
    }, []);

  // Função para cadastro do usuário
  async function registra() {
    // marca os parâmetros para cadastro
    const params = {
      usuario: usuario,
      senha: senha,
      email: email,
      telefone: telefone
    };

    // Checa se o usuário já foi cadastrado; Se não, o cadastra; Se sim, informa que já há um cadastro.
    const cadastros = await buscaExiste(usuario, email, telefone);
    if (cadastros.length == 0) {
      await registraLogin(params);
      navigation.navigate("PagLogin");
    } else {
      Alert.alert("Usuário já cadastrado");
    }
  }


  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground style={styles.container} source={require('../img/Fundo.jpg')} resizeMode='cover'>
        <StatusBar style="auto" />
        <View style={styles.caixaTitulo}>
          <Text style={styles.titulo}>Criar Conta</Text>
        </View>

        {/* Input de usuário */}
        <View style={styles.caixaInputs}>
          <View style={styles.viewInput}>
            <Icon name='person' size={24} color={"#9A9A9A"}/>
            <TextInput
              onChangeText={setUsuario}
              style={styles.input}
              placeholder='Usuário'
            />
          </View>

          {/* Input de senha */}
          <View style={styles.viewInput}>
            <Icon name='lock-closed' size={24} color={"#9A9A9A"}/>
            <TextInput
              onChangeText={setSenha}
              secureTextEntry={true}
              autoCorrect={false}
              style={styles.input}
              placeholder='Senha'
            />
          </View>

          {/* Input de email */}
          <View style={styles.viewInput}>
            <Icon name='mail' size={24} color={"#9A9A9A"}/>
            <TextInput
              keyboardType='email-address'
              onChangeText={setEmail}
              autoCorrect={false}
              autoComplete='off'
              style={styles.input}
              placeholder='Email'
            />
          </View>

          {/* Input de telefone */}
          <View style={styles.viewInput}>
            <Icon name='phone-portrait-outline' size={24} color={"#9A9A9A"}/>            
            <TextInputMask
                type={'cel-phone'}
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) '
                }}
                keyboardType="numeric"
                value={telefone}
                onChangeText={setTelefone}
                style={styles.input}
                placeholder='Número'
              />
          </View>

          <View style={[styles.viewInput, styles.viewBotaoLar]}>
            <Text style={styles.titulo}>Criar </Text>
            <TouchableOpacity 
            disabled={usuario == "" || senha == "" || email == "" || telefone == ""}
            onPress={() => registra()}
            >
            <LinearGradient
              start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
              locations={[0,1]}
              colors={['#E7B688', '#F88B26']}
              style={styles.botaoCad}
              >
                <Icon name='arrow-forward' color={"#fff"} size={35}/>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
        <View style={!isKeyboardVisible ? styles.viewBotoes : styles.viewBotoesSome}>
          {/* Botões de Navegação */}
          <View style={{flexDirection: 'row'}}>
            <Text>Já tem uma conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("PagLogin")}>
              <Text style={styles.txtBotao}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },

  viewBotoes: {
    flex: 1,
    justifyContent: 'space-around',
    // alignItems: 'center',
  },

  viewBotoesSome: {
    flex: 1,
    justifyContent: 'space-around',
    display: 'none',
    // alignItems: 'center',
  },
  
  botao: {
    width: 150,
    height: 35,
    backgroundColor: '#faf',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 10,
  },

  caixaTitulo:{
    flex: 1,
    justifyContent: 'center',

  },

  caixaInputs: {
    flex: 3,
    paddingBottom: 10,
    width: width,
    flexDirection: 'column',
    paddingHorizontal: 20,
  },

  viewInput: {
    flexDirection: 'row',
    elevation: 5,
    backgroundColor: '#fff',
    margin: 15,
    padding: 10,
    paddingLeft: 15,
    borderRadius: 40,
  },

  input: {
    width: "100%", 
    paddingLeft: 10,
  },

  flatlist: {
    backgroundColor: "#faa",
  },

  texto: {
    color: "#000",
    fontSize: 20,
    backgroundColor: "#fff",
    margin: 5
  },

  textoInput: {
    textAlignVertical: 'center',
  },

  txtBotao: {
    textDecorationLine: 'underline',
  },
  
  botaoCad: {
    display: 'flex',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  viewBotaoLar: {
    alignSelf: 'flex-end', 
    backgroundColor: 'transparent', 
    elevation: 0,
    alignItems: 'center',
  },

});

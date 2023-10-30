import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, SafeAreaView, ImageBackground, Dimensions } from 'react-native';
import { buscaLogin } from '../database/Queries';
import CheckBox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get("window");

export default function PagLogin({ navigation }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  // é feito ao carregar a página
  useEffect(() => {
    estaLogado();
  }, []);

  // checa na memória se há login salvo
  const estaLogado = async () => {
    try {
      const logado = await AsyncStorage.getItem('logado');
      if (logado !== null) {
        // pega valores previamente armazenados
        const dados = await AsyncStorage.getItem('dados');
        const dadosJson = JSON.parse(dados);
        if (logado == "real") {
          fazLogin(dadosJson.usuario, dadosJson.senha);
        }
        else {
          setUsuario(dadosJson.usuario);
          setSenha(dadosJson.senha);
        }
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  // Salva login localmente
  const salvaLogin = async (dados, logado) => {
    try {
      const jsonDados = JSON.stringify(dados)
      await AsyncStorage.setItem('dados', jsonDados);
      await AsyncStorage.setItem('logado', logado);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  // função para fazer o login do usuário
  async function fazLogin(usuario, senha) {
    // checa se cadastro existe; Se não, retorna erro. Se sim, faz algo
    const login = await buscaLogin(usuario, senha);
    if (login.length == 0) {
      Alert.alert("Senha ou Usuário incorretos.");
    }
    else{
      Alert.alert("Boas vindas de volta!");
      // se checkbox estiver marcada, salva em cache o login
      if (checkbox) {
        await salvaLogin({usuario: usuario, senha: senha}, "real");
      }
      else {
        await salvaLogin({usuario: usuario, senha: ""}, "fake");
      }
      // e navega p/ próxima página
      navigation.navigate("PagDepois");
    }
  }


  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground style={styles.container} source={require('../img/Fundo.jpg')} resizeMode='cover'>
        <StatusBar style="auto" />
        <View style={styles.caixaTitulo}>
          <Text style={styles.titulo}>Login</Text>
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

          {/* checkbox p/ salvar login no cache */}
          <View style={[styles.viewInput, {alignSelf: 'flex-end', backgroundColor: 'transparent', elevation: 0}]}>
            <Text>Lembrar Login? </Text>
            <CheckBox 
                value={checkbox}
                onValueChange={(toggle) => setCheckbox(toggle)}
            />
          </View>

          <View style={[styles.viewInput, styles.viewBotaoLar]}>
            <TouchableOpacity 
            disabled={usuario == "" || senha == ""}
            onPress={() => fazLogin(usuario, senha)}
            style={{flexDirection: 'row'}}
            >
            <Text style={styles.titulo}>Entrar </Text>
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
        <View style={styles.viewBotoes}>
          {/* Botões para Teste */}
          <View style={{flexDirection: 'row'}}>
            <Text>Ainda não tem uma conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("PagCadastro")}>
              <Text style={styles.txtBotao}>Criar</Text>
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
    justifyContent: 'space-evenly',
    width: 300,
    alignItems: 'center',
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
    paddingHorizontal: 20
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

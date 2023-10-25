import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, SafeAreaView, ImageBackground } from 'react-native';
import { buscaLogin, criaTabela, registraLogin, buscaExiste, delTabela } from '../database/Queries';
import CheckBox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInputMask } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/Ionicons';

export default function PagCadastro({ navigation }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  // é feito ao carregar a página
  useEffect(() => {
    criaTabela();
    estaLogado(setUsuario, setSenha);
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
    } else {
      Alert.alert("Usuário já cadastrado");
    }
  }

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
          <Text>Cadastro</Text>
        </View>

        {/* Input de usuário */}
        <View style={styles.caixaDropdowns}>
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

          {/* checkbox p/ salvar login no cache */}
          <View style={styles.viewInput}>
            <Text>Lembrar Login? </Text>
            <CheckBox 
                value={checkbox}
                onValueChange={(toggle) => setCheckbox(toggle)}
            />
          </View>
        </View>
        <View style={styles.viewBotoes}>
          {/* Botões para Teste */}
          <TouchableOpacity 
          style={usuario == "" || senha == "" || email == "" || telefone == "" ? styles.botao2 : styles.botao} 
          disabled={usuario == "" || senha == "" || email == "" || telefone == ""}
          onPress={() => registra()}>
            <Text>Cadastrar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={usuario == "" || senha == "" ? styles.botao2 : styles.botao} 
          onPress={() => fazLogin(usuario, senha)}
          disabled={usuario == "" || senha == ""}
          >
            <Text>Login</Text>
          </TouchableOpacity>
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
    justifyContent: 'space-between',
    flexDirection: 'row',
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

  caixaDropdowns: {
    flex: 3,
    paddingBottom: 10,
    width: 300,
    flexDirection: 'column',
  },

  viewInput: {
    flexDirection: 'row',
    elevation: 5,
    backgroundColor: '#fff',
    margin: 15,
    padding: 10,
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

  botao2: {
    width: 150,
    height: 35,
    backgroundColor: '#aaa',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 10,
  },

  textoInput: {
    textAlignVertical: 'center',
  }

});

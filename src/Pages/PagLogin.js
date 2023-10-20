import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, FlatList, SafeAreaView } from 'react-native';
import { buscaLogin, criaTabela, registraLogin } from '../database/Queries';
import CheckBox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PagLogin({ navigation }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
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
        // value previously stored
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
      senha: senha
    };

    // Checa se o usuário já foi cadastrado; Se não, o cadastra; Se sim, informa que já há um cadastro.
    const cadastros = await buscaLogin(usuario, senha);
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
      // algo aqui
      if (checkbox) {
        await salvaLogin({usuario: usuario, senha: senha}, "real");
      }
      else {
        await salvaLogin({usuario: usuario, senha: ""}, "fake");
      }
      navigation.navigate("PagDepois");
    }
  }
  

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.caixaTitulo}>
        <Text>Cadastro</Text>
      </View>
      <View style={styles.caixaDropdowns}>
        <View style={styles.viewInput}>
          <Text>Usuário: </Text>
          <TextInput
            onChangeText={setUsuario}
            style={styles.input}
          />
        </View>
        <View style={styles.viewInput}>
          <Text>Senha: </Text>
          <TextInput
            onChangeText={setSenha}
            secureTextEntry={true}
            autoCorrect={false}
            style={styles.input}
          />
        </View>
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
        <TouchableOpacity style={usuario == "" || senha == "" ? styles.botao2 : styles.botao} 
        disabled={usuario == "" || senha == ""}
        onPress={() => registra()}>
          <Text>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={usuario == "" || senha == "" ? styles.botao2 : styles.botao} 
        onPress={() => fazLogin(usuario, senha)}
        disabled={usuario == "" || senha == ""}
        >
          <Text>Mostrar Usuários</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    flexDirection: 'row'
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
  }

});

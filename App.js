import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, FlatList, SafeAreaView } from 'react-native';
import { buscaLogin, criaTabela, registraLogin } from './src/Queries';

export default function App() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [listaUsuarios, setListaUsuarios] = useState([]);

  useEffect(() => {
    criaTabela();
  }, []);

  async function mostraUsuarios() {
    const logins = await buscaLogin();
    setListaUsuarios = logins;
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
      </View>
      <View style={styles.viewBotoes}>
        <TouchableOpacity style={styles.botao} onPress={() => usuario != "" && senha != "" ? registraLogin(usuario, senha) : Alert.alert("Usuário ou senha inválidos.")}>
          <Text>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={() => mostraUsuarios(usuario, senha)}>
          <Text>Mostrar Usuários</Text>
        </TouchableOpacity>
        <FlatList
          data={listaUsuarios}
          renderItem={(item) => (
            <View>
              <Text>{item.id}</Text>
              <Text>{item.usuario}</Text>
              <Text>{item.senha}</Text>
            </View>
          )}
        />
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
  },

  caixaTitulo:{
    flex: 1,
    justifyContent: 'center',

  },

  caixaDropdowns: {
    flex: 3,
    paddingBottom: 10,
    width: 300,
  },

  viewInput: {
    flexDirection: 'row'
  },

  input: {
    width: "100%", 
    paddingLeft: 10,
  }

});

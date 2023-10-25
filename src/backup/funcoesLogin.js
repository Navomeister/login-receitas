
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

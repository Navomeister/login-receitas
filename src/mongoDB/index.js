import CryptoES from "crypto-es";

const apiKey = "7nAZeSnIKzt3oqjsUJXdQgNAHh641DO6Ily1yOFhPjb1o4DgT8mqr2MYoULzPgVL";

export async function ProcuraUsuario( usuario ) {
    return new Promise ((resolve, reject) => {
        fetch("https://data.mongodb-api.com/app/data-rmezf/endpoint/data/v1/action/findOne", {
            method: "POST",
            body: JSON.stringify({
                collection: "usuarios",
                database: "Login",
                dataSource: "TesteLogin",
                filter: {usuario: usuario},
            }),
            headers: {
                "Content-type": "application/json",
                "Access-Control-Request-Headers": "*",
                "api-key": apiKey
            }
          })
          .then((response) => response.json())
          .then((json) => resolve(json))

    })
}

export async function ProcuraEmail( email ) {
    return new Promise ((resolve, reject) => {
        fetch("https://data.mongodb-api.com/app/data-rmezf/endpoint/data/v1/action/findOne", {
            method: "POST",
            body: JSON.stringify({
                collection: "usuarios",
                database: "Login",
                dataSource: "TesteLogin",
                filter: {email: email},
            }),
            headers: {
                "Content-type": "application/json",
                "Access-Control-Request-Headers": "*",
                "api-key": apiKey
            }
          })
          .then((response) => response.json())
          .then((json) => resolve(json))

    })
}


export async function Cadastra( params ) {
    const senhaEncrip = CryptoES.MD5(params.senha).toString();
    const cadastro = {usuario: params.usuario, senha: senhaEncrip, email: params.email, telefone: params.telefone};

    return new Promise ((resolve, reject) => {
        fetch("https://data.mongodb-api.com/app/data-rmezf/endpoint/data/v1/action/insertOne", {
            method: "POST",
            body: JSON.stringify({
                collection: "usuarios",
                database: "Login",
                dataSource: "TesteLogin",
                document: cadastro
            }),
            headers: {
                "Content-type": "application/json",
                "Access-Control-Request-Headers": "*",
                "api-key": apiKey
            }
          })
          .then((response) => response.json())
          .then((json) => resolve(json));

    })

}

export async function TentaLogin( params ){
    const senhaEncrip = CryptoES.MD5(params.senha).toString();
    const credenciais = {usuario: params.usuario, senha: senhaEncrip};

    return new Promise ((resolve, reject) => {
        fetch("https://data.mongodb-api.com/app/data-rmezf/endpoint/data/v1/action/findOne", {
            method: "POST",
            body: JSON.stringify({
                collection: "usuarios",
                database: "Login",
                dataSource: "TesteLogin",
                filter: credenciais
            }),
            headers: {
                "Content-type": "application/json",
                "Access-Control-Request-Headers": "*",
                "api-key": apiKey
            }
          })
          .then((response) => response.json())
          .then((json) => resolve(json));
    })

}
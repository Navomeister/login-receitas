import login from './Login';
import { MD5 } from 'crypto-es/lib/md5';

export function criaTabela() {
  login.transaction((tx) => {
    tx.executeSql(
      `
        CREATE TABLE IF NOT EXISTS Login (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          usuario TEXT,
          senha TEXT
        );
      `,
      [],
      (_, error) => {
        console.log(error);
      }
    );
  });
}

export async function buscaLogin(usuario = "", senha = "") {
  return new Promise((resolve, reject) => {
    login.transaction((tx) => {
      let comando;
      if (usuario === "" && senha === "") {
        return ([]);
      } else {
        const senhaEncrip = MD5(senha).toString();
        comando = `SELECT * FROM Login WHERE usuario = "${usuario}" AND senha ="${senhaEncrip}";`;
      }
      tx.executeSql(comando, [],
        (transaction, resultado) => {
          console.log(resultado);
          resolve(resultado.rows._array);
        },
        (_, error) => {
          reject(error)
        }
      )
    })
  })
}



export async function registraLogin(params) {
  const senhaEncrip = MD5(params.senha).toString();
  return new Promise((resolve, reject) => {
    login.transaction((tx) => {
      tx.executeSql(
        `
            INSERT INTO Login (usuario, senha) VALUES (?, ?);
          `,
        [
          params.usuario,
          senhaEncrip
        ],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) {
            resolve(insertId);
            console.log("Registrado.")
          }
          else {
            reject("Erro ao adicionar nota: " + JSON.stringify(nota));
          }
        },
        (_, error) => reject(error)
      )
    })
  })
}


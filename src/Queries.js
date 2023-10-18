import login from './Login';
import { MD5 } from 'crypto-es/lib/md5';

export function criaTabela(){
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

export async function buscaLogin({usuario = "*", senha = "*"}) {
    return new Promise((resolve, reject) => {
        login.transaction((tx) => {
            let comando;
            if (usuario === "*" && senha === "*") {
              comando = "SELECT * FROM Login;";
            } else {
              const senhaEncrip = MD5(senha).toString();
              comando = `SELECT * FROM Login WHERE usuario = "${usuario}" && senha ="${senhaEncrip};`;
            }
      
            tx.executeSql(comando, [],
              (transaction, resultado) => {
                resolve(resultado.rows._array);
              },
              (_, error) => reject(error)
            )
          })
      })
}



export function registraLogin({usuario, senha}) {
    const senhaEncrip = MD5(senha).toString();
    return new Promise((resolve, reject) => {
        login.transaction((tx) => {
          tx.executeSql(
            `
                INSERT INTO Login (usuario, senha) VALUES (?, ?);
            `, 
            [
              usuario,
              senhaEncrip
            ],
            (_, { rowsAffected, insertId }) => {
              if (rowsAffected > 0) resolve(insertId);
              else reject("Erro ao adicionar usuário: " + JSON.stringify(usuario, senha));
            },
            (_, error) => reject(error)
          )
        })
      })
}


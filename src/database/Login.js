import * as SQLite from 'expo-sqlite';

const login = SQLite.openDatabase('login.db');

export default login;
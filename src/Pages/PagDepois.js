import { Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function PagDepois({ navigation }) {
    // Sobrepõe o login salvo localmente
  const desfazLogin = async () => {
    try {
      await AsyncStorage.setItem('dados', "");
      await AsyncStorage.setItem('logado', "");
    } catch (e) {
      // saving error
      console.log(e);
    }
  };
    return(
        <View>
            <TouchableOpacity onPress={() => (navigation.navigate("PagLogin"), desfazLogin())}>
                <Text> Voltar </Text>
            </TouchableOpacity>
        </View>
    )

}
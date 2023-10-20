import { Text, TouchableOpacity, View } from "react-native";


export default function PagDepois({ navigation }) {
    return(
        <View>
            <TouchableOpacity onPress={() => navigation.navigate("PagLogin")}>
                <Text> Voltar </Text>
            </TouchableOpacity>
        </View>
    )

}
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Feather";

export default function ModalMenu({navigation, modalVisible, setModalVisible}) {
    return(
        <View>
            <Modal style={styles.modal}
                isVisible={modalVisible}
                animationIn="slideInRight"
                animationOut="slideOutRight"
                onBackdropPress={() => setModalVisible(false)}
                onSwipeComplete={() => setModalVisible(!modalVisible)}
                swipeDirection="right">
                <View style={{alignSelf: 'flex-end'}}>
                    <Icon onPress={() => setModalVisible(!modalVisible)} name="x" size={50}/>
                </View>
                <View>
                    <View style={styles.linha}/>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("")}
                            style={styles.botoes}
                        >
                            <Text style={styles.texto}>Algum Lugar</Text>
                        </TouchableOpacity>
                    <View style={styles.linha}/>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("")}
                            style={styles.botoes}
                        >
                            <Text style={styles.texto}>Outro Lugar</Text>
                        </TouchableOpacity>
                    <View style={styles.linha}/>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    imagemLogo: {
      width: 100,
      height: 30,
    },
    modal: {
      backgroundColor: '#fff',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      margin: 0,
      marginLeft: 150,
      borderTopLeftRadius: 25,
      borderBottomLeftRadius: 25,
    },
    botoes: {
        height: 60,
        justifyContent: 'center',
        width: 200
    },
    texto: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    linha: {
        backgroundColor: '#aaa', 
        width: 200, 
        height: 1,
    }
  
  });
  
  
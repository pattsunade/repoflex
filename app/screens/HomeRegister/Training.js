import React, { useRef,useState,useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Alert, TouchableOpacity ,Dimensions} from 'react-native';
import { Button, Divider,Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-easy-toast";
import { Video } from 'expo-av';
import BackEndConnect from "../../utils/BackEndConnect";

const { width, height } = Dimensions.get('window');

export default function Training () {
    const toastRef = useRef(); 
    const navigation = useNavigation();
    const [formData, setFormData] = useState(defaultFormValue());
    const [testUri, setTestUri] = useState("");
    const [course,setCourse] = useState("");

    useEffect(() => {
        async function getData() {
            const uri = await BackEndConnect("POST","cours").then((ans)=>
            {
                console.log(ans.ans.lnk);
                setCourse(ans.ans.lnk);
            })
            .catch((ans) => {
                console.log(ans);
            });
        }
        getData();
    },[])


    function defaultFormValue() {
        return {
          abc: [
              {qui:1,res:"n"},
              {qui:5,res:"m"}
            ],
        };
      }
      function formato(objeto) {
        return{
          abc : objeto.abc, 
        };
      }
    const onSubmit = () =>{
        Alert.alert(
            "Prueba de entrenamiento",
            "Empezar prueba para medir los conocimientos y continuar con el registro",
            [
                {
                    text: "Ver denuevo",
                    style: "cancel"
                },
                {
                    text: "Continuar",
                    onPress: () => navigation.navigate("training2")
                }
            ],
            {cancelable:false}
        )
    }

    return (
        <ScrollView>   
            <View style={styles.viewContainer2}>
            <TouchableOpacity style={styles.customBtn} >
                <View style={styles.wrapper}>
                    <View style={styles.container}>                    
                        <View >
                            <Text style={styles.customBtnText}>Video</Text>
                            <Text style={styles.customBtnTextContent} >Video introductorio, se te realizara un test terminado el video.</Text>                 
                            <Video
                                source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
                                shouldPlay
	                            resizeMode="cover"
                                rate={1.0}
                                volume={1.0}
                                shouldPlay={false}
                                useNativeControls
	                            style={{ width: 280, height: 200, bottom:60 }}

                            />
                            
                        </View>                    
                    </View>
                </View>         
            </TouchableOpacity>
            <Button
                    title="Empezar Prueba"
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btn}
                    onPress={onSubmit}
                    
            />
            </View>
            <View style= {styles.viewZolbit}>
                <Text> {course} </Text>
            </View>
            <Divider style= {styles.divider} />
            <View style={styles.viewZolbit}>
                    <Text >Un producto de <Text style = {styles.textZolbit}>Zolbit</Text></Text>    
            </View>
            <Toast ref={toastRef} position="center" opacity={0.9} />
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    video: {
        width: width,
        height: height / 3
    },
    viewContainer:{
        marginRight: 40,
        marginLeft: 40,
        marginTop: 15,
        marginBottom:5,
        justifyContent: "center",
        alignItems: "center",
    },
    viewContainer2:{
        marginRight: 30,
        marginLeft: 30,
        marginTop: 50,
    },
    texttitle: {
        marginTop:50,
        marginBottom:50,
        marginHorizontal:20,
        fontSize: 17,
        textAlign:"justify"
    },
    textRegister:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",  
    },
    btnRegister:{
        color: "#6B35E2",
        fontWeight: "bold",
    },
    divider:{
        backgroundColor: "#6B35E2",
        margin: 40,
    },
    viewZolbit:{
        justifyContent: "center",
        alignItems: "center",
        
    },
    textZolbit: {
        fontWeight: "bold",
    },
    customBtnText: {
        fontSize: 20,
        fontWeight: "400",
        marginVertical:5,
    },
    customBtnTextContent: {
        marginBottom:100,
        textAlign: "justify",
        
        },
    customBtn: {
        backgroundColor: "#fff",
        paddingHorizontal: 30,
        paddingVertical: 5,
        borderRadius: 10,
        marginTop:5 ,
        marginBottom:5
    },
    container: {
        flex: .5,
        flexDirection: 'row',
        justifyContent: 'flex-start', //replace with flex-end or center
        alignItems:"center"
    },
    wrapper: {
        flex: 1,
    
    },
    btnContainer: {
        marginTop: 20,
        width: "95%",
        marginLeft: 10,
      },
    btn: {
        backgroundColor: "#6B35E2",
        borderRadius: 50,
      },
});
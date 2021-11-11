import React, { useState,useRef,useCallback } from "react";
import { StyleSheet, Text, View, ScrollView, Alert, TouchableOpacity ,Dimensions} from 'react-native';
import { Button, Divider,Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import TrainingQuestions from "../../components/HomeRegister/TrainingQuestions";
import BackEndConnect from "../../utils/BackEndConnect"
import Loading from "../../components/Loading";

const { width, height } = Dimensions.get('window');

export default function Training2 () {
    const navigation = useNavigation();
    const [questions, setQuestion] = useState([]);
    const [tid, setTid] = useState(0);
    const [loading, setLoading] = useState(false);

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            BackEndConnect("POST","quest").then(async (response) => {
                var questions = response.ans.test;
                var tid = response.ans.tid;
                setQuestion(questions);
                setTid(tid);
                setLoading(false);
            })
            .catch((ans) =>
        { console.log(ans);
          setError(true);
          setLoading(false);
          AsyncStorage.removeItem('@ott');
          Toast.show(
          { type: 'error',
            props: {onPress: () => {}, text1: 'Error', text2: 'Error interno, por favor inicia sesión nuevamente.'
            },
            autohide: false
          });
          navigation.reset({
            index: 0,
            routes: 
            [ { name: 'login',
              }
            ],
            })
          setLoading(false);
          }
        );
        }, [])
      );
    return (
        <ScrollView>
            
            <View>
                <TrainingQuestions navigation={navigation} questions={questions} tid={tid}/>
            </View>
            
            <Divider style= {styles.divider} />
            <View style={styles.viewZolbit}>
                    <Text >Un producto de <Text style = {styles.textZolbit}>Zolbit</Text></Text>    
            </View>
            <Loading isVisible={loading} text="Cargando preguntas"/>
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
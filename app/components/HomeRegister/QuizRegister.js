import React, { useRef,useState } from "react";
import { StyleSheet,StatusBar, Text, View, ScrollView,  TouchableOpacity ,Dimensions,SafeAreaView} from 'react-native';
import {  Divider,Icon,Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import Toast from "react-native-easy-toast";
import BackEndConnect from "../../utils/BackEndConnect";

const { width, height } = Dimensions.get('window');

export default function Training3 (props) {
    const { questions, tid } = props;
    const toastRef = useRef(); 
    const navigations = useNavigation();
    const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
    const [formData, setFormData] = useState([]);
    console.log(tid);
    function formato(formData) {
        return {
            tid: tid,
            abc: formData
        };
    }

    async function answer() {
        await BackEndConnect("POST","answr",formato(formData)).then(async (ans) => {
          if (ans.ans.stx === "ok"){
            navigations.navigate("homeregister")
          }
          else{
              console.log("Algo salio mal");
          }
        });
      }

    const handleAnswerOptionClick = (res,qid) => {
        formData.push({qid:qid,aid:res})
		// if (res) {
		// 	setScore(score + 1);
		// }
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
            BackEndConnect("POST","answr",formato(formData)).then(async (ans) => {
                await console.log("RESPUESTA DENTRO:",ans.ans.stx);
                if (ans.ans.stx === "ok"){
                    if (ans.ans.msg === "Aprobado"){
                        navigations.navigate("goodtraining");
                    }
                    else{
                        navigations.navigate("badtraining");
                    }
                }
                else{
                    toastRef.current.show("Error de comunicación.",2000);
                    console.log("Algo salio mal");
                }
              });
		}
	};

    return(
        <View>
            {showScore ? (
                <View> 
                    <Text style={styles.texttitle }>FORMULARIO TERMINADO</Text>
                </View>
            ):(
                <>
                <View>
                    <View>
                        <Text style={styles.title}>{questions[currentQuestion].enu} ? </Text>
                    </View>
                        <Text style={styles.text}>Pregunta {currentQuestion + 1} / {questions.length} </Text>
                </View>
                <View>
                    {questions[currentQuestion].alt.map(({aid, txt}) => (
							<Button key={aid} containerStyle={styles.btnContainer} buttonStyle={styles.btn} title={txt} onPress={() => handleAnswerOptionClick(aid,questions[currentQuestion].qid)}/>
						))}
                </View>
                </>
            )}
        </View>
    );
      
}

const styles = StyleSheet.create({
    title: {
        marginTop:50,
        marginBottom:80,
        marginHorizontal:20,
        fontSize: 30,
        textAlign:"center",
        fontWeight: "bold",
    },
    text: {
        marginTop:30,
        marginBottom:10,
        marginHorizontal:20,
        fontSize: 20,
        textAlign:"center"
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
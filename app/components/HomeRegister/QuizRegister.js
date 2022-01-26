import React, { useRef,useState } from "react";
import { StyleSheet,StatusBar, Text, View, ScrollView,  TouchableOpacity ,Dimensions,SafeAreaView} from 'react-native';
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import BackEndConnect from "../../utils/BackEndConnect";
import Toast from 'react-native-toast-message';
import Loading from "../../components/Loading";

export default function Training3 (props) {
  const { questions, tid } = props;
  const navigations = useNavigation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  function formato(formData)
  { return{
      tid: tid,
      abc: formData
    };
  }
  
  const handleAnswerOptionClick = (res,qid) => {
    formData.push({qid:qid,aid:res})
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) 
      setCurrentQuestion(nextQuestion);
    else
    { setLoading(true);
      BackEndConnect("POST","answr",formato(formData)).then((ans) => 
      { console.log(ans.ans.stx);
        if (ans.ans.stx !== "ok")
        { Toast.show(
          { type: 'error',
            props: 
            { onPress: () => {}, text1: 'Error', text2: "Error conexión " + ans.ans.stx
            }
          });
        }
        else
        { if (ans.ans.msg === "Aprobado")
            navigations.navigate("goodtraining");
          else
            navigations.navigate("badtraining");
        }
        setLoading(false);
      })
      .catch((ans)=>
      { Toast.show(
        { type: 'error',
          props: 
          { onPress: () => {}, text1: 'Error', text2: "Error interno. Porfavor inicia sesión nuevamente."
          }
        });
        navigations.navigate("homeregister");
        setLoading(false);
      });
    }
  };
  
  return(
  <>
    { loading ? (<Loading text="Enviando respuestas..."/>):
      ( <View>
        { showScore ?
          ( <View> 
              <Text style={styles.texttitle }>FORMULARIO TERMINADO</Text>
            </View>
          ):
          ( <>
              <View>
                <View>
                  <Text style={styles.title}>{questions[currentQuestion].enu} ? </Text>
                </View>
                <Text style={styles.text}>Pregunta {currentQuestion + 1} / {questions.length} </Text>
                {questions[currentQuestion].alt.map(
                  (answerOption) => 
                    ( <Button 
                        key={answerOption.aid}
                        containerStyle={styles.btnContainer}
                        buttonStyle={styles.btn}
                        title={answerOption.txt}
                        onPress={() => handleAnswerOptionClick(answerOption.aid,questions[currentQuestion].qid)}
                      />
                    )
                  )
                }
              </View>
            </>
          )
        }
      </View>
      )
    }
  </>
  )
}

const styles = StyleSheet.create({
  title:
  { marginTop:50,
    marginBottom:80,
    marginHorizontal:20,
    fontSize: 30,
    textAlign:"center",
    fontWeight: "bold"
  },
  text:
  { marginTop:30,
    marginBottom:10,
    marginHorizontal:20,
    fontSize: 20,
    textAlign:"center"
  },
  texttitle:
  { marginTop:50,
    marginBottom:50,
    marginHorizontal:20,
    fontSize: 17,
    textAlign:"justify"
  },
  btnContainer:
  { marginTop: 20,
    width: "95%",
    marginLeft: 10,
  },
  btn:
  { backgroundColor: "#6B35E2",
    borderRadius: 50,
  }
});
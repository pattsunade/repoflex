import React, { useState,useCallback } from "react";
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import { Button, Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import TrainingQuestions from "../../components/HomeRegister/TrainingQuestions";
import BackEndConnect from "../../utils/BackEndConnect"
import Loading from "../../components/Loading";

export default function Training2 () {
  const navigation = useNavigation();
  const [questions, setQuestion] = useState([]);
  const [tid, setTid] = useState(0);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() =>
    { setLoading(true);
      BackEndConnect("POST","quest").then(async (response) =>
      { if (response.ans.stx!='ok')
        { Toast.show(
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
        else
        { var questions = response.ans.test;
          var tid = response.ans.tid;
          setQuestion(questions);
          setTid(tid);
          setLoading(false);
        }
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
      });
    }, [])
  );
  return (
  <>
    { loading ? (<Loading text="Cargando preguntas..."/>):
      ( <ScrollView>    
          <View>
            <TrainingQuestions navigation={navigation} questions={questions} tid={tid}/>
          </View>
          <Divider style= {styles.divider} />
          <View style={styles.viewZolbit}>
            <Text >Un producto de <Text style = {styles.textZolbit}>Zolbit</Text></Text>    
          </View>
        </ScrollView>
      )  
    }
  </>
  )
}

const styles = StyleSheet.create({
  divider:
  { backgroundColor: "#6B35E2",
    margin: 40,
  },
  viewZolbit:
  { justifyContent: "center",
    alignItems: "center",  
  },
  textZolbit:
  { fontWeight: "bold",
  },
});
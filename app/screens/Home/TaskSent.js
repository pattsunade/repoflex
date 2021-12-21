import React, { useState,useCallback } from "react";
import { StyleSheet, View,Text,ActivityIndicator} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from "@react-navigation/native";
import BackEndConnect from "../../utils/BackEndConnect";
import ListTaskSent from "../../components/Home/ListTaskSent";
import ListTaskInRevision from "../../components/Home/ListTaskInRevision";

export default function TaskSent() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const Tab = createMaterialTopTabNavigator();
  function formato() {
    return{
      tat: 4,
      lat: 12345,
      lon: 54321
    };
  }
  useFocusEffect(
    useCallback(() =>
    { BackEndConnect("POST","tasks",formato()).then(async (response) =>
      { const array = response.ans.tas;
        setMsg(response.ans.msg);
        setData(array);
        setLoading(false);
      });
    },
    [])
  );

  function Sent()
  { return(
      <>
        { data == null ?
        ( <View>
            <Text style={styles.title}>{msg}</Text>
          </View>
        ):
        ( <View>
            <View style={styles.viewForm}>
              <ListTaskSent data={data}/>
            </View>
          </View>
        )
        }
      </>
    )
  }

  function InRevision()
  { return(
      <>
        { data == null ?
        ( <View>
            <Text style={styles.title}>no hay tareas en revision</Text>
          </View>
        ):
        ( <View>
            <View style={styles.viewForm}>
              <ListTaskSent data={data}/>
            </View>
          </View>
        )
        }
      </>
    )
  }

  return(
  <>
    { loading ? 
      ( <View style={styles.loaderTask}>
          <ActivityIndicator  size="large" color="#0000ff"/>
          <Text>Cargando Tareas</Text>
        </View>):
      ( <Tab.Navigator>
            <Tab.Screen name="Enviadas" component={Sent} />
            <Tab.Screen name="En revisión" component={InRevision} />
        </Tab.Navigator>)
    }
  </>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,  
  },
  viewForm: {
    marginRight: 40,
    marginLeft: 40,
  },
  loaderTask: {
    marginTop:100,
    marginBottom: 10,
    alignItems: "center",
  },
  title:{
    textAlign: 'center',
    fontWeight:"bold",
    paddingBottom:5,
    marginTop:10,
    marginBottom:10,
    fontSize:20,
    //color: "#6B35E2",
    justifyContent:"center"
  }
});
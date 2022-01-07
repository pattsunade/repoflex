import React, { useState,useRef,useEffect } from "react";
import { StyleSheet, View, Text,Picker, Switch, Animated, ScrollView,TouchableOpacity,Dimensions,SafeAreaView } from "react-native";
import { Input, Icon, Button, ListItem} from "react-native-elements";
import Loading from "../Loading";
import { size, isEmpty,map } from "lodash";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from "moment";

export default function HomeApp(props) {
  const navigation = useNavigation();
  const {name, amou, rank, avai, asgn, proc, envi, chck, fini, loca, work, noti, levl} = props;
  const [isEnabled, setIsEnabled] = useState(false);
  const [newDate, setNewDate] = useState(moment(new Date()).format('DD-MM-YYYY HH:MM'))
  const [number, setNumber] = useState(0);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const RZ = String(rank).charAt(0);
  const RR = String(rank).charAt(2);
  const RI = String(rank).charAt(4);
  const [active, setActive] = useState(false)
  let transformX = useRef(new Animated.Value(0)).current

  // function refresh()
  // { setNewDate(moment(new Date()).format('DD-MM-YYYY HH:MM'));
  //   console.log("hola")
  // }

  // useEffect(()=>
  // { console.log(moment(new Date()).format('DD-MM-YYYY HH:MM'));
  //   setNewDate(moment(new Date()).format('DD-MM-YYYY HH:MM'));
  // },[number])

  // useEffect(() => {
  //   if (active) {
  //     Animated.timing(transformX, {
  //       toValue: 1,
  //       duration: 300,
  //       useNativeDriver: true
  //     }).start()
  //   } else {
  //     Animated.timing(transformX, {
  //       toValue: 0,
  //       duration: 300,
  //       useNativeDriver: true
  //     }).start()
  //   }
  // }, [active]);

  // const rotationX = transformX.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: [2, Dimensions.get('screen').width / 2]
  // })
  
  return (
    <View>
      <View style={styles.viewContainerInfo}>
        <View style={{flexDirection:'column'}}>
          <Text style={styles.texttitle}>Ubicación: {"\n"} <Text style={{fontWeight:'bold'}}> {loca}</Text></Text>
          <Text style={styles.texttitle2}>Última actualización: {"\n"} <Text style={{fontWeight:'bold'}}> {newDate}</Text></Text>
          <Text style={styles.texttitleSaludo}>Hola, </Text>
          <Text style={styles.texttitleNombre}>
            {name}.
          </Text>
        </View>
        <View style={{flexDirection:'column',justifyContent:'space-around','marginLeft':25}}>
          <Icon
            size={40}
            type="material-community"
            name="refresh"
            color= "#5300eb"
            containerStyle={styles.btnContainer}
            // onPress={()=>setNumber(1)}
          />
          <Icon
            size={40}
            type="material-community"
            name="account-circle"
            color= "#5300eb"
            containerStyle={styles.btnContainer}
            onPress={ () => navigation.navigate("account",
              { nameuser:name,
                level:levl
              })
            }
          />
        </View>
      </View>
      <View style={styles.wrapperInfo}>
        <View style = {styles.container}>
          <View style={styles.circleViewRZ}>
            <Text style={styles.circleText}>{RZ}</Text>
          </View>
          <View style={styles.circleViewRR}>
            <Text style={styles.circleText}>{RR}</Text>
          </View>
          <View style={styles.circleViewRI}>
            <Text style={styles.circleText}>{RI}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.customBtn}>
        <Text style={styles.customBtnTextContent}>Tienes un saldo a favor de </Text>
        <Text style={styles.customBtnTextContentPrice}>$ {amou}</Text>
        {/*<Icon 
          size={15}
          type="material-community"
          name="information-outline"
          color= "black"
          containerStyle={styles.btnContainer}
          onPress={()=> navigation.navigate("home")}
        />*/}
      </TouchableOpacity>
      <View>
        <Text style={styles.texttitleResume}>RESUMEN DE MIS TAREAS</Text>      
      </View>
      <View>
        <ListItem
          key="1"
          onPress={()=> navigation.navigate("taskavailable")}
          Chevron
          bottomDivider
        >
          <Icon name="view-list" color="#6B35E2"/>
          <ListItem.Content>
            <ListItem.Title style={styles.menuItem}>Disponibles</ListItem.Title>
          </ListItem.Content>
          <ListItem.Content>
            <ListItem.Title style={styles.numberItem}>{avai}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron color="#6B35E2" />
        </ListItem>
        <ListItem
          key="2"
          onPress={()=> navigation.navigate("taskassigned")}
          Chevron
          bottomDivider
        >
          <Icon name="view-list" color="#6B35E2"/>
          <ListItem.Content>
            <ListItem.Title style={styles.menuItem}>Asignadas</ListItem.Title>
          </ListItem.Content>
          <ListItem.Content>
            <ListItem.Title style={styles.numberItem}>{asgn}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron color="#6B35E2"/>
        </ListItem>
        {/*<ListItem
          key="3"
          onPress={()=> navigation.navigate("taskinprogress")}
          Chevron
          bottomDivider
        >
          <Icon name="view-list" color="#6B35E2"/>
          <ListItem.Content>
            <ListItem.Title style={styles.menuItem}>En proceso</ListItem.Title>
          </ListItem.Content>
          <ListItem.Content>
            <ListItem.Title style={styles.numberItem}>{proc}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron color="#6B35E2"/>
        </ListItem>*/}
        <ListItem
          key="3"
          onPress={()=> navigation.navigate("tasksent")}
          Chevron
          bottomDivider
        >
          <Icon name="view-list" color="#6B35E2"/>
          <ListItem.Content>
            <ListItem.Title style={styles.menuItem}>Enviadas</ListItem.Title>
          </ListItem.Content>
          <ListItem.Content>
            <ListItem.Title style={styles.numberItem}>{envi}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron color="#6B35E2"/>
        </ListItem>
        {/*<ListItem
          key="4"
          onPress={()=> navigation.navigate("taskinrevision")}
          Chevron
          bottomDivider
        >
          <Icon name="view-list" color="#6B35E2"/>
          <ListItem.Content>
            <ListItem.Title style={styles.menuItem}>En Revisión</ListItem.Title>
          </ListItem.Content>
          <ListItem.Content>
            <ListItem.Title style={styles.numberItem}>{chck}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron color="#6B35E2"/>
        </ListItem>*/}
        <ListItem
          key="5"
          onPress={()=> navigation.navigate("taskfinished")}
          Chevron
          bottomDivider
        >
          <Icon name="view-list" color="#6B35E2"/>
            <ListItem.Content>
              <ListItem.Title style={styles.menuItem}>Finalizadas</ListItem.Title>
            </ListItem.Content>
            <ListItem.Content>
              <ListItem.Title style={styles.numberItem}>{fini}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron color="#6B35E2"/>
        </ListItem>
      </View>
      {/*<SafeAreaView style={{
          flex: 1,
          alignItems: 'center',
          marginTop: 20
      }}>
        <View style={{
          flexDirection: 'row',
          position: 'relative',
          height: 50,
          borderRadius: 10,
          backgroundColor: '#efebf0',
          marginHorizontal: 5
          }}>
          <Animated.View
            style={{
              position: 'absolute',
              height: 50 - 2*2,
              top: 2,
              bottom: 2,
              borderRadius: 10,
              width: Dimensions.get('screen').width / 2 - 2 - 5*2 - 80,
              transform: [
                {
                  translateX: rotationX
                }
              ],
              backgroundColor: active ? "#1273DE":"#bedadc"
            }}
          >
          </Animated.View>
          <TouchableOpacity style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-start',
            marginLeft:45
          }} onPress={() => setActive(false)}>
            <Text style={styles.switchText}>
              off
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
            marginRight:45
          }} onPress={() => setActive(true)}>
            <Text style={styles.switchText}>
              on
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>*/}
    </View>
  );
}
const styles = StyleSheet.create(
{ viewContainerInfo:
  { marginRight: 10,
    marginLeft: 10,
    marginBottom:0,
    flexDirection:'row'
  },
  logo:
  { width: "100%",
    height: 150,
    marginTop: 40,
  },
  texttitle:
  { marginTop:50,
    marginBottom:5,
    marginHorizontal:0,
    fontSize: 17,
    textAlign:"justify"
  },
  texttitle2:
  { marginTop:10,
    marginBottom:5,
    marginHorizontal:0,
    fontSize: 17,
    textAlign:"justify"
  },
  texttitleSaludo:
  { marginTop:0,
    fontWeight: "bold",
    color: "#59575C",
    marginHorizontal:0,
    fontSize: 30,
    textAlign:"justify"
  },
  texttitleNombre:
  { marginBottom:10,
    color:"#59575C",
    marginHorizontal:0,
    fontSize:30,
    textAlign:"justify"
  },
  texttitleResume:
  { marginTop:10,
    marginBottom:20,
    color: "#59575C",
    marginHorizontal:0,
    fontSize: 20,
    textAlign:"justify"
  },
  textRegister:
  { flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerInfo:
  { flex: .5,
    flexDirection:'row',
    justifyContent:'center', //replace with flex-end or center
    alignItems:"center",
    marginRight:100,
  },
  wrapperInfo:
  { flex: 1,
    marginBottom:50
  },
  container:
  { marginBottom:15,
    flex: .5,
    flexDirection: 'row',
    justifyContent: 'flex-start', //replace with flex-end or center
  },
  iconLeft1:
  { color: "#CF0404",
    marginRight: 7,
    marginLeft:65,
  },
  iconLeft2:
  { color: "#27C600",
    marginRight: 7,
    marginLeft:65,
  },
  btnContainer:
  { justifyContent: 'center',
    top: 25,
    right: 5,
    //sombreado
  },
  btnMontoIn:
  { width: "100%",
    marginBottom: 10  
  },
  btnMonto:
  { backgroundColor: "#6B35E2",
    marginHorizontal: 10,
    borderRadius:30
  },
  customBtn:
  { backgroundColor: "#fff",
    borderRadius: 25,
    marginTop:5,
    marginBottom:5,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15 ,
    shadowOffset : { width: 1, height: 13}
  },
  customBtnTextContent:
  { marginTop:5,
    marginBottom:5,
    fontSize: 17,
    color: "#59575C",
    textAlign: "center",
  },
  customBtnTextContentPrice:
  { marginTop:5,
    marginBottom:5,
    fontSize: 15,
    color: "#59575C",
    textAlign: "center",
    fontWeight: "bold",
  },
  numberItem:
  { fontWeight: "bold", 
    left:60,
    fontSize:15,
  },
  menuItem:
  { fontWeight: "bold",
    textAlign: "left",
    fontSize:15,
  },
  circleViewRZ:
  { width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#BCA2E1",
    justifyContent: 'center',
    marginRight:5,
    marginLeft:5
  },
  circleViewRR:
  { width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#8E55DE",
    justifyContent: 'center',
    marginRight:5,
  },
  circleViewRI:
  { width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#6A17DF",
    justifyContent: 'center',
    marginRight:5,
  },
  circleText:
  { fontWeight: "bold", 
    fontSize: 20,
    textAlign: 'center',
    color:"#fff"
  },
  switchText:{
    color: "#000000",
    fontSize: 20
  }
});
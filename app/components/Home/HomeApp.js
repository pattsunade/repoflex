import React, { useState,useRef,useEffect,useCallback } from 'react';
import { StyleSheet, View, Text,Picker, Switch, Animated, ScrollView,TouchableOpacity,Dimensions,SafeAreaView, Pressable } from 'react-native';
import { Input, Icon, Button, ListItem, Card} from 'react-native-elements';
import Loading from '../Loading';
import { size, isEmpty,map } from 'lodash';
import * as Location from 'expo-location';
import Toast from 'react-native-toast-message';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import backendRequest from '../../utils/BackEndConnect';
import moment from 'moment';
import { RefreshControl } from 'react-native';

const formato = (lati,longi) => { 
    return{
        lat: lati,
        lon: longi
    };
}

function CustomListItem ({
	onPress,
	leftIcon,
	counter, 
	text,
    ...props
}) {
	return (
		<ListItem onPress={onPress} {...props}>
			{leftIcon}
			<ListItem.Content>
				<ListItem.Title style={styles.menuItem}>
					{text}
				</ListItem.Title>
			</ListItem.Content>
			<ListItem.Content>
				<ListItem.Title style={styles.numberItem}>
					{counter}
				</ListItem.Title>
			</ListItem.Content>
			<ListItem.Chevron color='#6B35E2' />
		</ListItem>
	)
}

export default function HomeApp(props) {
    const navigation = useNavigation();
    const [name, setName] = useState();
    const [rank, setRank] = useState();
    const [amou, setAmou] = useState();
    const [avai, setAvai] = useState();
    const [asgn, setAsgn] = useState();
    // const [proc, setProc] = useState();
    const [envi, setEnvi] = useState();
    // const [chck, setChck] = useState();
    const [fini, setFini] = useState();
    const [loca, setLoca] = useState();
    const [levl, setLevl] = useState();
    const [noti, setNoti] = useState();
    const [tenp, setTenp] = useState();
    const [work, setWork] = useState();
    const [lati, setLati] = useState();
    const [long, setLong] = useState();
    const [loading, setLoading] = useState(true);
    const [isEnabled, setIsEnabled] = useState(false);
    const [dateObj, setDateObj] = useState(new Date());
    const [displayDate, setDisplayDate] = useState('');
    const [number, setNumber] = useState(0);
    // const RZ = String(rank).charAt(0);
    // const RR = String(rank).charAt(2);
    // const RI = String(rank).charAt(4);

    

    const getHomeData = React.useCallback((latitude,longitude) => { 

        backendRequest('POST','house',formato(latitude,longitude)).then((response) => {
            console.log("success",response);
            const notificaciones = [];
            for (var i = 0; i < response.ans.noti.length; i++) { 
                var counter = response.ans.noti[i];
                notificaciones.push(counter);
            }
            setAmou(response.ans.amou);
            setName(response.ans.name);
            setRank(response.ans.rank);
            setAvai(response.ans.avai);
            setAsgn(response.ans.asgn);
            // setProc(response.ans.proc);
            setEnvi(response.ans.envi);
            // setChck(response.ans.chck);
            setFini(response.ans.fini);
            if(latitude!=999)
                setLoca(response.ans.loca);
            setLevl(response.ans.levl);
            setNoti(notificaciones);
            setWork(response.ans.work);
            setLoading(false);
        })
        .catch((ans) => { 
            console.log("fail", ans);
            Toast.show({ 
                type: 'error',
                props: { 
                    onPress: () => {}, 
                    text1: 'Error', 
                    text2: 'Error conexión. Porfavor inicia sesión nuevamente'
                }
            });
            navigation.reset({ 
                index: 0,
                routes: [{ 
                    name: 'login',
                }],
            });
        }
        );
    },[])

    const [refreshing, setRefreshing] = React.useState(false)
    const onRefresh = React.useCallback(async() => {
		setRefreshing(true)
		console.log("i am refreshing");
		const location = await Location.getCurrentPositionAsync({});
		await getHomeData(
			location.coords.latitude.toString(), 
			location.coords.longitude.toString(),
		)
		setRefreshing(false)

	},[])

    React.useEffect(() => {
        const willFocusSubscription = navigation.addListener('focus', async() => {
            setLoading(true);
            await getHomeData(999,999);
            setLoading(true);
        });
        return willFocusSubscription;
    },[navigation]);

    React.useEffect(() => { 
        const run = async() => {
            
            setDisplayDate(moment(dateObj).format('DD/MM/YY HH:mm'));
			let location = await Location.getCurrentPositionAsync({});
			let latitude = location.coords.latitude.toString();
			let longitude = location.coords.longitude.toString();
			setLati(latitude);
			setLong(longitude);
			await getHomeData(latitude,longitude);
        }
		
        setLoading(true);
        run()
        .catch((e) => {
            console.error(e);
            Toast.show({ 
                type: 'error',
                props: { 
                    onPress: () => {}, 
                    text1: 'Error', 
                    text2: 'Error desconocido.'
                }
            });
        })
        .finally(() => {
            setLoading(false);
        })
	},[dateObj]);

    
    
    

    if(loading) {
        return <Loading isVisible text='Cargando...' />
    } 
    return (
        <SafeAreaView style={styles.fullScreen}>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} progressViewOffset={20}/>
            }>
                <View style={styles.viewContainerInfo} >
                    <Pressable 
                        style={styles.userAccountContainer} 
                        onPress={ () => navigation.navigate('account',{ 
                            nameuser:name,
                            level:levl})}
                        >
                        <Icon
                            size={40}
                            type='material-community'
                            name='account-circle'
                            color= '#5300eb'
                            containerStyle={styles.btnContainer}
                        />
                        <Text style={styles.textUserAccout}>
                            Hola {name}
                        </Text> 
                    </Pressable>                    
                    {/* <View style={{flexDirection:'column'}}>
                        <Text style={styles.texttitle}>Ubicación:</Text>
                        <Text style={{fontWeight:'bold'}}> {loca}</Text>
                        <Text style={styles.texttitle2}>Última actualización:</Text>
                        <Text style={{fontWeight:'bold'}}> {displayDate}</Text>
                        <Text style={styles.texttitleSaludo}>Hola, </Text>
                        <Text style={styles.texttitleNombre}>
                        {name}.
                        </Text>
                    </View> */}
                    
                    {/* <View style={{flexDirection:'column',justifyContent:'space-around','marginLeft':25}}>
                        <Icon
                            size={40}
                            type='material-community'
                            name='refresh'
                            color= '#5300eb'
                            containerStyle={styles.btnContainer}
                            onPress={()=>setDateObj(new Date())}
                        />
                        
                    </View> */}
                </View>
                
                <Card containerStyle={styles.cardStyle}>
                    <View style={styles.cardContainerAccount}>
                        <Text style={styles.cardAccoutText}> Mi cuenta </Text>
                        {/* <View style={styles.achievement}>
                            <View style = {styles.achievementContainer}>
                                    <Text style={styles.circleViewRZ}>{RZ}</Text>
                                    <Text style={styles.circleViewRR}>{RR}</Text>
                                    <Text style={styles.circleViewRI}>{RI}</Text>
                             
                            </View>
                        </View> */}
                    </View>
                    <Text style={styles.cardUpdateText}> Última actualización: {displayDate}</Text>
                    <Text style={styles.cardLocationText}> Ubicación {loca} </Text>
                    <View style={styles.cardContainerMoney}>
                        <Text style={styles.cardBalanceMoneyText}> Saldo a favor </Text>
                        <Text >
                            <Text style={styles.cardMoneyAmountText1}> $ </Text>
                            <Text style={styles.cardMoneyAmountText2}>{amou}</Text>
                        </Text>
                    </View>
                    
                </Card>

                

                {/* <TouchableOpacity style={styles.customBtn}>
                    <Text style={styles.customBtnTextContent}>Tienes un saldo a favor de </Text>
                    <Text style={styles.customBtnTextContentPrice}>$ {amou}</Text>

                </TouchableOpacity> */}
                    <View>
                    <Text style={styles.texttitleResume}>RESUMEN DE MIS TAREAS</Text>      
                    </View>
                    <View>
                        <CustomListItem 
                            leftIcon={<Icon name='view-list' color='#6B35E2'/>}
                            text={"Disponibles"}
                            counter={avai}
                            onPress={()=> navigation.navigate('listtask',{lati,long,type:1,start:true,assign:true,title:'Tareas Disponibles'})}    
                            bottomDivider
                        />
                        <CustomListItem 
                            leftIcon={<Icon name='view-list' color='#6B35E2'/>}
                            text={"Asignadas"}
                            counter={asgn}
                            onPress={()=> navigation.navigate('listtasktab',{lati,long,type:[2,3],start:[true,true],abort:[false,true],title:'Tareas Asignadas',names:['Pendientes','En progreso']})}
                            bottomDivider
                        />
                        <CustomListItem 
                            leftIcon={<Icon name='view-list' color='#6B35E2'/>}
                            text={"Enviadas"}
                            counter={envi}
                            onPress={()=> navigation.navigate('listtasktab',{lati,long,type:[4,5],title:'Tareas Enviadas',names:['Enviadas','En revisión']})}
                            bottomDivider
                        />
                        <CustomListItem 
                            leftIcon={<Icon name='view-list' color='#6B35E2'/>}
                            text={"Finalizadas"}
                            counter={fini}
                            onPress={()=> navigation.navigate('listtasktab',{lati,long,type:[6,7],title:'Tareas Finalizadas',names:['Finalizadas','Pagadas']})}
                        />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({ 

    fullScreen: {
        // borderWidth: 1,
        height: '100%'
    },
    viewContainerInfo: { 
        // marginRight: 10,
        // marginLeft: 10,
        // paddingTop: 10,
        marginBottom:0 
    },
    userAccountContainer: {
        // borderWidth: 1,
        marginTop:25,
        paddingTop: 10,
        paddingEnd: 10,
        flexDirection: "row",
        alignItems: "center",
        marginEnd: 'auto'
    },
    textUserAccout: {
        fontSize: 20,
        fontWeight: 'bold', 
    },
    // Card
    cardStyle: {
        marginBottom: 20,
        marginTop: 20,
        borderWidth: 0,
        margin: 0,
        borderRadius: 20,
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0, //default is 1
        shadowRadius: 0//default is 1
        
    },
    // card info
    cardContainerAccount: {
        flexDirection: "row",
        marginBottom: 0,
        // borderWidth: 1,
    },
    cardAccoutText: {
        fontSize: 18,
        
        marginEnd: "auto"
    },
    cardUpdateText: {
        fontSize: 12,
        color: "gray",
    },
    cardLocationText: {
        color: "gray",
        fontSize: 12,
    },
    achievementContainer: { 
        // marginBottom:15,
        // flex: .5,
        flexDirection: 'row',
        // justifyContent: 'flex-start', //replace with flex-end or center
    },
    achievement: { 
        // marginBottom:50
    },
    circleViewRZ: { 
        backgroundColor: '#BCA2E1',
        width: 30,
        height: 30,
        borderRadius: 20,
        // justifyContent: 'center',
        marginRight:5,
        marginLeft:5,
        fontWeight: 'bold', 
        fontSize: 20,
        alignItems: 'center',
        textAlign: 'center',
        color:'#fff'
        
    },
    circleViewRR: { 
        backgroundColor: '#8E55DE',
        width: 30,
        height: 30,
        borderRadius: 20,
        // justifyContent: 'center',
        marginRight:5,
        marginLeft:5,
        fontWeight: 'bold', 
        fontSize: 20,
        alignItems: 'center',
        textAlign: 'center',
        color:'#fff'
        
    },
    circleViewRI: { 
        backgroundColor: '#6A17DF',
        width: 30,
        height: 30,
        borderRadius: 20,
        // justifyContent: 'center',
        marginRight:5,
        marginLeft:5,
        fontWeight: 'bold', 
        fontSize: 20,
        alignItems: 'center',
        textAlign: 'center',
        color:'#fff'
    },
        
    // Card Money
    cardContainerMoney: {
        marginTop: 14,
        // borderWidth: 1,

    }, 
    cardBalanceMoneyText: {
        color: "#6B35E2",
        fontSize: 16,
    },
    cardMoneyAmountText1: {
        color: "#6B35E2",
        fontSize: 20
    },
    cardMoneyAmountText2: {
        color: "#6B35E2",
        fontSize: 24,
        fontWeight: "bold"
    },  
    // ----------
  logo:
  { width: '100%',
    height: 150,
    marginTop: 40,
  },
  texttitle:
  { marginTop:50,
    marginBottom:5,
    marginHorizontal:0,
    fontSize: 17,
    textAlign:'justify'
  },
  texttitle2:
  { marginTop:10,
    marginBottom:5,
    marginHorizontal:0,
    fontSize: 17,
    textAlign:'justify'
  },
  
  texttitleSaludo: { 
    marginTop:0,
    fontWeight: 'bold',
    color: '#59575C',
    marginHorizontal:0,
    fontSize: 30,
    textAlign:'justify',
  },
  texttitleNombre:
  { marginBottom:10,
    color:'#59575C',
    marginHorizontal:0,
    fontSize:30,
    textAlign:'justify'
  },
  texttitleResume:
  { marginTop:10,
    marginBottom:20,
    color: '#59575C',
    marginHorizontal:0,
    fontSize: 20,
    textAlign:'justify'
  },
  textRegister:
  { flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerInfo:
  { flex: .5,
    flexDirection:'row',
    justifyContent:'center', //replace with flex-end or center
    alignItems:'center',
    marginRight:100,
  },
 
  
  iconLeft1:
  { color: '#CF0404',
    marginRight: 7,
    marginLeft:65,
  },
  iconLeft2:
  { color: '#27C600',
    marginRight: 7,
    marginLeft:65,
  },
  btnContainer: { 
    // borderWidth: 1,
    marginEnd: 10
  },
  btnMontoIn:
  { width: '100%',
    marginBottom: 10  
  },
  btnMonto:
  { backgroundColor: '#6B35E2',
    marginHorizontal: 10,
    borderRadius:30
  },
  customBtn:
  { backgroundColor: '#fff',
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
    color: '#59575C',
    textAlign: 'center',
  },
  customBtnTextContentPrice: { 
    marginTop:5,
    marginBottom:5,
    fontSize: 15,
    color: '#59575C',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  numberItem:
  { fontWeight: 'bold', 
    left:60,
    fontSize:15,
  },
  menuItem:
  { fontWeight: 'bold',
    textAlign: 'left',
    fontSize:15,
  },
  
  circleText:
  { fontWeight: 'bold', 
    fontSize: 20,
    textAlign: 'center',
    color:'#fff'
  },
  switchText:{
    color: '#000000',
    fontSize: 20
  }
});
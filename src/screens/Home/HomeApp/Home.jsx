import React, { useState } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, View } from 'react-native';
import { Input, Icon, Button, ListItem, Card} from 'react-native-elements';
import Loading from 'components/Loading';
import * as Location from 'expo-location';
import Toast from 'react-native-toast-message';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import { RefreshControl } from 'react-native';
import house from 'api/transacciones/house';
import { formatNumberDots } from 'utils/numeros';
import HelloUser from './HelloUser';
import UserDataCard from './UserDataCard';
import TaskMenuList from './TaskMenuList';
import { getCurrentTime } from 'utils/time';




export default function Home() {
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
    // const [tenp, setTenp] = useState();
    const [work, setWork] = useState();
    const [lati, setLati] = useState();
    const [long, setLong] = useState();
    const [location, setLocation] = React.useState(undefined);
    const [userLocation, setUserLocation] = React.useState("-")

    const [loading, setLoading] = useState(true);
    // const [isEnabled, setIsEnabled] = useState(false);
    const [displayDate, setDisplayDate] = useState('');
    // const [number, setNumber] = useState(0);
    // const RZ = String(rank).charAt(0);
    // const RR = String(rank).charAt(2);
    // const RI = String(rank).charAt(4);
    const getHomeData = React.useCallback(async() => { 

        await house()
        .then((response) => {
            
            if (response.ans.stx === 'ok') {
                setDisplayDate(getCurrentTime())
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
                // if(latitude!=999)
                setLoca(response.ans.loca);
                setLevl(response.ans.levl);
                setNoti(notificaciones);
                setWork(response.ans.work);

            }
            else {
                navigation.reset({ 
                    index: 0,
                    routes: [{ 
                        name: 'login',
                    }],
                });
            }
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
        })
        .finally(() => {
            setLoading(false);
        })

    },[])

    

    const [refreshing, setRefreshing] = React.useState(false)
    const onRefresh = React.useCallback(async() => {
		setRefreshing(true)
		await getHomeData()
		setRefreshing(false)

	},[])

    useFocusEffect(React.useCallback(() => {
        const run = async() => {
            // setDisplayDate(moment(dateObj).format('DD/MM/YY HH:mm'));
			const currentPosition = await Location.getCurrentPositionAsync({});
            setLocation(currentPosition);

			const latitude = currentPosition.coords.latitude.toString();
			const longitude = currentPosition.coords.longitude.toString();
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
    },[]));


    

    React.useEffect(() => {
        const updateLocation = async({latitude, longitude}) => {
            const reverse = await Location.reverseGeocodeAsync({
                latitude,
                longitude,
            })
            setUserLocation(`${reverse[0].street}${' ' +reverse[0].streetNumber || ''}, ${reverse[0].city}`)
        }
        console.log("location > ", location)

        if(location !== undefined) {
            updateLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            });
        }
    },[location])


    if(loading === true) {
        return <Loading isVisible text='Cargando...' />
    } 
    return (
        // <SafeAreaView style={styles.fullScreen}>
            <ScrollView 
                refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} progressViewOffset={20}/> }
                style={styles.screen}    
            >
                <View style={styles.helloUser}>
                    <HelloUser name={name} levl={levl} />
                </View>
                <UserDataCard location={userLocation} date={displayDate} amount={amou} />
                <TaskMenuList available={avai} assigned={asgn} send={envi} finished={fini} lati={lati} long={long} />
                
            </ScrollView>
        // </SafeAreaView>
    );
}
const styles = StyleSheet.create({ 

    screen: {
        height: '100%',
    },
    helloUser: {
        marginTop: 40,
        marginBottom: 10
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
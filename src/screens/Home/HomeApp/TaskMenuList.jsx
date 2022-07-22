import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, Text, StyleSheet} from 'react-native';
import { Icon, ListItem } from 'react-native-elements';

function CustomListItem ({onPress, leftIcon, counter, text, ...props }) {
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

function TaskMenuList ({available, assigned, send, finished, lati, long}) {
    const navigation = useNavigation();
    return (
        <View>
            <Text style={styles.texttitleResume}>RESUMEN DE MIS TAREAS</Text>      

            <CustomListItem 
                leftIcon={<Icon name='view-list' color='#6B35E2'/>}
                text={"Disponibles"}
                counter={available}
                onPress={()=> navigation.navigate('listtask',{lati,long,type:1,start:true,assign:true,title:'Tareas Disponibles'})}    
                bottomDivider
            />
            <CustomListItem 
                leftIcon={<Icon name='view-list' color='#6B35E2'/>}
                text={"Asignadas"}
                counter={assigned}
                onPress={()=> navigation.navigate('listtasktab',{lati,long,type:[2,3],start:[true,true],abort:[false,true],title:'Tareas Asignadas',names:['Pendientes','En progreso']})}
                bottomDivider
            />
            <CustomListItem 
                leftIcon={<Icon name='view-list' color='#6B35E2'/>}
                text={"Enviadas"}
                counter={send}
                onPress={()=> navigation.navigate('listtasktab',{lati,long,type:[4,5],title:'Tareas Enviadas',names:['Enviadas','En revisión']})}
                bottomDivider
            />
            <CustomListItem 
                leftIcon={<Icon name='view-list' color='#6B35E2'/>}
                text={"Finalizadas"}
                counter={finished}
                onPress={()=> navigation.navigate('listtasktab',{lati,long,type:[6,7],title:'Tareas Finalizadas',names:['Finalizadas','Pagadas']})}
            />
        </View>
    )
}

export default TaskMenuList

const styles = StyleSheet.create({ 

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
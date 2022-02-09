import React,{useState,useRef,useEffect} from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { Input,Button, Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Loading from "../Loading";
import { Picker } from "@react-native-picker/picker";
import Toast from 'react-native-toast-message';
import BackEndConnect from "../../utils/BackEndConnect";

export default function PersonalDataForm (props) {
  const {data,lists} = props;
  const navigation = useNavigation();
  const [name, setName] = useState(data.name);
  const [snam, setSnam] = useState(data.snam);
  const [addr, setAddr] = useState(data.addr);
  const [phon, setPhon] = useState(data.phon);
  const [acnu, setAcnu] = useState(data.acnu);
  const [formData, setFormData] = useState({});
  const [nameCorrect, setNameCorrect] = useState(2);
  const [snamCorrect, setSnamCorrect] = useState(2);
  const [ndocCorrect, setNdocCorrect] = useState(2);
  const [addrCorrect, setAddrCorrect] = useState(2);
  const [acnuCorrect, setAcnuCorrect] = useState(2);
  const [loadingText, setLoadingText] = useState("Cargando...");
  const [districtObj, setDistrictObj] = useState({});
  const [districtList, setDistrictList] = useState([]);
  const [regiCod, setRegiCod] = useState(data.regi);
  const [comuCod, setComuCod] = useState(data.comu);
  const [bankCod, setBankCod] = useState(data.bank);
  const [actyCod, setActyCod] = useState(data.acty);
  const [button, setButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [bankList, setBankList] = useState([]);
  const [regionList, setRegionList] = useState([]);
  const [acctypeList, setAcctypeList] = useState([]);
  
  useEffect(()=>
  { console.log("me llamaron");
    getcom(regiCod);
  },[regiCod])

  useEffect(()=>
  { setLists();
  },[lists])

  function formato(obj)
  { return {...obj,uid:data.uid}
  }

  function onEnd(data,key)
  { setFormData({...formData, [key]:data});
    setButton(false);
  }

  function gecomFormat(regi)
  { return{
      reg:regi
    }
  }

  function getcom(cod)
  { setLoadingText("Obteniendo comunas...");
    setLoading2(true);
    BackEndConnect("POST","gecom",gecomFormat(cod)).then((ans)=>
    { setDistrictObj(ans.ans);
      setLoading2(false);
    })
    .catch((ans) => 
    { console.log(ans);
      Toast.show(
        { type: 'error',
          props: 
          { onPress: () => {}, text1: 'Error', text2: "Error conexión. Porfavor intenta más tarde"
          }
        }
      );
      navigation.goBack();
    });
  }

  function onSubmit()
  { setLoadingText('Actualizando datos...');
    setLoading(true);
    BackEndConnect("POST","usact",formato(formData)).then((response)=>
    { if(response.ans.stx=='ok')
      { Toast.show(
        { type: 'success',
          props: {onPress: () => {}, text1: 'Éxito', text2: 'Actualización exitosa'
          }
        });
      }
      else
      { Toast.show(
        { type: 'error',
          props: {onPress: () => {}, text1: 'Error', text2: 'Error de comunicación, intenta más tarde'
          }
        });
      }
      setLoading(false);
      console.log(response);
    })
    .catch((e)=>
    { console.log(e);
      Toast.show(
      { type: 'error',
        props: {onPress: () => {}, text1: 'Error', text2: "Error interno, intenta más tarde"
        }
      });
    })
  }

  function setLists()
  { let bankList = [];
    let regionList = [];
    let acctypeList = [];
    let b=lists.bancos.length;
    let r=lists.regiones.length;
    let a=lists.actypes.length;
    // let c=comunas.com.length
    let num=r;
    if(num<b)
      num=b;
    else if(num<a)
      num=a;
    // else if(num<r)
    //   num=r;
    for(let i=0;i<num;i++)
    { if(lists.regiones[i]!=null)
        regionList.push(
          <Picker.Item label={lists.regiones[i]["name"]} value={lists.regiones[i]["cod"]} key={lists.regiones[i]["cod"]} />
        )
      if(lists.bancos[i]!=null)
        bankList.push(
          <Picker.Item label={lists.bancos[i]["name"]} value={lists.bancos[i]["cod"]} key={lists.bancos[i]["cod"]} />
        )
      if(lists.actypes[i]!=null)
        acctypeList.push(
          <Picker.Item label={lists.actypes[i]["name"]} value={lists.actypes[i]["cod"]} key={lists.actypes[i]["cod"]} />
        )
    setBankList(bankList);
    setRegionList(regionList);
    setAcctypeList(acctypeList);
    }
  }

  function format(rut)
  { if (rut.length>0)
    { rut = clean(rut);
      var result = rut.slice(-4, -1) + '-' + rut.substr(rut.length - 1);
      for (var i = 4; i < rut.length; i += 3) {
        result = rut.slice(-3 - i, -i) + '.' + result
      }
      return result
    }
    else
    { return ""
    }
  }

  function clean(rut)
  { return typeof rut === 'string'
      ? rut.replace(/^0+|[^0-9kK]+/g, '')
      : ''
  }

  const renderDistrictList = () =>
  { let districtList = [];
    for(let i=0;i<parseInt(districtObj.knt);i++)
    { districtList.push(
        <Picker.Item label={districtObj.com[i]["nam"]} value={districtObj.com[i]["cod"]} key={districtObj.com[i]["cod"]} />
      )
    }
    return districtList
  }

  // paragraph.map((ans) =>{console.log(ans.bod)})
  return (
  <>
    { loading ? (<Loading text={loadingText} />):
      ( <ScrollView style={styles.formContainer}>
        <Text style={styles.textDescription}>{" "}Nombres</Text>
        <View style={styles.searchSection}>
          <TextInput
            style={styles.inputForm}
            inputContainerStyle={{borderBottomWidth:0}}
            onChange={(e) => onEnd(e.nativeEvent.text, "name")}
            maxLength={50}
            onChangeText={(e)=>setName(e)}
            value={name}
          />
        </View>
        { nameCorrect == 0 ?
          (<Text style={styles.textDescriptionError}>{" "}Su nombre debe ser menor a 50 caracteres.</Text>):
          (<></>)
        }
        <Text style={styles.textDescription}>{" "}Apellidos</Text>
        <View style={styles.searchSection}>
          <TextInput
            style={styles.inputForm}
            inputContainerStyle={{borderBottomWidth:0}}
            onChange={(e) => onEnd(e.nativeEvent.text, "snam")}
            maxLength={50}
            onChangeText={(e)=>setSnam(e)}
            value={snam}
          />
        </View>
        { snamCorrect == 0 ?
          (<Text style={styles.textDescriptionError}>{" "}Su apellido debe ser menor a 50 caracteres.</Text>):
          (<></>)
        }
        <Text style={styles.textDescription}>{" "}Rut</Text>
        <View style={styles.searchSection}>
          <TextInput
            placeholder={format(data.rut)}
            placeholderTextColor="#bca2fd"
            style={styles.inputForm}
            inputContainerStyle={{borderBottomWidth:0}}
            // onEndEditing={(e) => onEnd(e, "name")}
            maxLength={50}
            editable={false}
          />
        </View>
        <Text style={styles.textDescription}>{" "}Número de documento</Text>
        <View style={styles.searchSection}>
          <TextInput
            placeholder={data.ndoc}
            placeholderTextColor="#bca2fd"
            keyboardType="numeric"
            style={styles.inputForm}
            onEndEditing={(e) => onEnd(e, "ndoc")}
            editable={false}
            maxLength={20}
            />
        </View>
        { ndocCorrect == 0 ?
          (<Text style={styles.textDescriptionError}>{" "}El número de documento debe ser menor a 20.</Text>):
          (<></>)
        }
        <Text style={styles.textDescription}>{" "}Correo</Text>
        <View style={styles.searchSection}>
          <TextInput
            placeholder={data.mail}
            placeholderTextColor="#bca2fd"
            style={styles.inputForm}
            inputContainerStyle={{borderBottomWidth:0}}
            // onEndEditing={(e) => onEnd(e, "name")}
            maxLength={50}
            editable={false}
          />
        </View>
        <Text style={styles.textDescription}>{" "}Número telefónico</Text>
        <View style={styles.searchSection}>
          <TextInput
            style={styles.inputForm}
            inputContainerStyle={{borderBottomWidth:0}}
            onChange={(e) => onEnd(e.nativeEvent.text, "phon")}
            maxLength={50}
            onChangeText={(e)=>setPhon(e)}
            value={phon}
          />
        </View>
        <Text style={styles.textDescription}>{" "}Región</Text>
        <View style={styles.card}>
          <Picker
            selectedValue={regiCod}
            style={styles.inputForm}
            onValueChange={(itemValue) => setRegiCod(itemValue)}
          >
            {regionList}
          </Picker>
        </View>
        <Text style={styles.textDescription}>{" "}Comuna</Text>
        { loading2 ? 
          (<View style={styles.loaderTask}>
            <ActivityIndicator  size="large" color="#0000ff"/>
            <Text>Cargando comunas...</Text>
          </View>):
          ( <View style={styles.card}>
              <Picker
                selectedValue={comuCod}
                style={styles.inputForm}
                onValueChange={(itemValue) => { onEnd(itemValue,"comu")
                                                setComuCod(itemValue)}}
              >
                {renderDistrictList()}
              </Picker>
            </View>
          )
        }
        <Text style={styles.textDescription}>{" "}Dirección</Text>
        <View style={styles.searchSection}>
          <TextInput
            style={styles.inputForm}
            inputContainerStyle={{borderBottomWidth:0}}
            onChange={(e) => onEnd(e.nativeEvent.text, "addr")}
            maxLength={128}
            onChangeText={(e)=>setAddr(e)}
            value={addr}
          />
        </View>
        { addrCorrect == 0 ?
          (<Text style={styles.textDescriptionError}>{" "}Su dirección debe ser menor a 128 caracteres.</Text>):
          (<></>)
        }
        <Text style={styles.textDescription}>{" "}Banco</Text>
        <View style={styles.card}>
          <Picker
            selectedValue={bankCod}
            style={styles.inputForm}  
            onValueChange={(itemValue) => {onEnd(itemValue,"bank")
                                           setBankCod(itemValue)}}
            > 
            {bankList}
          </Picker>
        </View>
        <Text style={styles.textDescription}>{" "}Tipo de cuenta</Text>
        <View style={styles.card}>
          <Picker
            selectedValue={actyCod}
            style={styles.inputForm}  
            onValueChange={(itemValue) => {onEnd(itemValue,"acty")
                                           setActyCod(itemValue)}}
            >
            {acctypeList}
          </Picker>
        </View>
        <Text style={styles.textDescription}>{" "}Número de cuenta</Text>
        <View style={styles.searchSection}>
          <TextInput
            style={styles.inputForm}
            inputContainerStyle={{borderBottomWidth:0}}
            onChange={(e) => onEnd(e.nativeEvent.text, "acnu")}
            keyboardType="numeric"
            onChangeText={(e)=>setAcnu(e)}
            value={acnu}
          />
        </View>
        { acnuCorrect == 0 ?
          (<Text style={styles.textDescriptionError}>{" "}Su número de cuenta debe ser menor a 9 caracteres.</Text>):
          (<></>)
        }
        <Button
          title="Enviar"
          containerStyle={styles.btnContainerRegister}
          buttonStyle={styles.btnRegister}
          onPress={onSubmit}
          disabled={button}
        />
      </ScrollView>
      )
    }
  </>
  )
}


const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    marginTop: 15,
  },
  inputForm: {
    flex: 1,
    paddingTop: 12,
    paddingRight: 10,
    paddingBottom: 12,
    paddingLeft: 15,
    width: "100%",   
    backgroundColor: '#fff',
    borderRadius: 20,
    fontSize:16
  },
  searchSection: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card:{
    backgroundColor: "#fff",
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputForm2:{
    height: 40,
    margin: 12,
    backgroundColor: '#fff',
    borderRadius:20
  },
  btnContainerRegister: {
    marginTop: 30,
    width: "100%",
    marginBottom: 30
  },
  picker:{
    width:"100%",
    marginTop:3,
    backgroundColor:'#fff',
    borderRadius:20,
    alignItems:"center",
    justifyContent:"center",
  },
  btnRegister: {
    backgroundColor:"#6B35E2",
  },
  iconRight: {
    color:"#AC9DC9",
  },
  textDescription: {
    fontWeight:"bold",
    fontSize:15,
    marginTop:10,
    justifyContent:"flex-start",
    color:"#5300eb"
  },
  textDescription2:{
    fontWeight:"normal",
    fontSize:10,
    justifyContent:"flex-start",
  },
  textDescriptionError:{
    fontWeight:"normal",
    fontSize:15,
    justifyContent:"flex-start",
    color:"#ff0000"
  },
  divider:{
    backgroundColor: "#6B35E2",
    margin: 10,
  },
});
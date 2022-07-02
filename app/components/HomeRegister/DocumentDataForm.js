import React, { useState, useEffect,useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { Input, Icon, Button, Divider} from 'react-native-elements';
import Loading from '../Loading';
import {validateEmail} from '../../utils/validations';
import { size,isEmpty,map,isInteger } from 'lodash';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';
import BackEndConnect from '../../utils/connection/backendHandler';;

export default function DocumentDataForm(props) {
  const { lists } = props;
  const [formData, setFormData] = useState(defaultFormValue());
  const [nameCorrect, setNameCorrect] = useState(2);
  const [snamCorrect, setSnamCorrect] = useState(2);
  const [ndocCorrect, setNdocCorrect] = useState(2);
  const [addrCorrect, setAddrCorrect] = useState(2);
  const [acnuCorrect, setAcnuCorrect] = useState(2);
  const [changedNdoc, setChangedNdoc] = useState('');
  const [loadingText, setLoadingText] = useState('Cargando...');
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [selectValueRegion, setSelectValueRegion] = useState('Region');
  const [selectValueComuna, setSelectValueComuna] = useState('Comuna');
  const [selectValueBanks, setSelectValueBanks] = useState('Banco');
  // const [selectValueCountry, setSelectValueCountry] = useState('País');
  const [regiCod, setRegiCod] = useState(null);
  const [districtObj, setDistrictObj] = useState(null);
  const [selectValueAccountType, setSelectValueAccountType] = useState('Tipo de cuenta');
  const navigation = useNavigation();
  const [bankList, setBankList] = useState([]);
  const [regionList, setRegionList] = useState([]);
  const [acctypeList, setAcctypeList] = useState([]);
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();
  const ref_input6 = useRef();
  const ref_input7 = useRef();
  const ref_input8 = useRef();
  const ref_input9 = useRef();

  useEffect(()=>
  { if (regiCod!=null)
      getcom(regiCod);
  },[regiCod])

  useEffect(()=>
  { setLists();
  },[lists])

  function setLists()
  { let bankList = [];
    let regionList = [];
    let acctypeList = [];
    let num;
    let b=lists.bancos.length;
    let r=lists.regiones.length;
    let a=lists.actypes.length;
    num=r;
    if(num<b)
      num=b;
    if(num<a)
      num=a;
    for(let i=0;i<num;i++)
    { if(lists.regiones[i]!=null)
        regionList.push(
          <Picker.Item label={lists.regiones[i]['name']} value={lists.regiones[i]['cod']} key={lists.regiones[i]['cod']} />
        )
      if(lists.bancos[i]!=null)
        bankList.push(
          <Picker.Item label={lists.bancos[i]['name']} value={lists.bancos[i]['cod']} key={lists.bancos[i]['cod']} />
        )
      if(lists.actypes[i]!=null)
        acctypeList.push(
          <Picker.Item label={lists.actypes[i]['name']} value={lists.actypes[i]['cod']} key={lists.actypes[i]['cod']} />
        )
    }
    setBankList(bankList);
    setRegionList(regionList);
    setAcctypeList(acctypeList);
  }

  function defaultFormValue()
  { return{
      name: '',
      snam: '',
      ndoc: '',
      addr: '',
      comu: '',
      pais : '',
      bank : '',
      acty : '',
      acnu : ''
    };
  }

  function format(ndoc)
  { if (ndoc.length>0)
    { ndoc = clean(ndoc);
      let result = null;
      if (ndoc[0]!='a' && ndoc[0]!='A' && ndoc.length>3)
      { result = ndoc.slice(-3);
        console.log(result);
        for (let i=3; i<ndoc.length; i+=3)
          result = ndoc.slice(-3-i,-i) + '.' + result;
      }
      else
        result = ndoc;
      setChangedNdoc(result);
    }
    else
      setChangedNdoc('');
  }

  function clean(ndoc)
  { return ndoc.replace(/^0+|[^0-9aA]+/g, '')
  }
  
  function regi2Format(object)
  { return{
      name : object.name,
      snam : object.snam,
      ndoc : object.ndoc,
      addr : object.addr,
      comu : object.comu,
      pais : 56,
      usr  : 'null',
      bank : object.bank,
      acty : object.acty,
      acnu : object.acnu
    };
  }

  function gecomFormat(regi)
  { return{
      reg:regi
    }
  }

  function getcom(cod)
  { setLoadingText('Obteniendo comunas...');
    setLoading2(true);
    BackEndConnect('POST','gecom',gecomFormat(cod)).then((ans)=>
    { setDistrictObj(ans.ans);
      setLoading2(false);
    })
    .catch((ans) => 
    { Toast.show(
      { type: 'error',
        props: 
        { onPress: () => {}, text1: 'Error', text2: 'Error conexión. Porfavor intenta más tarde'
        }
      });
      setLoading2(false);
      navigation.goBack();
    });
  }

  const onSubmit = () => 
  { setLoadingText('Enviando datos');
    setLoading(true);
    if ( isEmpty(formData.name) || isEmpty(formData.snam) || isEmpty(formData.ndoc) ||
         isEmpty(formData.addr) || !isInteger(formData.comu) || !isInteger(formData.bank) ||
         !isInteger(formData.acty) || isEmpty(formData.acnu))
    { Toast.show(
      { type: 'error',
        props: {onPress: () => {}, text1: 'Error', text2: 'Hay campos vacíos.'
        }
      })
      setLoading(false);
    }
    else if (!nameCorrect || !snamCorrect || !ndocCorrect ||
             !addrCorrect || !acnuCorrect)
    { Toast.show(
      { type: 'error',
        props: {onPress: () => {}, text1: 'Error', text2: 'Revisa los campos erroneos.'
        }
      })
      setLoading(false);
    }
    else
    { BackEndConnect('POST','regi2',regi2Format(formData)
      ).then((ans) =>
        { if (ans.ans.stx != 'ok')
          { Toast.show(
            { type: 'error',
              props: {onPress: () => {}, text1: 'Error', text2: ans.ans.msg
              }
            });
          }
          else
          { navigation.replace('documentimage',{mode:1});
          }
          setLoading(false);
        }
      ).catch((ans)=>
        { setLoading(false);
          console.log(ans);
        }
      );
    }
  };

  function onChange(e, type)
  { setFormData({ ...formData, [type]: e });
    if(type=='region')
    { if(e!=='0')
        setRegiCod(e);
      // else
      //   setDistrictList([]);
    }
  }

  function onEnd(e,type)
  { if(type=='ndoc')
    { if(e.nativeEvent.text.length<=20)
      { setNdocCorrect(1);
      }
      else if(e.nativeEvent.text.length==0)
      { setNdocCorrect(2); 
      }
      else
      { setNdocCorrect(0);
      }
    }
    else if(type=='name')
    { if(e.nativeEvent.text.length<=50)
      { setNameCorrect(1);
      }
      else if(e.nativeEvent.text.length==0)
      { setNameCorrect(2); 
      }
      else
      { setNameCorrect(0);
      }
    }
    else if(type=='snam')
    { if(e.nativeEvent.text.length<=50)
      { setSnamCorrect(1);
      }
      else if(e.nativeEvent.text.length==0)
      { setSnamCorrect(2); 
      }
      else
      { setSnamCorrect(0);
      }
    }
    else if(type=='addr')
    { if(e.nativeEvent.text.length<=128)
      { setAddrCorrect(1);
      }
      else if(e.nativeEvent.text.length==0)
      { setAddrCorrect(2); 
      }
      else
      { setAddrCorrect(0);
      }
    }
    else if(type=='acnu')
    { if(e.nativeEvent.text.length<=20)
      { setAcnuCorrect(1);
      }
      else if(e.nativeEvent.text.length==0)
      { setAcnuCorrect(2); 
      }
      else
      { setAcnuCorrect(0);
      }
    }
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  }

  const renderDistrictList = () =>
  { let districtList = [];
    if(districtObj!=null)
    { for(let i=0;i<parseInt(districtObj.knt);i++)
      { districtList.push(
          <Picker.Item label={districtObj.com[i]['nam']} value={districtObj.com[i]['cod']} key={districtObj.com[i]['cod']} />
        )
      }
    }
    return districtList
  }

  return(
  <>
    { loading ? (<Loading text={loadingText} />):
      (<ScrollView style={styles.formContainer}>
        <Text style={styles.textDescription}>{' '}Nombres</Text>
        <View style={styles.searchSection}>
          <TextInput
            placeholder='John'
            placeholderTextColor='#AC9DC9'
            style={styles.inputForm}
            inputContainerStyle={{borderBottomWidth:0}}
            onEndEditing={(e) => onEnd(e, 'name')}
            maxLength={50}
            returnKeyType='next'
            onSubmitEditing={() => { ref_input2.current.focus()}}
            blurOnSubmit={false}
          />
        </View>
        { nameCorrect == 0 ?
          (<Text style={styles.textDescriptionError}>{' '}Su nombre debe ser menor a 50 caracteres.</Text>):
          (<></>)
        }
        <Text style={styles.textDescription}>{' '}Apellidos</Text>
        <View style={styles.searchSection}>
          <TextInput
            placeholder='Doe'
            placeholderTextColor='#AC9DC9'
            style={styles.inputForm}
            inputContainerStyle={{borderBottomWidth:0}}
            errorStyle={styles.errorStyle}
            onEndEditing={(e) => onEnd(e, 'snam')}
            maxLength={50}
            returnKeyType='next'
            onSubmitEditing={() => { ref_input3.current.focus()}}
            blurOnSubmit={false}
            ref={ref_input2}
          />
        </View>
        { snamCorrect == 0 ?
          (<Text style={styles.textDescriptionError}>{' '}Su apellido debe ser menor a 50 caracteres.</Text>):
          (<></>)
        }
        <Text style={styles.textDescription}>{' '}Número de documento</Text>
        <View style={styles.searchSection}>
          <TextInput
            placeholder='123.456.789'
            placeholderTextColor='#AC9DC9'
            onChangeText={(e) => format(e)}
            style={styles.inputForm}
            onEndEditing={(e) => onEnd(e, 'ndoc')}
            maxLength={11}
            value={changedNdoc}
            secureTextEntry={Platform.OS === 'ios' ? false : true}
            keyboardType={Platform.OS === 'ios' ? null : 'visible-password'}
            autoCapitalize="none"
            ref={ref_input3}
            />
        </View>
        { ndocCorrect == 0 ?
          (<Text style={styles.textDescriptionError}>{' '}El número de documento debe ser menor a 20.</Text>):
          (<></>)
        }
        <Text style={styles.textDescription}>{' '}Región</Text>
        <View style={styles.card}>
          <Picker
            selectedValue={selectValueRegion}
            style={styles.inputForm}  
            onValueChange={(itemValue,itemIndex) => {setSelectValueRegion(itemValue);onChange(itemValue, 'region') }}
          >
            <Picker.Item label='Seleccionar región' value='0'/>
            {regionList}
          </Picker>
        </View>
        <Text style={styles.textDescription}>{' '}Comuna</Text>
        { loading2 ? 
          (<View style={styles.loaderTask}>
            <ActivityIndicator  size="large" color="#0000ff"/>
            <Text>Cargando comunas...</Text>
          </View>):
          (<View style={styles.card}>
            <Picker
              selectedValue={selectValueComuna}
              style={styles.inputForm}
              onValueChange={(itemValue,itemIndex) => {setSelectValueComuna(itemValue);onChange(itemValue, 'comu') }}
              enabled={districtObj!=null? (true):(false)}
            >
              <Picker.Item label='Seleccionar Comuna'  value='x' />
              {renderDistrictList()}
            </Picker>
          </View>
          )
        }
        <Text style={styles.textDescription}>{' '}Dirección</Text>
        <View style={styles.searchSection}>
          <TextInput
            placeholder='Moneda 1202'
            placeholderTextColor='#AC9DC9'
            style={styles.inputForm}
            inputContainerStyle={{borderBottomWidth:0}}
            errorStyle={styles.errorStyle}
            onEndEditing={(e) => onEnd(e, 'addr')}
            maxLength={128}
          />
        </View>
        { addrCorrect == 0 ?
          (<Text style={styles.textDescriptionError}>{' '}Su dirección debe ser menor a 128 caracteres.</Text>):
          (<></>)
        }
        <Text style={styles.textDescription}>{' '}Banco</Text>
        <View style={styles.card}>
          <Picker
            selectedValue={selectValueBanks}
            style={styles.inputForm}  
            onValueChange={(itemValue,itemIndex) => {setSelectValueBanks(itemValue);onChange(itemValue, 'bank') }}
            > 
            <Picker.Item label='Seleccionar banco' value='x'/>
            {bankList}
          </Picker>
        </View>
        <Text style={styles.textDescription}>{' '}Tipo de cuenta</Text>
        <View style={styles.card}>
          <Picker
            selectedValue={selectValueAccountType}
            style={styles.inputForm}  
            onValueChange={(itemValue,itemIndex) => {setSelectValueAccountType(itemValue);onChange(itemValue, 'acty') }}
            // onValueChange={(itemValue,itemIndex) => onChangee(itemValue, 'acty')}
            >
            <Picker.Item label='Seleccionar tipo de cuenta' value='x'/>
            {acctypeList}
          </Picker>
        </View>
        <Text style={styles.textDescription}>{' '}Número de cuenta</Text>
        <View style={styles.searchSection}>
          <TextInput
            placeholder='1-234-56-78910-2'
            placeholderTextColor='#AC9DC9'
            style={styles.inputForm}
            inputContainerStyle={{borderBottomWidth:0}}
            errorStyle={styles.errorStyle}
            onEndEditing={(e) => onEnd(e, 'acnu')}
            keyboardType='numeric'
          />
        </View>
        { acnuCorrect == 0 ?
          (<Text style={styles.textDescriptionError}>{' '}Su número de cuenta debe ser menor a 9 caracteres.</Text>):
          (<></>)
        }
        <Button
          title='Enviar'
          containerStyle={styles.btnContainerRegister}
          buttonStyle={styles.btnRegister}
          onPress={onSubmit}
        />
      </ScrollView>)
    }
  </>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    marginTop: 15,
  },
  loaderTask:
  { marginTop:10,
    marginBottom: 10,
    alignItems: "center",
  },
  inputForm: {
    flex: 1,
    paddingTop: 12,
    paddingRight: 10,
    paddingBottom: 12,
    paddingLeft: 15,
    width: '100%',   
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
    backgroundColor: '#fff',
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
    width: '100%',
    marginBottom: 30
  },
  picker:{
    width:'100%',
    marginTop:3,
    backgroundColor:'#fff',
    borderRadius:20,
    alignItems:'center',
    justifyContent:'center',
  },
  btnRegister: {
    backgroundColor:'#6B35E2',
  },
  iconRight: {
    color:'#AC9DC9',
  },
  textDescription: {
    fontWeight:'bold',
    fontSize:15,
    marginTop:10,
    justifyContent:'flex-start',
    color:'#5300eb'
  },
  textDescription2:{
    fontWeight:'normal',
    fontSize:10,
    justifyContent:'flex-start',
  },
  textDescriptionError:{
    fontWeight:'normal',
    fontSize:15,
    justifyContent:'flex-start',
    color:'#ff0000'
  },
  divider:{
    backgroundColor: '#6B35E2',
    margin: 10,
  },
});
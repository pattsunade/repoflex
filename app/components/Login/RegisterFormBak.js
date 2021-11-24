import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, TextInput } from "react-native";
import { Input, Icon, Button, Divider} from "react-native-elements";
import Loading from "../Loading";
import {validateEmail} from "../../utils/validations";
import { size,isEmpty,map,isInteger } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import Toast from 'react-native-toast-message';
import BackEndConnect from "../../utils/BackEndConnect";

export default function RegisterForm(props) {
  const { toastRef, cities, banks, countrys, accountType} = props;
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [formData, setFormData] = useState(defaultFormValue());
  const [rutCorrect, setRutCorrect] = useState(2);
  const [changedRut, setChangedRut] = useState("");
  const [ndocCorrect, setNdocCorrect] = useState(2);
  const [nameCorrect, setNameCorrect] = useState(2);
  const [snamCorrect, setSnamCorrect] = useState(2);
  const [usrCorrect, setUsrCorrect] = useState(3);
  const [passCorrect, setPassCorrect] = useState(2);
  const [repeatPassCorrect, setRepeatPassCorrect] = useState(2);
  const [addrCorrect, setAddrCorrect] = useState(2);
  const [acnuCorrect, setAcnuCorrect] = useState(2);
  const [loading, setLoading] = useState(false);
  const [selectValueComuna, setSelectValueComuna] = useState("Comuna");
  const [selectValueBanks, setSelectValueBanks] = useState("Banco");
  const [selectValueCountry, setSelectValueCountry] = useState("País");
  const [selectValueAccountType, setSelectValueAccountType] = useState("Tipo de cuenta");
  const navigation = useNavigation();
  var city = [];
  for(let i = 0; i < cities.length; i++)
  { city.push(
      <Picker.Item label={cities[i][0]} value={cities[i][1]} key={cities[i][0]} />
    )
  }
  var bank = [];
  for(let i = 0; i < banks.length; i++)
  { bank.push(
      <Picker.Item label={banks[i][0]} value={banks[i][1]} key={banks[i][0]}/>
    )
  }
  var country = [];
  for(let i = 0; i < countrys.length; i++)
  { country.push(
      <Picker.Item label={countrys[i][0]} value={countrys[i][1]} key={countrys[i][0]}/>
    )
  }
  var accountT = [];
  for(let i = 0; i < accountType.length; i++)
  { accountT.push(
      <Picker.Item label={accountType[i][0]} value={accountType[i][1]} key={accountType[i][0]}/>
    )
  }
  const onSubmit = () => 
  { setLoading(true);
    formData.usr = formData.usr.replace(/\s/g,'').toLowerCase();
    if (isEmpty(formData.rut) || isEmpty(formData.ndoc) || isEmpty(formData.name)
        || isEmpty(formData.snam) || isEmpty(formData.usr) || isEmpty(formData.psw)
        || isEmpty(formData.repeatPassword) || isEmpty(formData.addr) || !isInteger(formData.comu)
        || !isInteger(formData.pais) || !isInteger(formData.bank) || !isInteger(formData.acty)
        || isEmpty(formData.acnu))
    { Toast.show(
      { type: 'error',
        props: {onPress: () => {}, text1: 'Error', text2: 'Hay campos vacíos.'
        }
      })
      setLoading(false);
    }
    else if (!rutCorrect || !ndocCorrect || !nameCorrect || !snamCorrect || !usrCorrect
      || !repeatPassCorrect || !addrCorrect || !acnuCorrect || usrCorrect == 2 || passCorrect == 1)
    { Toast.show(
      { type: 'error',
        props: {onPress: () => {}, text1: 'Error', text2: 'Revisa los campos erroneos.'
        }
      })
      setLoading(false);
    }
    else
    { BackEndConnect("POST","reg01",formato(formData)
      ).then((ans) =>
        { if (ans.ans.stx != "ok")
          { Toast.show(
            { type: 'error',
              props: {onPress: () => {}, text1: 'Error', text2: ans.ans.msg
              }
            });
          }
          else
          { navigation.navigate("emailverificationA",{
              correo:formData.usr,
              psw:formData.psw
            });
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
  const chkPass = (e,type) =>
  { if(formData.psw==e.nativeEvent.text)
    { setFormData({ ...formData, [type]: e.nativeEvent.text });
      setRepeatPassCorrect(1);
    }
    else
    { setRepeatPassCorrect(0);
    }
  };
  const onChangee = (e, type) =>
  { setFormData({ ...formData, [type]: e });
  };

  function onEnd(e,type)
  { if(type == 'rut')
    { const rut = clean(e.nativeEvent.text);
      const rutLen = rut.length;
      if(rutLen==0)
      { setRutCorrect(2);
      }
      else if(rutLen<7)
      { setRutCorrect(3)
      }
      else
      { var sum = 0;
        var mult = 2;
        for(let i=rutLen-2;i>=0;i--)
        { if (mult > 7){
            mult = 2;
          }
          sum += parseInt(rut[i]*mult);
          mult++;
        }
        var res = 11-sum%11;
        if (res == 11)
        { res = 0;
        }
        if (rut[rutLen-1] == "k")
        { if (res!=10)
          { setRutCorrect(0);
          }
          else
          { setRutCorrect(1);
          }
        }
        else if (res != parseInt(rut[rutLen-1]))
        { setRutCorrect(0);
        }
        else
        { setRutCorrect(1);
        }
      }
    }
    else
    { if(type=='psw')
      { if(e.nativeEvent.text.length<6 || e.nativeEvent.text.length>15)
        { setPassCorrect(1);
        }
        else if(e.nativeEvent.text.length==0)
        { setPassCorrect(2);
        }
        else
        { setPassCorrect(0);
        }
      }
      else if(type=='ndoc')
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
      else if(type=='usr')
      { if(!validateEmail(e.nativeEvent.text.replace(/\s/g,'').toLowerCase()))
        { setUsrCorrect(2);
        }
        else if(e.nativeEvent.text.length==0)
        { setUsrCorrect(3); 
        }
        else if(e.nativeEvent.text.length<=32)
        { setUsrCorrect(1);
        }
        else
        { setUsrCorrect(0);
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
    }
    console.log(rutCorrect);
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  }

  function format (rut)
  { console.log(rut.length);
    if (rut.length>0)
    { rut = clean(rut);
      var result = rut.slice(-4, -1) + '-' + rut.substr(rut.length - 1);
      for (var i = 4; i < rut.length; i += 3) {
        result = rut.slice(-3 - i, -i) + '.' + result
      }
      setChangedRut(result);
    }
    else
    { setChangedRut("");
    }
  }

  function clean (rut) {
    return typeof rut === 'string'
      ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase()
      : ''
  }
  return(
    <ScrollView style={styles.formContainer}>
      <Text style={styles.textDescription}>{" "}Rut</Text>
      <View style={styles.searchSection}>
        <TextInput
          placeholder="11.111.111-1"
          placeholderTextColor="#AC9DC9"
          style={styles.inputForm}
          onEndEditing={(e) => onEnd(e,"rut")}
          maxLength={12}
          onChangeText={(e) => format(e)}
          value={changedRut}
        />
        <Icon
          name="fingerprint"
          iconStyle={styles.iconRight}
        />
      </View>
      { rutCorrect == 0 ?
        (<Text style={styles.textDescriptionError}>{" "}El rut ingresado es incorrecto.</Text>):
        rutCorrect == 3 ?
        (<Text style={styles.textDescriptionError}>{" "}Debes ingresar mínimo 7 dígitos.</Text>):
        (<></>)
      }
      <Text style={styles.textDescription}>{" "}Número de documento</Text>
      <View style={styles.searchSection}>
        <TextInput
          placeholder="123.456.789"
          placeholderTextColor="#AC9DC9"
          keyboardType="numeric"
          style={styles.inputForm}
          onEndEditing={(e) => onEnd(e, "ndoc")}
          maxLength={20}
          />
         <Icon
            name="badge"
            iconStyle={styles.iconRight}
          />
      </View>
      { ndocCorrect == 0 ?
        (<Text style={styles.textDescriptionError}>{" "}El número de documento debe ser menor a 20.</Text>):
        (<></>)
      }
      <Text style={styles.textDescription}>{" "}Nombres</Text>
      <View style={styles.searchSection}>
        <TextInput
          placeholder="John"
          placeholderTextColor="#AC9DC9"
          style={styles.inputForm}
          inputContainerStyle={{borderBottomWidth:0}}
          onEndEditing={(e) => onEnd(e, "name")}
          maxLength={50}
        />
        <Icon
          name="border-color"
          iconStyle={styles.iconRight}
        />
      </View>
      { nameCorrect == 0 ?
        (<Text style={styles.textDescriptionError}>{" "}Su nombre debe ser menor a 50 caracteres.</Text>):
        (<></>)
      }
      <Text style={styles.textDescription}>{" "}Apellidos</Text>
      <View style={styles.searchSection}>
        <TextInput
          placeholder="Doe"
          placeholderTextColor="#AC9DC9"
          style={styles.inputForm}
          inputContainerStyle={{borderBottomWidth:0}}
          errorStyle={styles.errorStyle}
          onEndEditing={(e) => onEnd(e, "snam")}
          maxLength={50}
        />
        <Icon
            name="rate-review"
            iconStyle={styles.iconRight}
          />
      </View>
      { snamCorrect == 0 ?
        (<Text style={styles.textDescriptionError}>{" "}Su apellido debe ser menor a 50 caracteres.</Text>):
        (<></>)
      }
      <Text style={styles.textDescription}>{" "}Correo</Text>
      <View style={styles.searchSection}>
        <TextInput
          placeholder="correo@dominio.com"
          placeholderTextColor="#AC9DC9"
          style={styles.inputForm}
          inputContainerStyle={{borderBottomWidth:0}}
          errorStyle={styles.errorStyle}
          onEndEditing={(e) => onEnd(e, "usr")}
          maxLength={32}
        />
        <Icon
          type="material-community"
          name="at"
          iconStyle={styles.iconRight}
        />
      </View>
      { usrCorrect == 0 ?
        (<Text style={styles.textDescriptionError}>{" "}El correo debe ser menor a 30 caracteres.</Text>):
        usrCorrect == 2 ?
        (<Text style={styles.textDescriptionError}>{" "}El correo no tiene el formato correcto.</Text>):
        (<></>)
      }
      <Text style={styles.textDescription}>{" "}Contraseña</Text>
      <View style={styles.searchSection}>
        <TextInput
          placeholder="********"
          placeholderTextColor="#AC9DC9"
          style={styles.inputForm}
          inputContainerStyle={{borderBottomWidth:0}}
          errorStyle={styles.errorStyle}
          password={true}
          secureTextEntry={showPassword ? false : true}
          onEndEditing={(e) => onEnd(e, "psw")}
          maxLength={15}
        />
        <Icon
          type="material-community"
          name={showPassword ? "eye-outline" : "eye-off-outline"}
          iconStyle={styles.iconRight}
          onPress={() => setShowPassword(!showPassword)}
        />
      </View>
      { passCorrect == 1 ?
        (<Text style={styles.textDescriptionError}>{" "}Su contraseña debe ser mayor a 5 y menor a 16 caracteres.</Text>):
        (<></>)
      }
      <Text style={styles.textDescription}>{" "}Repetir Contraseña</Text>
      <View style={styles.searchSection}>
        <TextInput
          placeholder="********"
          placeholderTextColor="#AC9DC9"
          style={styles.inputForm}
          inputContainerStyle={{borderBottomWidth:0}}
          errorStyle={styles.errorStyle}
          password={true}
          secureTextEntry={showRepeatPassword ? false : true}
          onEndEditing={(e) => chkPass(e,"repeatPassword")}
          maxLength={32}
        />
        <Icon
          type="material-community"
          name={showRepeatPassword ? "eye-outline" : "eye-off-outline"}
          iconStyle={styles.iconRight}
          onPress={() => setShowRepeatPassword(!showRepeatPassword)}
        />
      </View>
      { repeatPassCorrect == 0 ?
        (<Text style={styles.textDescriptionError}>{" "}Las contraseñas no coinciden</Text>):
        (<></>)
      }
      <Text style={styles.textDescription}>{" "}País</Text>
      <View style={styles.card}>
        <Picker
          selectedValue={selectValueCountry}
          style={styles.inputForm}  
          onValueChange={(itemValue,itemIndex) => {setSelectValueCountry(itemValue);onChangee(itemValue, "pais") }}
        >
          <Picker.Item label="Seleccionar país" value="x" color="#AC9DC9"/>
          {country}
        </Picker>
      </View>
      <Text style={styles.textDescription}>{" "}Comuna</Text>
      <View style={styles.card}>
        <Picker
          selectedValue={selectValueComuna}
          style={styles.inputForm}
          onValueChange={(itemValue,itemIndex) => {setSelectValueComuna(itemValue);onChangee(itemValue, "comu") }}
        >
          <Picker.Item label="Seleccionar Comuna" color="#AC9DC9"  value="x" />
            {city}
        </Picker>
      </View>
      <Text style={styles.textDescription}>{" "}Dirección</Text>
      <View style={styles.searchSection}>
        <TextInput
          placeholder="Moneda 1202"
          placeholderTextColor="#AC9DC9"
          style={styles.inputForm}
          inputContainerStyle={{borderBottomWidth:0}}
          errorStyle={styles.errorStyle}
          onEndEditing={(e) => onEnd(e, "addr")}
          maxLength={128}
        />
        <Icon
          name="home"
          iconStyle={styles.iconRight}
        />
      </View>
      { addrCorrect == 0 ?
        (<Text style={styles.textDescriptionError}>{" "}Su dirección debe ser menor a 128 caracteres.</Text>):
        (<></>)
      }
      <Text style={styles.textDescription}>{" "}Banco</Text>
      <View style={styles.card}>
        <Picker
          selectedValue={selectValueBanks}
          style={styles.inputForm}  
          onValueChange={(itemValue,itemIndex) => {setSelectValueBanks(itemValue);onChangee(itemValue, "bank") }}
          > 
          <Picker.Item label="Seleccionar banco" value="x" color="#AC9DC9"/>
          {bank}
        </Picker>
      </View>
      <Text style={styles.textDescription}>{" "}Tipo de cuenta</Text>
      <View style={styles.card}>
        <Picker
          selectedValue={selectValueAccountType}
          style={styles.inputForm}  
          onValueChange={(itemValue,itemIndex) => {setSelectValueAccountType(itemValue);onChangee(itemValue, "acty") }}
          // onValueChange={(itemValue,itemIndex) => onChangee(itemValue, "acty")}
          >
          <Picker.Item label="Seleccionar tipo de cuenta" value="x" color="#AC9DC9"/>
          {accountT}
        </Picker>
      </View>
      <Text style={styles.textDescription}>{" "}Número de cuenta</Text>
      <View style={styles.searchSection}>
        <TextInput
          placeholder="1-234-56-78910-2"
          placeholderTextColor="#AC9DC9"
          style={styles.inputForm}
          inputContainerStyle={{borderBottomWidth:0}}
          errorStyle={styles.errorStyle}
          onEndEditing={(e) => onEnd(e, "acnu")}
          keyboardType="numeric"
        />
        <Icon
          name="payment"
          iconStyle={styles.iconRight}
        />
      </View>
      { acnuCorrect == 0 ?
        (<Text style={styles.textDescriptionError}>{" "}Su número de cuenta debe ser menor a 9 caracteres.</Text>):
        (<></>)
      }
      <Button
        title="Unirse"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={styles.btnRegister}
        onPress={onSubmit}
      />
      <Loading isVisible={loading} text="Creando cuenta" />
    </ScrollView>
  );
}

function defaultFormValue() {
  return {
    rut: "",
    ndoc: "",
    name: "",
    snam: "",
    usr: "",
    psw: "",
    repeatPassword: "",
    addr: "",
    comu: "",
    pais : "",
    bank : "",
    acty : "",
    acnu : ""
  };
}
function formato(objeto) {
  return{
    rut : objeto.rut,
    ndoc : objeto.ndoc,
    name : objeto.name,
    snam : objeto.snam,
    usr : objeto.usr,
    psw : objeto.psw,
    addr : objeto.addr,
    comu : objeto.comu,
    pais : objeto.pais,
    bank : objeto.bank,
    acty : objeto.acty,
    acnu : objeto.acnu  
  };
}
const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    marginTop: 30,
  },
  inputForm: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    width: "100%",   
    backgroundColor: '#fff',
    borderRadius: 20
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card:{
    backgroundColor: "#fff",
    marginTop: 10,
    marginLeft: 4,
    borderRadius: 20,
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
    fontWeight:"normal",
    fontSize:15,
    marginTop:10,
    justifyContent:"flex-start",
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
    margin: 20,
  },
});
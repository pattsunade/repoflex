import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import Loading from '../../../components/Loading';
import { isEmpty, isInteger } from 'lodash';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';
import regi0 from "api/transacciones/regi0";
import regi2 from 'api/transacciones/regi2';
import gecom from 'api/transacciones/gecom';
import TextFormInput from 'components/General/Inputs/TextFormInput';
import Select2 from "react-native-select-two"
import { RF_PURPLE, RF_PURPLE_DISABLED } from 'components/colorsConstants';
import { cleanNumberDoc, documentNumberRegex, rutRegex, validNdocRegex } from 'utils/rut';


export default function DocumentDataForm() {
    const [formData, setFormData] = React.useState({
        name: '',
        snam: '',
        ndoc: '',
        addr: '',
        regi: undefined,
        comu: undefined,
        pais: undefined,
        bank: undefined,
        acty: undefined,
        acnu: ''
    });
    const [isSubmiting, setIsSubmiting] = React.useState(false)


    const navigation = useNavigation();
    const ref_input2 = useRef();
    const ref_input3 = useRef();

    const [regionOptions, setRegionOptions] = React.useState([]);
    const [comunaOptions, setComunaOptions] = React.useState([]);
    const [bankOptions, setBankOptions] = React.useState([]);
    const [accountOptions, setAccountOptions] = React.useState([]);

    const [isFetchingComunaOptions, setIsFetchingComunaOptions] = React.useState(false);

    // Derived States
    const isNameValid = React.useMemo(() => {
        return formData.name === ''? undefined: true 
    },[formData.name])

    const isSnamValid = React.useMemo(() => {
        return formData.snam === ''? undefined: true 
    },[formData.snam])

    const isNdocValid = React.useMemo(() => {
        const numberClean = cleanNumberDoc(formData.ndoc)
        return validNdocRegex.test(numberClean)
    } ,[formData.ndoc])

    const isRegionComunaValid = React.useMemo(() => {
        return (formData.comu === undefined || formData.regi === undefined)? undefined: true 
    },[formData.regi, formData.comu])

    const isAddrValid = React.useMemo(() => {
        return formData.addr === ''? undefined: true 
    },[formData.addr])

    const isBankAccountValid = React.useMemo(() => {
        return (formData.bank === undefined || formData.acty === undefined)? undefined: true 
    },[formData.bank, formData.acty])
    
    const isAccountNumberValid = React.useMemo(() => {
        return formData.acnu === ''? undefined: true 
    },[formData.acnu])
    // Effects
    // Update regions/ bancks/ acount types
    React.useEffect(() => { 
        const run = async() => {
            await regi0()
            .then( response => {
                console.log(response)
                if(response.ans.stx === 'ok'){
                    setRegionOptions(response.ans.regiones || []);
                    setBankOptions(response.ans.bancos || []);
                    setAccountOptions(response.ans.actypes || []);
                }
            })
            .catch(err => {
                console.log(err)
            })
            .finally();
        }
        console.log('run')
        run();
    },[]) 

    


    // Form Handlers

    const handleOnChangeName = (value) => setFormData(data => ({
        ...data, 
        name:value
    })) 
    const handleOnChangeSnam = (value) => setFormData(data => ({
        ...data, 
        snam:value
    })) 

    const handleOnChangeNdoc = (number) => {
        const isNumerValid = documentNumberRegex.test(number)
        if (isNumerValid === true) {
            setFormData(data => ({
                ...data, 
                ndoc:number
            })) 
        }       
    }

    const handleOnChangeAddr = (value) => setFormData(data => ({
        ...data, 
        addr:value
    })) 

    const handleOnChangeAcnu = (value) => setFormData(data => ({
        ...data, 
        acnu:value
    })) 


    const handleSelectRegion = async(data) => {
        const regionCode = data[0] || null;
        
        setFormData(prevData => ({
            ...prevData,
            regi: regionCode,
            comu: undefined,
        }));
        if (regionCode !== null) {
            setComunaOptions([]);
            setIsFetchingComunaOptions(true);
            await gecom({regi: regionCode})
            .then(response => {
                if(response.ans.stx === 'ok'){
                    setComunaOptions(response.ans.com || []);
                }
            })
            .catch(err=>{
                console.log(err)
            })
            .finally(() => {
                setIsFetchingComunaOptions(false)
            })
        } 
    }


    const handleSelectComuna = (data) => {
        const comunaCode = data[0] || null;
        setFormData(prevData => ({
            ...prevData,
            comu: comunaCode
        }))     
    }

    const handleSelectBank = (data) => {
        const bankCode = data[0] || null;
        setFormData(prevData => ({
            ...prevData,
            bank: bankCode
        }))       
    }

    const handleSelectBankAccount = (data) => {
        const bankAccountCode = data[0] || null;
        setFormData(prevData => ({
            ...prevData,
            acty: bankAccountCode
        }))       
    }

    

    


    

    

   
    // On select region chet comunas and clear selected comuna
    

    const onSubmit = async() => { 
        setIsSubmiting(true)
        await regi2({
            name : formData.name,
            snam : formData.snam,
            ndoc : formData.ndoc,
            addr : formData.addr,
            comu : formData.comu,
            pais : 56,
            usr  : 'null',
            bank : formData.bank,
            acty : formData.acty,
            acnu : formData.acnu
        })
        .then((response) => {
            if (response.ans.stx === 'ok') {
                navigation.replace('documentimage',{mode:1})
            } 
            else {
                Toast.show({ 
                    type: 'error',
                    props: {
                        onPress: () => {}, 
                        text1: 'Error', 
                        text2: response.ans.msg
                    }
                });
            }
            
        })
        .catch(err => {
            console.log(err)
        })
        .then(() => {
            setIsSubmiting(true)
        })
    };
    return(
        <ScrollView style={styles.formContainer}>
            <Text style={styles.textDescription}>{' '}Nombres</Text>
            <View style={styles.searchSection}>
                <TextFormInput
                    placeholder='Ingresar nombre(s)'
                    onChangeText={handleOnChangeName}
                    value={formData.name}
                    maxLength={50}
                    returnKeyType='next'
                    onSubmitEditing={() => { ref_input2.current.focus()}}
                />
            </View>


            <Text style={styles.textDescription}>{' '}Apellidos</Text>
            <View style={styles.searchSection}>
                <TextFormInput
                    placeholder='Ingresar apellidos'
                    onChangeText={handleOnChangeSnam}
                    value={formData.snam}
                    maxLength={50}
                    returnKeyType='next'
                    onSubmitEditing={() => { ref_input3.current.focus()}}
                    ref={ref_input2}
                />
            </View>


            <Text style={styles.textDescription}>{' '}Número de documento </Text>
            <View style={styles.searchSection}>
                <TextFormInput
                    placeholder='123.456.789'
                    onChangeText={handleOnChangeNdoc}
                    maxLength={11}
                    value={formData.ndoc}
                    ref={ref_input3}
                />
            </View>

            <Text style={styles.textDescription}>{' '}Región</Text>
            <View style={styles.card}>
                <Select2
                    isSelectSingle
                    popupTitle={'Seleccionar Región'}
                    selectButtonText={'Seleccionar'}
                    cancelButtonText={'Cancelar'}
                    listEmptyTitle={'Región'}
                    style={styles.selectStyle}
                    colorTheme={RF_PURPLE}
                    searchPlaceHolderText={'Buscar Región'}
                    title={'Seleccionar Región'}
                    data={regionOptions.map(region => ({
                        id: region.cod, 
                        name: region.name, 
                        checked: formData.regi === region.cod
                    }))}
                    onSelect={handleSelectRegion}
                />
            </View>

            <Text style={styles.textDescription}>{' '}Comuna</Text>
            <View style={styles.card}>
                    <Select2
                        isSelectSingle
                        popupTitle={'Seleccionar Comuna'}
                        selectButtonText={'Seleccionar'}
                        cancelButtonText={'Cancelar'}
                        listEmptyTitle={
                            isFetchingComunaOptions === true? 
                            <ActivityIndicator size="large" color="#0000ff"/>: 
                            'Primero debes seleccionar una Región'
                        }
                        style={styles.selectStyle}
                        colorTheme={RF_PURPLE}
                        searchPlaceHolderText={'Buscar Comuna'}
                        title={'Seleccionar Comuna'}
                        data={comunaOptions.map(comuna => ({
                            id: comuna.cod, 
                            name: comuna.nam,
                            checked: comuna.cod === formData.comu
                        }))}
                        onSelect={handleSelectComuna}
                    />
            </View>

            <Text style={styles.textDescription}>{' '}Dirección</Text>
            <View style={styles.searchSection}>
                <TextFormInput
                    placeholder='Moneda 1202'
                    onChangeText={handleOnChangeAddr}
                    value={formData.addr}
                    maxLength={128}
                />
            </View>
          
            <Text style={styles.textDescription}>{' '}Banco</Text>
            <View style={styles.card}>
                <Select2
                    isSelectSingle
                    popupTitle={'Seleccionar Banco'}
                    selectButtonText={'Seleccionar'}
                    cancelButtonText={'Cancelar'}
                    listEmptyTitle={'Banco'}
                    style={styles.selectStyle}
                    colorTheme={RF_PURPLE}
                    searchPlaceHolderText={'Buscar Banco'}
                    title={'Seleccionar Banco'}
                    data={bankOptions.map(bank => ({
                        id: bank.cod, 
                        name: bank.name, 
                        checked: formData.bank === bank.cod
                    }))}
                    onSelect={handleSelectBank}
                />
            </View>


            <Text style={styles.textDescription}>{' '}Tipo de cuenta</Text>
            <View style={styles.card}>
                <Select2
                    isSelectSingle
                    popupTitle={'Seleccionar Tipo de cuenta'}
                    selectButtonText={'Seleccionar'}
                    cancelButtonText={'Cancelar'}
                    listEmptyTitle={'Tipo de cuenta'}
                    style={styles.selectStyle}
                    colorTheme={RF_PURPLE}
                    searchPlaceHolderText={'Buscar Tipo de cuenta'}
                    title={'Seleccionar Tipo de cuenta'}
                    data={accountOptions.map(account => ({
                        id: account.cod, 
                        name: account.name, 
                        checked: formData.acty === account.cod
                    }))}
                    onSelect={handleSelectBankAccount}
                />     
            </View>

            <Text style={styles.textDescription}>{' '}Número de cuenta</Text>
            <View style={styles.searchSection}>
                <TextFormInput
                    placeholder='0000123456789'
                    keyboardType='numeric'
                    maxLength={20}
                    onChangeText={handleOnChangeAcnu}
                    value={formData.acnu}
                    // errorText={'Su número de cuenta debe ser menor a 9 caracteres.'}
                    // showError={}
                />
            </View>
          
            {/* <Text>{JSON.stringify(formData)}</Text> */}

            <Button
                title='Siguiente'
                containerStyle={styles.btnContainerRegister}
                buttonStyle={styles.btnRegister}
                disabledStyle={styles.buttonDisabled}
                disabledTitleStyle={styles.buttonDisableTitle}
                onPress={onSubmit}
                loading={isSubmiting}
                disabled={isSubmiting || !(
                    isNameValid && 
                    isSnamValid &&
                    isNdocValid && 
                    isRegionComunaValid && 
                    isAddrValid && 
                    isBankAccountValid && 
                    isAccountNumberValid 
                )}
            />
        </ScrollView>
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
    // marginTop: 10,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  card:{
    backgroundColor: '#fff',
    // marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
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
    backgroundColor:RF_PURPLE,
  },
  iconRight: {
    color:'#AC9DC9',
  },
  textDescription: {
    fontWeight:'bold',
    fontSize:15,
    marginTop:10,
    marginBottom: 3,
    justifyContent:'flex-start',
    color:RF_PURPLE
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
  selectStyle : {
    borderWidth: 0,
    borderRadius: 5,
  },
  divider:{
    backgroundColor: RF_PURPLE,
    margin: 10,
  },
    buttonDisabled: {
        backgroundColor: RF_PURPLE_DISABLED
    },
    buttonDisableTitle: {
        color: "#fff"
    }
});
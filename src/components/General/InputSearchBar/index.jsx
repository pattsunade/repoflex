import { View, Text } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'
import styles from './styles'
import { Icon } from 'react-native-elements'

{/* <ActivityIndicator size={"small"} color={"#9F9F9F"}/> */}

export default function InputSearchBar({
    label,
    placeHolder,
    value,
    onChangeText,
    onSubmitEditing,
}) {
    const inputRef = React.useRef(null);
    // const clicked = React.useState(false)
    // // console.log(">", inputRef.current)
    return (
        <View>
            <View 
                style={styles.container_unclicket} 
                onTouchEndCapture={() => inputRef.current.focus()}    
            >
                {(label != '') &&
                    <Text style={styles.labelArea} >
                        {label}
                    </Text>
                }
                <TextInput 
                    ref={inputRef}
                    style={styles.searchInput}
                    placeholder={placeHolder}
                    value={value}
                    onChangeText={onChangeText}
                    returnKeyType={'search'}
                    onSubmitEditing={onSubmitEditing}
                />   
                <View style={styles.iconContainer}>
                    <Icon 
                        type='Feather'
                        name='search'
                        iconStyle={styles.icon}
                    />
                </View> 
            </View>
        </View>
    )
}


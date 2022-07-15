import React from 'react'
import { TextInput, View, StyleSheet, Text } from 'react-native'
function TextFormInput({
    placeholder,
    onEndEditingText = () => {},
    maxLength = 999,
    onChangeText = () => {},
    returnKeyType = "done",
    onSubmitEditing = () => {},
    blurOnSubmit = false,
    value,
    keyboardType = "default",
    autoCapitalize = "none",
    errorText,
    showError
}, ref) {
    return (
        <View>
            <View style={styles.inputArea}>
                <TextInput 
                    placeholder={placeholder}
                    placeholderTextColor="#AC9DC9"
                    onEndEditing={e => onEndEditingText(e.nativeEvent.text)}
                    maxLength={maxLength}
                    onChangeText={onChangeText}
                    returnKeyType={returnKeyType}
                    onSubmitEditing={onSubmitEditing}
                    blurOnSubmit={blurOnSubmit}
                    value={value}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    style={styles.textInput}
                    ref={ref}
                />
            </View>
            {errorText && 
                <Text style={styles.errorText}> 
                    {showError && errorText}
                </Text>
            }
        </View>
    )
}

export default React.forwardRef(TextFormInput)

const styles = StyleSheet.create({
    inputArea: {
        flexDirection: 'row',
        width: "100%",
        backgroundColor: '#fff',
        borderRadius: 100,
        // paddingVertical: 10,
        paddingHorizontal: 10,
    },
    textInput: {
        fontSize:18,
        paddingVertical: 10,
        width: "100%",
        padding: 0,
        margin: 0
    },
    errorText: {
        marginHorizontal: 10,
        fontSize: 14,
        color:"#ff0000",
        minHeight: 24,
    }
})
import React from 'react'
import { TextInput, View, StyleSheet, Text } from 'react-native'
import { Icon } from 'react-native-elements'
function PasswordFormInput({
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

    const [hidePassord, setHidePassword] = React.useState(true)
    const toggleHide = () => setHidePassword(value => !value);
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
                    secureTextEntry={hidePassord}
                    ref={ref}
                />
                <Icon
                    type="material-community"
					name={hidePassord? "eye-off-outline":  "eye-outline"}
                    iconStyle={styles.icon}
                    containerStyle={styles.iconContainer}
                    onPress={toggleHide}
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

export default React.forwardRef(PasswordFormInput)

const styles = StyleSheet.create({
    inputArea: {
        flexDirection: 'row',
        width: "100%",
        backgroundColor: '#fff',
        borderRadius: 5,
        // paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'flex-end'
    },
    textInput: {
        fontSize:16,
        width: "90%",
        paddingVertical: 10,
        margin: 0
        // borderColor: 'gray'
    },
    iconContainer: {
        width: "10%",
        paddingVertical: 10,

    },
    icon: {
        color:"#AC9DC9",
    },
    errorText: {
        marginHorizontal: 10,
        fontSize: 14,
        color:"#ff0000",
        minHeight: 24,
        // borderWidth: 1
    }
})

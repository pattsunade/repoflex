import { StyleSheet } from 'react-native';

const FONT_SIZE = 16

const styles = StyleSheet.create({
    container_unclicket: {
        // borderWidth: 0.25,
        // borderColor: 'gray',
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius:100,
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#7B53AE'

    },
    iconContainer: {
        flex: 1,
        color: '#9F9F9F',
    },
    icon: {
        color: '#9F9F9F',
    },
    labelArea: {
        color: '#9F9F9F',
        marginEnd: 10,
        fontSize: FONT_SIZE,
    },
    searchInput: {
        color: 'black',
        flex:9,
        fontSize: FONT_SIZE,
        paddingHorizontal: 0,
        paddingBottom: 0,
        paddingTop:1,
    },
})

export default styles
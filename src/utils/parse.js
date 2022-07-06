import ParsedText from 'react-native-parsed-text';

class Example extends React.Component {
  static displayName = 'Example';

  handleUrlPress(url, matchIndex /*: number*/) {
    LinkingIOS.openURL(url);
  }

  handlePhonePress(phone, matchIndex /*: number*/) {
    AlertIOS.alert(`${phone} has been pressed!`);
  }

  handleNamePress(name, matchIndex /*: number*/) {
    AlertIOS.alert(`Hello ${name}`);
  }

  handleEmailPress(email, matchIndex /*: number*/) {
    AlertIOS.alert(`send email to ${email}`);
  }

  renderText(matchingString, matches) {
    // matches => ["[@michel:5455345]", "@michel", "5455345"]
    let pattern = /\[(@[^:]+):([^\]]+)\]/i;
    let match = matchingString.match(pattern);
    return `^^${match[1]}^^`;
  }

  render() {
    return (
      <View style={styles.container}>
        <ParsedText
          style={styles.text}
          parse={
            [ {type: 'url',                       style: styles.url, onPress: this.handleUrlPress},
              {pattern: /\[(@[^:]+):([^\]]+)\]/i, style: styles.username, onPress: this.handleNamePress, renderText: this.renderText},
            ]
          }
          childrenProps={{allowFontScaling: false}}
        >
          
        </ParsedText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  url: {
    color: 'blue',
    textDecorationLine: 'underline',
  },

  email: {
    textDecorationLine: 'underline',
  },

  text: {
    color: 'black',
    fontSize: 15,
  },

  phone: {
    color: 'blue',
    textDecorationLine: 'underline',
  },

  name: {
    color: 'red',
  },

  username: {
    color: 'green',
    fontWeight: 'bold'
  },

  magicNumber: {
    fontSize: 42,
    color: 'pink',
  },

  hashTag: {
    fontStyle: 'italic',
  },

});
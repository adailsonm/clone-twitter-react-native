import React, { Component } from 'react';

import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, StyleSheet, AsyncStorage, Image} from 'react-native';

import Logo from '../public/img/app.png'
import Loading from '../components/Loading';
import { StackActions, NavigationActions} from 'react-navigation';

export default class Login extends Component {
    static navigationOptions = {
        header: null
    };
    state = {
        username: '',
    };

    async componentDidMount() {
        const username = await AsyncStorage.getItem('@GoTwitter:username');
        
        if(username) {
            this.navigateToTimeLine();
        }
    }

    handleLogin = async () => {
        const { username } = this.state;

        if(!username.length) return;

        await AsyncStorage.setItem('@GoTwitter:username', username);
        
        this.navigateToTimeLine();
    };

    navigateToTimeLine = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Timeline'})
            ]
        })

        this.props.navigation.dispatch(resetAction);
    }

    handleInputChange = username => {
        this.setState({ username });
    };

    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.content}>
                    <Image
                        style={styles.imageLogo}
                        source={Logo}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Nome de usuário"
                        value={this.state.username}
                        onChangeText={this.handleInputChange}
                        returnKeyType="send"
                        onSubmitEditing={this.handleLogin}
                    />
                    <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF"
    },
  
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 30
    },

    imageLogo: {
        width: 200,
        height: 200,
    },
  
    input: {
      borderWidth: 1,
      borderColor: "#DDD",
      borderRadius: 5,
      height: 44,
      paddingHorizontal: 15,
      alignSelf: "stretch",
      marginTop: 30
    },
  
    button: {
      height: 44,
      alignSelf: "stretch",
      marginTop: 10,
      backgroundColor: "#4BB0EE",
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center"
    },
  
    buttonText: {
      color: "#FFF",
      fontSize: 16,
      width: 50,
      fontWeight: "bold"
    }
  });
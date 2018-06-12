import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Image, Keyboard } from 'react-native';
import deviceLog from 'react-native-device-log';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {
  Container,
  Content,
  Form,
  Item,
  Label,
  Input,
  Button,
  Text,
  Toast,
  Spinner
} from 'native-base';
import { onSignIn } from '../../services/oauth';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFECCA'
  },
  logo: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '80%',
    marginTop: 20
  },
  inputs: {
    flex: 1,
    backgroundColor: '#FFF',
    marginBottom: 20
  }
});

class Login extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    loading: false,
    email: '',
    password: ''
  };

  handleSubmit = async () => {
    Keyboard.dismiss();
    const { navigate } = this.props.navigation;
    const { email, password } = this.state;
    this.setState({ loading: true });

    try {
      await onSignIn(email, password);
      this.setState({ loading: false });
      navigate('Home');
    } catch (e) {
      deviceLog.debug(e);
      this.setState({ loading: false });
      Toast.show({
        text: e.message,
        buttonText: 'Okay',
        type: 'danger'
      });
    }
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Form model="credentials" style={styles.form}>
            <Item rounded last style={styles.inputs}>
              <Label>Email</Label>
              <Input
                name="email"
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
              />
            </Item>
            <Item rounded last style={styles.inputs}>
              <Label>Password</Label>
              <Input
                name="password"
                secureTextEntry
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
              />
            </Item>
            <Button block onPress={this.handleSubmit}>
              {this.state.loading ? <Spinner /> : <Text>login</Text>}
            </Button>
          </Form>
          <KeyboardSpacer />
        </Content>
      </Container>
    );
  }
}

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default Login;

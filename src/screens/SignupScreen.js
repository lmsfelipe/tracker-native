import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import { Context } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SignupScreen = () => {
  const { state, signup } = useContext(Context);

  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Sign Up!"
        buttonText="Sign Up"
        errorMessage={state.errorMessage}
        onSubmit={signup}
      />

      <NavLink
        routeName="Signin"
        text="Already have an account? Signin instead"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 100,
  },
});

SignupScreen.navigationOptions = {
  header: null,
};

export default SignupScreen;

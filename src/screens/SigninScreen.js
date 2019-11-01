import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import { Context } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SigninScreen = () => {
  const { state, signin } = useContext(Context);

  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Sign In!"
        buttonText="Sign In"
        errorMessage={state.errorMessage}
        onSubmit={signin}
      />

      <NavLink
        routeName="Signup"
        text="Dont have an account? Signup"
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

SigninScreen.navigationOptions = {
  header: null,
};

export default SigninScreen;

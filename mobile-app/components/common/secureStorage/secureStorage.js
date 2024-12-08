import * as SecureStore from 'expo-secure-store';

export const storeLoginData = async (loginResponse) => {
    try {
      await SecureStore.setItemAsync('loginData', JSON.stringify(loginResponse));
      console.log('Login data securely stored!');
    } catch (error) {
      console.error('Error storing login data:', error);
    }
};

export const getLoginData = async () => {
    try {
        const loginDataString = await SecureStore.getItemAsync('loginData');
        if (loginDataString) {
        const loginData = JSON.parse(loginDataString);
        console.log('Retrieved login data:', loginData);
        return loginData;
        }
    } catch (error) {
        console.error('Error retrieving login data:', error);
    }
    return null;
};
  

export const removeLoginData = async () => {
    try {
        await SecureStore.deleteItemAsync('loginData');
        console.log('Login data removed successfully!');
    } catch (error) {
        console.error('Error removing login data:', error);
    }
};
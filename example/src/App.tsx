import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import TelebirrPayment from 'react-native-telebirr-payment';

export default function App() {
  const [resultCode, setResultCode] = useState(null);
  const [resultMessage, setresultMessage] = useState(null);
  const handlePayment = async () => {
    try {
      const appId = '1320965192345604';
      const shortCode = '5510';
      const receiveCode =
        'TELEBIRR$BUYGOODS$5510$0.05$1011aaa976afdd534429233b9b538d26727007$120m';

      const result = await TelebirrPayment.startPay(
        appId,
        shortCode,
        receiveCode
      );
      const { code, message } = result;
      setResultCode(code);
      setresultMessage(message);
      if (result) {
        if (code === -3) {
          console.log('User canceled the payment.', message);
        } else if (code === 0) {
          console.log('Successful Payment.');
        } else if (code === -10) {
          console.log('Telebir Payment is not installed.', message);
        } else {
          console.log(`Error Code: ${code}, Message: ${message}`);
        }
      } else {
        console.log('Unexpected log format:', result);
      }
    } catch (error) {
      console.error('Payment initiation failed:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subcontainer}>
        <Text style={styles.textStyle}>
          Welcome to React Native Telebirr Payment
        </Text>
        <View style={styles.payment}>
          <TouchableOpacity style={styles.buttonStyle} onPress={handlePayment}>
            <Text style={styles.textStyle}>Pay</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.payment}>
          <Text style={styles.textStyle}>code: {resultCode}</Text>
          <Text style={styles.textStyle}>message: {resultMessage}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subcontainer: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  payment: {
    marginTop: 10,
  },
  textStyle: {
    fontSize: 16,
  },
  buttonStyle: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    paddingHorizontal: 20,
  },
});

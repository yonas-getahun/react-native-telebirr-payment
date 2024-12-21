import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import TelebirrPayment from 'react-native-telebirr-payment';

export default function App() {
  const handlePayment = async () => {
    try {
      const appId = '1227472858880206';
      const shortCode = '900727';
      const receiveCode =
        'TELEBIRR$BUYGOODS$900727$1$012502f699dd91a2af4dccc4968e73f9eae003$120m';

      const result = await TelebirrPayment.startPay(
        appId,
        shortCode,
        receiveCode
      );
      console.log('result', result); // Log success message if payment initiated successfully
      const errorMatch = result.match(
        /Error code:\s*(-?\d+),\s*Message:\s*(.*)/
      );

      if (errorMatch) {
        const errorCode = parseInt(errorMatch[1], 10); // Convert extracted code to a number
        const errorMessage = errorMatch[2]; // Extract the message

        if (errorCode === -3) {
          console.log('User canceled the payment.');
        } else if (errorCode === 0) {
          console.log('Successful Payment.');
        } else if (errorCode === -10) {
          console.log('Telebir Payment is not installed.');
        } else {
          console.log(`Error Code: ${errorCode}, Message: ${errorMessage}`);
          // Handle other errors
        }
      } else {
        console.log('Unexpected log format:', result);
        // Handle unexpected log format
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
        <View>
          <TouchableOpacity style={styles.buttonStyle} onPress={handlePayment}>
            <Text>Pay</Text>
          </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 16,
    textAlign: 'center',
  },
  buttonStyle: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    paddingHorizontal: 20,
  },
});

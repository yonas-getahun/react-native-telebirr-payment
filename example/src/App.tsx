import { Text, View, StyleSheet, Button } from 'react-native';
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
    <View style={styles.container}>
      <Text style={{ fontSize: 16, textAlign: 'center' }}>
        Welcome to React Native Telebirr Payment
      </Text>
      <View style={{ marginTop: 10, marginHorizontal: 20 }}>
        <Button title="Pay" onPress={handlePayment} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});

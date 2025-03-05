import {
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import TelebirrPayment from 'react-native-telebirr-payment';

export default function App() {
  const amount = '3.00 ETB';

  const handlePayment = async () => {
    try {
      const appId = '00000000000';
      const shortCode = '00000';
      const receiveCode =
        'TELEBIRR$BUYGOODS$900727$3$0147d4536f7f4115d3fbaa93f2ba5e4e559004$120m';

      const result = await TelebirrPayment.startPay(
        appId,
        shortCode,
        receiveCode
      );
      const { code, message } = result;

      setTimeout(() => {
        let alertTitle = 'Payment Result';
        let alertMessage = `Code: ${code}\nMessage: ${message}`;

        if (code === -3) {
          alertTitle = 'Payment Canceled';
          alertMessage = 'You canceled the payment.';
        } else if (code === 0) {
          alertTitle = 'Payment Successful';
          alertMessage = `Your payment of ${amount} was completed successfully!`;
        } else if (code === -10) {
          alertTitle = 'App Not Installed';
          alertMessage =
            'Telebirr Payment app is not installed on this device.';
        }

        Alert.alert(alertTitle, alertMessage);
      }, 100);
    } catch (error) {
      Alert.alert('Error', 'Payment initiation failed.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* React Native Logo */}
      <Image
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Welcome Text */}
      <Text style={styles.title}>Welcome to</Text>
      <Text style={styles.subtitle}>Your Telebirr Payment App</Text>

      {/* Amount Display */}
      <Text style={styles.amount}>Amount: {amount}</Text>

      {/* Pay Now Button */}
      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Pay with telebirr</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#AAA',
    marginBottom: 30,
    textAlign: 'center',
  },
  amount: {
    fontSize: 18,
    color: '#FFD700',
    fontWeight: '600',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: 40,
    width: 12,
    height: 12,
    backgroundColor: '#FFF',
    borderRadius: 6,
    opacity: 0.8,
  },
});

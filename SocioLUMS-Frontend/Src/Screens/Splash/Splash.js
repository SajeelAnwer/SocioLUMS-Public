import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, } from 'react-native';

export default function Splash({navigation}) {

  const navigateToLoginaccounttype =  () => { navigation.navigate('Loginaccounttype')  }

  const navigateToSU_accounttype =  () => { navigation.navigate('SU_accounttype') }


  return (    
    <View style={styles.container}>
      
      <ImageBackground
        source={require('../../../assets/splash.png')}
        resizeMode="cover" 
        style={styles.background}>

        <Text style={styles.title}>SocioLUMS</Text>
        <Image
          source={require('../../../assets/SocioLUMS.png')}
          style={styles.logo}
        />
        
        <Text style={styles.subtitle}>Connect with your societies!</Text>
        <TouchableOpacity style={styles.button} onPress={navigateToLoginaccounttype}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={navigateToSU_accounttype}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>



      </ImageBackground>
    </View>

  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%', 
    backgroundColor: '#fff',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%', 
    alignItems: 'center',
    justifyContent: 'center',

  },
  logo: {
    width: 350,
    height: 250,
    marginBottom: 230,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 0,
    marginTop: 20,
    color: 'white',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  button: {
    backgroundColor: '#e9dcf6',
    color: '#e9dcf6',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    width: 300
  },
  buttonText: {
    color: 'purple',
    fontSize: 18,
    fontWeight: 'bold',
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
});

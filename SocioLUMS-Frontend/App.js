import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Splash from './Src/Screens/Splash/Splash';
import Login from './Src/Screens/LoginSignup/Login/Login';
import SU_details from './Src/Screens/LoginSignup/Signup/SU_details';
import SU_verificationcode from './Src/Screens/LoginSignup/Signup/SU_verificationcode';
import SU_successful from './Src/Screens/LoginSignup/Signup/SU_successful';
import FP_Email from './Src/Screens/LoginSignup/ForgotPassword/FP_Email';
import FP_Verficationcode from './Src/Screens/LoginSignup/ForgotPassword/FP_Verficationcode';
import FP_NewPassword from './Src/Screens/LoginSignup/ForgotPassword/FP_NewPassword';
import FP_Passwordchanged from './Src/Screens/LoginSignup/ForgotPassword/FP_Passwordchanged';
import StudentMain from './Src/Screens/MainPage/StudentMain';
import Allchats from './Src/Screens/ChatSection/Allchats';
import SocietiesList from './Src/Screens/MainPage/SocietiesList';
import User_profile from './Src/Screens/Profile/User_profile';
import SU_accounttype from './Src/Screens/LoginSignup/Signup/SU_accounttype';
import Loginaccounttype from './Src/Screens/LoginSignup/Login/Loginaccouttype';
import Society_SU_details from './Src/Screens/LoginSignup/Signup/Society_SU_details';
import Society_SU_verificationcode from './Src/Screens/LoginSignup/Signup/Society_SU_verificationcode';
import Sponsor_SU_details from './Src/Screens/LoginSignup/Signup/Sponsor_SU_details';
import Sponsor_SU_verificationcode from './Src/Screens/LoginSignup/Signup/Sponsor_SU_verificationcode';
import Society_login from './Src/Screens/LoginSignup/Login/Society_login';
import Sponsor_login from './Src/Screens/LoginSignup/Login/Sponsor_login';
import SocietyMain from './Src/Screens/MainPage/SocietyMain';
import SponsorMain from './Src/Screens/MainPage/SponsorMain';
import Society_profile from './Src/Screens/Profile/Society_profile';
import Allchats_society from './Src/Screens/ChatSection/Allchats_society';
import Societysettings from './Src/Screens/Profile/Societysettings';
import Changepasswords from './Src/Screens/Settings/Changepasswords';
import Changename from './Src/Screens/Settings/Changename';
import Changedp from './Src/Screens/Settings/Changedp';
import Society_FP_email from './Src/Screens/LoginSignup/ForgotPassword/Society_FP_email'
import Society_FP_Verificationcode from './Src/Screens/LoginSignup/ForgotPassword/Society_FP_Verificationcode';
import Society_FP_NewPassword from './Src/Screens/LoginSignup/ForgotPassword/Society_FP_NewPassword';
import Sponsor_FP_email from './Src/Screens/LoginSignup/ForgotPassword/Sponsor_FP_email'
import Sponsor_FP_Verificationcode from './Src/Screens/LoginSignup/ForgotPassword/Sponsor_FP_Verificationcode';
import Sponsor_FP_NewPassword from './Src/Screens/LoginSignup/ForgotPassword/Sponsor_FP_NewPassword';
import Sponsor_profile from './Src/Screens/Profile/Sponsor_profile';
import Sponsorsettings from './Src/Screens/Profile/Sponsorsettings';
import Society_Changepassword from './Src/Screens/Settings/Society_Changepassword'
import Sponsor_Changepassword from './Src/Screens/Settings/Sponsor_Changepassword'
import Society_Changename from './Src/Screens/Settings/Society_Changename'
import Sponsor_Changename from './Src/Screens/Settings/Sponsor_Changename'
import Society_Changedp from './Src/Screens/Settings/Society_Changedp';
import Sponsor_Changedp from './Src/Screens/Settings/Sponsor_Changedp';
import Society_Changecover from './Src/Screens/Settings/Society_Changecover';
import Sponsor_Changecover from './Src/Screens/Settings/Sponsor_Changecover';
import Society_Changedescription from './Src/Screens/Settings/Society_Changedescription';
import Sponsor_Changedescription from './Src/Screens/Settings/Sponsor_Changedescription';
import Society_postmain from './Src/Screens/Posts/Society_postmain';
import Sponsor_postmain from './Src/Screens/Posts/Sponsor_postmain';
import General_Seacrhpage from './Src/Screens/MainPage/General_Seacrhpage'
import SponsorList from './Src/Screens/MainPage/SponsorList';
import Society_otherprofile from './Src/Screens/Profile/Society_otherprofile';
import MessagePage from './Src/Screens/ChatSection/MessagePage';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={
        {headerShown: false,
        animation: 'slide_from_right'}
        
      }>

        <Stack.Screen name="Splash" component={Splash} />   
        
        <Stack.Screen name="Loginaccounttype" component={Loginaccounttype} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Society_login" component={Society_login} />
        <Stack.Screen name="Sponsor_login" component={Sponsor_login} />

        <Stack.Screen name="SU_accounttype" component={SU_accounttype} />
        <Stack.Screen name="SU_details" component={SU_details} />
        <Stack.Screen name="SU_verificationcode" component={SU_verificationcode} />
        <Stack.Screen name="SU_successful" component={SU_successful} />
        <Stack.Screen name="Society_SU_details" component={Society_SU_details} />
        <Stack.Screen name="Society_SU_verificationcode" component={Society_SU_verificationcode} />
        <Stack.Screen name="Sponsor_SU_details" component={Sponsor_SU_details} />
        <Stack.Screen name="Sponsor_SU_verificationcode" component={Sponsor_SU_verificationcode} />

        <Stack.Screen name="FP_Email" component={FP_Email} />
        <Stack.Screen name="FP_Verificationcode" component={FP_Verficationcode} />
        <Stack.Screen name="FP_NewPassword" component={FP_NewPassword} />
        <Stack.Screen name="FP_Passwordchanged" component={FP_Passwordchanged} />
        <Stack.Screen name="Society_FP_email" component={Society_FP_email} />
        <Stack.Screen name="Society_FP_Verificationcode" component={Society_FP_Verificationcode} />
        <Stack.Screen name="Society_FP_NewPassword" component={Society_FP_NewPassword} />
        <Stack.Screen name="Sponsor_FP_email" component={Sponsor_FP_email} />
        <Stack.Screen name="Sponsor_FP_Verificationcode" component={Sponsor_FP_Verificationcode} />
        <Stack.Screen name="Sponsor_FP_NewPassword" component={Sponsor_FP_NewPassword} />

        <Stack.Screen name="StudentMain" component= {StudentMain} />
        <Stack.Screen name="SocietyMain" component= {SocietyMain} />
        <Stack.Screen name="SponsorMain" component= {SponsorMain} />

        <Stack.Screen name="Allchats" component= {Allchats} />
        <Stack.Screen name="Allchats_society" component= {Allchats_society} />

        <Stack.Screen name="SocietiesList" component= {SocietiesList} options={{
          animation: 'slide_from_bottom'
        }}/>

        <Stack.Screen name="User_profile" component= {User_profile} options={{
          animation: 'slide_from_bottom'
        }}/>

        <Stack.Screen name="Society_profile" component= {Society_profile} options={{
          animation: 'slide_from_bottom'
        }}/>

        <Stack.Screen name="Sponsor_profile" component= {Sponsor_profile} options={{
          animation: 'slide_from_bottom'
        }}/>

        <Stack.Screen name="Societysettings" component= {Societysettings} options={{
          animation: 'slide_from_bottom'
        }}/>

        <Stack.Screen name="Sponsorsettings" component= {Sponsorsettings} options={{
          animation: 'slide_from_bottom'
        }}/>

        <Stack.Screen name="Changepasswords" component= {Changepasswords} />
        <Stack.Screen name="Changename" component= {Changename} />
        <Stack.Screen name="Changedp" component= {Changedp} />
        <Stack.Screen name="Society_Changepassword" component= {Society_Changepassword} />
        <Stack.Screen name="Sponsor_Changepassword" component= {Sponsor_Changepassword} />
        <Stack.Screen name="Society_Changename" component= {Society_Changename} />
        <Stack.Screen name="Sponsor_Changename" component= {Sponsor_Changename} />
        <Stack.Screen name="Society_Changedp" component= {Society_Changedp} />
        <Stack.Screen name="Sponsor_Changedp" component= {Sponsor_Changedp} />
        <Stack.Screen name="Society_Changecover" component= {Society_Changecover} />
        <Stack.Screen name="Sponsor_Changecover" component= {Sponsor_Changecover} />
        <Stack.Screen name="Society_Changedescription" component= {Society_Changedescription} />
        <Stack.Screen name="Sponsor_Changedescription" component= {Sponsor_Changedescription} />

        <Stack.Screen name="Society_postmain" component= {Society_postmain} />
        <Stack.Screen name="Sponsor_postmain" component= {Sponsor_postmain} />

        <Stack.Screen name="General_Seacrhpage" component= {General_Seacrhpage} />
        <Stack.Screen name="SponsorList" component= {SponsorList} />

        <Stack.Screen name="Society_otherprofile" component= {Society_otherprofile} />
        <Stack.Screen name="MessagePage" component= {MessagePage} />

      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

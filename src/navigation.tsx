import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/login/Login";
import Welcome from "./screens/welcome/Welcome";
import Signup from "./screens/signup/Signup";
import GetStarted from "./screens/signup/GetStarted";

export type WelcomeParamList = {
  Welcome: undefined;
  Login: undefined;
  CreateAccount: undefined;
};

export type SignupParamList = {
  GetStarted: undefined;
  Signup: undefined;
};

export type NavParamList = WelcomeParamList & SignupParamList;

const WelcomeStackNav = createStackNavigator<WelcomeParamList>();
const SignupStackNav = createStackNavigator<SignupParamList>();

function CreateAccountNavigation() {
  return (
    <SignupStackNav.Navigator
      initialRouteName="GetStarted"
      screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <SignupStackNav.Screen name="GetStarted" component={GetStarted} />
      <SignupStackNav.Screen name="Signup" component={Signup} />
    </SignupStackNav.Navigator>
  );
}

export default function Navigation() {
  return (
    <WelcomeStackNav.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <WelcomeStackNav.Screen name="Welcome" component={Welcome} />
      <WelcomeStackNav.Screen name="Login" component={Login} />
      <WelcomeStackNav.Screen
        name="CreateAccount"
        component={CreateAccountNavigation}
      />
    </WelcomeStackNav.Navigator>
  );
}

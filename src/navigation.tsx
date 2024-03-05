import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/login/Login";
import Welcome from "./screens/welcome/Welcome";
import Signup from "./screens/signup/Signup";
import GetStarted from "./screens/signup/GetStarted";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./screens/home/Home";
import Map from "./screens/map/Map";
import Routes from "./screens/routes/Routes";
import Accommodation from "./screens/accommodation/Accommodation";
import Service from "./screens/service/Service";
import { useUser } from "./utils/hooks/useUser";
import OnBoardedTabs from "./components/OnBoardedTabs";
import OnBoardedHeader from "./components/OnBoardedHeader";

export type OnboardingParamList = {
  Welcome: undefined;
  Login: undefined;
  CreateAccount: undefined;
};

export type OnboardedParamList = {
  Home: undefined;
  Map: undefined;
  Routes: undefined;
  Accommodation: undefined;
  Service: undefined;
  Profile: undefined;
  Message: undefined;
  Notification: undefined;
};

export type SignupParamList = {
  GetStarted: undefined;
  Signup: undefined;
};

export type NavParamList = OnboardingParamList &
  SignupParamList &
  OnboardedParamList;

const OnboardingStackNav = createStackNavigator<OnboardingParamList>();
const OnboardedBottomTabNav = createBottomTabNavigator<OnboardedParamList>();
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
  const user = useUser();

  return !user ? (
    <OnboardingStackNav.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <OnboardingStackNav.Screen name="Welcome" component={Welcome} />
      <OnboardingStackNav.Screen name="Login" component={Login} />
      <OnboardingStackNav.Screen
        name="CreateAccount"
        component={CreateAccountNavigation}
      />
    </OnboardingStackNav.Navigator>
  ) : (
    <OnboardedBottomTabNav.Navigator
      initialRouteName="Home"
      tabBar={OnBoardedTabs}>
      <OnboardedBottomTabNav.Screen
        name="Home"
        component={Home}
        options={{ header: OnBoardedHeader }}
      />
      <OnboardedBottomTabNav.Screen
        name="Map"
        component={Map}
        options={{ header: OnBoardedHeader }}
      />
      <OnboardedBottomTabNav.Screen
        name="Routes"
        component={Routes}
        options={{ header: OnBoardedHeader }}
      />
      <OnboardedBottomTabNav.Screen
        name="Accommodation"
        component={Accommodation}
        options={{ header: OnBoardedHeader }}
      />
      <OnboardedBottomTabNav.Screen
        name="Service"
        component={Service}
        options={{ header: OnBoardedHeader }}
      />
    </OnboardedBottomTabNav.Navigator>
  );
}

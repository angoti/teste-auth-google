import { StatusBar } from "expo-status-bar";
import * as AuthSession from "expo-auth-session";
import HomeScreen from "./src/screens/HomeScreen";

// ↓ remova após descobrir a URI
console.log("URI de redirecionamento:", AuthSession.makeRedirectUri({ useProxy: true }));

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <HomeScreen />
    </>
  );
}

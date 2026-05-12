import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import { useGoogleAuth } from "../hooks/useGoogleAuth";

export default function LoginScreen() {
  const { userInfo, request, promptAsync } = useGoogleAuth();

  if (userInfo) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: userInfo.picture }} style={styles.avatar} />
        <Text style={styles.name}>Olá, {userInfo.name}!</Text>
        <Text style={styles.email}>{userInfo.email}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar com Google</Text>
      <Pressable style={styles.button} disabled={!request} onPress={() => promptAsync()}>
        <Text style={styles.buttonText}>Continuar com Google</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 32 },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 16 },
  name: { fontSize: 20, fontWeight: "600" },
  email: { fontSize: 14, color: "#666" },
  button: {
    backgroundColor: "#4285F4",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});

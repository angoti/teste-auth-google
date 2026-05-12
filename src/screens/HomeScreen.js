import { useState } from "react";
import { View, Text, Image, Pressable, ActivityIndicator, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { useGoogleAuth } from "../hooks/useGoogleAuth";

console.log("Renderizando HomeScreen...");

export default function HomeScreen() {
  const { user, loading, error, request, signIn, signOut } = useGoogleAuth();

  console.log("Estado de autenticação - User:", user, "Loading:", loading, "Error:", error);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#4285F4" />
        <Text style={styles.loadingText}>Autenticando...</Text>
      </View>
    );
  }

  if (user) {
    return <ProfileView user={user} onSignOut={signOut} />;
  }

  return <LoginView onSignIn={signIn} error={error} disabled={!request} />;
}

// ─── Tela de Login ────────────────────────────────────────────────────────────

function LoginView({ onSignIn, error, disabled }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginBox}>
        <Text style={styles.appTitle}>Meu App</Text>
        <Text style={styles.appSubtitle}>Faça login para continuar</Text>

        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <Pressable
          style={({ pressed }) => [styles.googleButton, disabled && styles.googleButtonDisabled, pressed && styles.googleButtonPressed]}
          onPress={onSignIn}
          disabled={disabled}>
          <GoogleIcon />
          <Text style={styles.googleButtonText}>Continuar com Google</Text>
        </Pressable>

        <Text style={styles.disclaimer}>Ao continuar, você concorda com os nossos Termos de Uso e Política de Privacidade.</Text>
      </View>
    </SafeAreaView>
  );
}

// ─── Tela de Perfil ───────────────────────────────────────────────────────────

function ProfileView({ user, onSignOut }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.profileScroll}>
        <View style={styles.profileHeader}>
          {user.picture ? (
            <Image source={{ uri: user.picture }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitial}>{user.name?.charAt(0).toUpperCase()}</Text>
            </View>
          )}
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>

          {user.verified_email && (
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedText}>✓ E-mail verificado</Text>
            </View>
          )}
        </View>

        <View style={styles.infoCard}>
          <InfoRow label="Nome" value={user.name} />
          <InfoRow label="E-mail" value={user.email} />
          {user.given_name && <InfoRow label="Primeiro nome" value={user.given_name} />}
          {user.family_name && <InfoRow label="Sobrenome" value={user.family_name} />}
          {user.locale && <InfoRow label="Idioma" value={user.locale} />}
          <InfoRow label="ID Google" value={user.id} mono />
        </View>

        <Pressable style={({ pressed }) => [styles.signOutButton, pressed && styles.signOutButtonPressed]} onPress={onSignOut}>
          <Text style={styles.signOutText}>Sair da conta</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Componentes auxiliares ───────────────────────────────────────────────────

function InfoRow({ label, value, mono }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={[styles.infoValue, mono && styles.infoValueMono]} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

function GoogleIcon() {
  return (
    <View style={styles.googleIconWrapper}>
      <Text style={styles.googleIconText}>G</Text>
    </View>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#F5F7FA",
  },
  loadingText: {
    fontSize: 15,
    color: "#5F6368",
  },

  // Login
  loginBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    gap: 16,
  },
  appTitle: {
    fontSize: 36,
    fontWeight: "700",
    color: "#202124",
    marginBottom: 4,
  },
  appSubtitle: {
    fontSize: 16,
    color: "#5F6368",
    marginBottom: 16,
  },
  errorBox: {
    backgroundColor: "#FDECEA",
    borderRadius: 8,
    padding: 12,
    width: "100%",
  },
  errorText: {
    color: "#D93025",
    fontSize: 14,
    textAlign: "center",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DADCE0",
    paddingVertical: 13,
    paddingHorizontal: 24,
    gap: 12,
    width: "100%",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  googleButtonDisabled: {
    opacity: 0.5,
  },
  googleButtonPressed: {
    backgroundColor: "#F8F9FA",
  },
  googleIconWrapper: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#4285F4",
    justifyContent: "center",
    alignItems: "center",
  },
  googleIconText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },
  googleButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#3C4043",
  },
  disclaimer: {
    fontSize: 12,
    color: "#9AA0A6",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 18,
  },

  // Perfil
  profileScroll: {
    padding: 24,
    alignItems: "center",
    gap: 20,
  },
  profileHeader: {
    alignItems: "center",
    gap: 8,
    paddingVertical: 24,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 8,
    borderWidth: 3,
    borderColor: "#4285F4",
  },
  avatarPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#4285F4",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  avatarInitial: {
    fontSize: 40,
    fontWeight: "700",
    color: "#fff",
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#202124",
  },
  userEmail: {
    fontSize: 15,
    color: "#5F6368",
  },
  verifiedBadge: {
    backgroundColor: "#E6F4EA",
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginTop: 4,
  },
  verifiedText: {
    color: "#1E8E3E",
    fontSize: 13,
    fontWeight: "600",
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    gap: 4,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F3F4",
  },
  infoLabel: {
    fontSize: 14,
    color: "#5F6368",
    fontWeight: "500",
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: "#202124",
    flex: 2,
    textAlign: "right",
  },
  infoValueMono: {
    fontFamily: "monospace",
    fontSize: 11,
    color: "#80868B",
  },
  signOutButton: {
    backgroundColor: "#D93025",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 32,
    width: "100%",
    alignItems: "center",
  },
  signOutButtonPressed: {
    backgroundColor: "#B31412",
  },
  signOutText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
});

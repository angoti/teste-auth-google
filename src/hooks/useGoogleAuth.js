import { useState, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

const WEB_CLIENT_ID = "590651125899-be41cpqrcle02ld2f0k8u8uvfek48ip6.apps.googleusercontent.com";

export function useGoogleAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ↓ força o uso do proxy auth.expo.io
  const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
  console.log("URI de redirecionamento (useGoogleAuth):", redirectUri);

  const [request, response, promptAsync] = Google.useAuthRequest(
    { clientId: WEB_CLIENT_ID },
    { useProxy: true }, // ← segundo argumento obrigatório
  );

  useEffect(() => {
    if (response?.type === "success") {
      fetchUserInfo(response.authentication.accessToken);
    } else if (response?.type === "error") {
      setError("Erro durante a autenticação com o Google.");
      setLoading(false);
    } else if (response?.type === "cancel") {
      setLoading(false);
    }
  }, [response]);

  async function fetchUserInfo(token) {
    try {
      setLoading(true);
      const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Falha ao buscar dados do usuário.");
      setUser(await res.json());
      setError(null);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function signIn() {
    setError(null);
    setLoading(true);
    promptAsync({ useProxy: true }); // ← também aqui
  }

  function signOut() {
    setUser(null);
    setError(null);
  }

  return { user, loading, error, request, signIn, signOut };
}

import { useState, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

export function useGoogleAuth() {
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "590651125899-be41cpqrcle02ld2f0k8u8uvfek48ip6.apps.googleusercontent.com.apps.googleusercontent.com",
    // androidClientId: 'SEU_ANDROID_CLIENT_ID',
    // iosClientId: 'SEU_IOS_CLIENT_ID',
  });

  useEffect(() => {
    if (response?.type === "success") {
      fetchUserInfo(response.authentication.accessToken);
    }
  }, [response]);

  async function fetchUserInfo(token) {
    const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setUserInfo(data);
  }

  return { userInfo, request, promptAsync };
}

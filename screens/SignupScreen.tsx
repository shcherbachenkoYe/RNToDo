import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";

interface LoginCredentials {
  email: string;
  password: string;
}

const SignupScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  const signupHandler = async ({ email, password }: LoginCredentials) => {
    setIsAuthenticating(true);

    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert("Error", "Can't sign in");
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message={"Creating user..."} />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
};

export default SignupScreen;

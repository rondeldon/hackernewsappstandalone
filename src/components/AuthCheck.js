import React, { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { loginRequest } from "./AuthConfig";

export const AuthCheck = ({ children }) => {
    const { instance, accounts, inProgress } = useMsal();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const attemptSilentAuth = async () => {
            if (accounts.length > 0) {
                try {
                    await instance.acquireTokenSilent({
                        ...loginRequest,
                        account: accounts[0]
                    });
                    setIsAuthenticated(true);
                } catch (error) {
                    if (error instanceof InteractionRequiredAuthError) {
                        // Silent token acquisition fails, fall back to interactive method
                        try {
                            await instance.acquireTokenRedirect(loginRequest);
                        } catch (redirectError) {
                            console.error(redirectError);
                        }
                    } else {
                        console.error(error);
                    }
                }
            } else if (inProgress === "none") {
                // No accounts found, initiate login
                instance.loginRedirect(loginRequest).catch(e => {
                    console.error(e);
                });
            }
        };

        attemptSilentAuth();
    }, [instance, accounts, inProgress]);

    if (inProgress !== "none") {
        return <div>Authentication in progress...</div>;
    }

    return isAuthenticated ? children : <div>Authenticating...</div>;
};
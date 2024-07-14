export const msalConfig = {
    auth: {
        clientId: "8da5bacc-fa67-4b80-9f80-f49b5fb3a40f",
        authority: "https://login.microsoftonline.com/05079e4c-6169-4ad3-8adb-ce8180c2208d",
        redirectUri: "https://ambitious-desert-0ed06800f.4.azurestaticapps.net/", 
        /* "http://localhost:3000", */
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: true,
    }
};

export const loginRequest = {
    scopes: ["User.Read"]
};

export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};
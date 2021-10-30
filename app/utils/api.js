import * as firebase from "firebase";

export function reauthenticate(password) {
    const user = firebase.auth().currentUser;  // para tener el usuario actual
    const credentials = firebase.auth.EmailAuthProvider.credential(
        user.email,
        password
    );

    return user.reauthenticateWithCredential(credentials);
}
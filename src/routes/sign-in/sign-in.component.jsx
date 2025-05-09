import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup(); //const response = 
        // console.log(response);
        console.log(user)
        const userDocRef = await createUserDocumentFromAuth(user) // (response.user)
    }

    return (
        <div>
            <h1>Sign in page</h1>
            <button onClick={logGoogleUser}>
                Sign In With Google Popup
            </button>
        </div>
    )
};

export default SignIn;
import 'firebase/messaging'
import firebase from 'firebase/app'
import localforage from 'localforage'
import { getMessaging } from "firebase/messaging";

const firebaseCloudMessaging = {
	//checking whether token is available in indexed DB
	tokenInlocalforage: async () => {
		return localforage.getItem('fcm_token')
	},
	//initializing firebase app
	init: async function () {
		firebase.initializeApp({
			apiKey: "AIzaSyATeL3Ul0gDFlg5UM0Iw3Z5B_WPlt7UekA",
			authDomain: "pwa-notification-33a7b.firebaseapp.com",
			projectId: "pwa-notification-33a7b",
			storageBucket: "pwa-notification-33a7b.appspot.com",
			messagingSenderId: "920914941227",
			appId: "1:920914941227:web:f8190ebc2314642f76e16e",
			measurementId: "G-EZJTCK8LBK"
		})

		try {
			const messaging = getMessaging(app);
			const tokenInLocalForage = await this.tokenInlocalforage()
			//if FCM token is already there just return the token
			if (tokenInLocalForage !== null) {
				return tokenInLocalForage
			}
			//requesting notification permission from browser
			const status = await Notification.requestPermission()
			if (status && status === 'granted') {
				//getting token from FCM
				const fcm_token = await messaging.getToken({
					vapidKey: 'BNTEuAFUQHiLHKUudu11KDRFolteaeFfDVjvGxFou7p963f3NOXvqz-LHNx3aRoI5QsBYY-UPMrerbCpLREUCGg'
				})
				if (fcm_token) {
					//setting FCM token in indexed db using localforage
					localforage.setItem('fcm_token', fcm_token)
					console.log('fcm token', fcm_token)
					//return the FCM token after saving it
					return fcm_token
				}
			}
		} catch (error) {
			console.error(error)
			return null
		}
	}
}
export { firebaseCloudMessaging }

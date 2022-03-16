import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import Meta from '@/components/meta'
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { initializeApp } from 'firebase/app'
import { useEffect } from 'react';
import AppIcon from '../public/images/icon-192.png'



const App = ({ Component, pageProps }: AppProps) => {
	// Get registration token. Initially this makes a network call, once retrieved
	// subsequent calls to getToken will return from cache.

	const isSupported = () => {
		if (typeof window !== "undefined") {
			return 'Notification' in window &&
				'serviceWorker' in navigator &&
				'PushManager' in window
		}
	}

	const app = initializeApp({
		apiKey: "AIzaSyATeL3Ul0gDFlg5UM0Iw3Z5B_WPlt7UekA",
		authDomain: "pwa-notification-33a7b.firebaseapp.com",
		projectId: "pwa-notification-33a7b",
		storageBucket: "pwa-notification-33a7b.appspot.com",
		messagingSenderId: "920914941227",
		appId: "1:920914941227:web:f8190ebc2314642f76e16e",
		measurementId: "G-EZJTCK8LBK"
	})

	async function displayNotification(notify: string, option?: NotificationOptions) {
		if (isSupported()) {
			if (Notification.permission == 'granted') {
				const reg = await navigator.serviceWorker.getRegistration() as ServiceWorkerRegistration
				reg.showNotification(notify, option);
			}
		}
	}


	if (isSupported()) {
		const messaging = getMessaging(app);
		onMessage(messaging, (payload) => {
			console.log('Message received. ', payload);
			displayNotification(
				payload.notification?.title as string,
				{
					image: payload.notification?.image,
					body: payload.notification?.body,
					data: payload.data,
					badge: AppIcon.src
				}
			)
		});
	}

	useEffect(() => {
		if (isSupported()) {
			if (typeof window !== 'undefined') {
				Notification.requestPermission()
			}
		}
	}, [])


	useEffect(() => {
		if (isSupported()) {
			if (typeof window !== "undefined") {
				// displayNotification("ini notif", {
				// 	body: "gatau ini apa",
				// 	icon: "/images/favicon.png"
				// })
				const messaging = getMessaging(app);


				getToken(messaging)
					.then((currentToken) => {
						if (currentToken) {
							console.log("token:", currentToken);
						} else {
							console.log('No registration token available. Request permission to generate one.');
						}
					})
					.catch((err) => {
						console.log('An error occurred while retrieving token. ', err);
					});
			}
		}

	}, [app])

	return (
		<ThemeProvider
			attribute='class'
			defaultTheme='system'
			disableTransitionOnChange
		>
			<Meta />
			<Component {...pageProps} />
		</ThemeProvider>
	)
}

export default App

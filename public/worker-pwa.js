/* curl -X POST \
	--header "Authorization: key=AAAA1mrO1Ss:APA91bEbJG6MDR1N1m_MXJlVsSnXeZDEtBw6HQ7mlVJj0fHZzsuAxMU1FHsLA-PljQ4irCcw8awVr83QskC6mXhiMtYK94a8rjCR3CZCB4pCi8u8htPazuoPpUi46uh-cEAA503Jqxp4" \
	--Header "Content-Type:application/json" https://fcm.googleapis.com/fcm/send \
	-d "{\"to\":\"ftNQTdCWHEk:APA91bFkAp3T_8xtAPr2MWcnZOUN_2B6Uhe74oMD8xGtYgzZ9lsm7S4S6dTWY_YmnjO5Wo7auTtIkTtb0XBqQNrHoYdnbBIGYZMZQbB4gvrLUs49m9jCYveWzMpBwIhIV5QHkriomgVX\",\"data\":{\"notification\":{\"body\":\"Are you coming to our party?\",\"title\":\"This is a tester tester\",\"confirm\":\"https://developers.google.com/web/\",\"decline\":\"https://www.yahoo.com/\"}},\"priority\":10}" */

// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
/**
 * import firebase
 * import firebase message
 */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

/**
 * Initialize the Firebase app in the service worker by passing in the
 * [messagingSenderId]
 */

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import localforage from "localforage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyATeL3Ul0gDFlg5UM0Iw3Z5B_WPlt7UekA",
	authDomain: "pwa-notification-33a7b.firebaseapp.com",
	projectId: "pwa-notification-33a7b",
	storageBucket: "pwa-notification-33a7b.appspot.com",
	messagingSenderId: "920914941227",
	appId: "1:920914941227:web:f8190ebc2314642f76e16e",
	measurementId: "G-EZJTCK8LBK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);


// firebase.initializeApp({
// 	'messagingSenderId': ''
// });

/**
 * define message const
 */

const messaging = app.messaging();
/**
 * --- Installs service worker ---
 */

self.addEventListener('install', (event) => {
	console.log('Service worker installed');
});

/**
 * --- user click notification ---
 * --- get notification object ---
 * use event.notification.data
 */

self.addEventListener('notificationclick', (event) => {
	// Event actions derived from event.notification.data from data received
	var eventURL = event.notification.data;
	event.notification.close();
	if (event.action === 'confirmAttendance') {
		clients.openWindow(eventURL.confirm);
	} else if (event.action === 'cancel') {
		clients.openWindow(eventURL.decline);
	} else {
		clients.openWindow(eventURL.open);
	}
}, false);

self.addEventListener('fetch', function (event) {
	if (event.request.url === new URL('/', location).href) {
		event.respondWith(
			new Response("<h1>Hello!</h1>", {
				headers: { 'Content-Type': 'text/html' }
			})
		)
	}
});

/**
 * --- received message(Background) ---
 * [CUSTOM] dont put notification element in payload
 * --- payload must be like this ---
 * payload : {
 *  data: {
 *    ...
 *    notification: {
 *      title: ''
 *      body: ''
 *    }
 *    ...
 *  }
 * }
 */

messaging.getToken({
	vapidKey: 'BNTEuAFUQHiLHKUudu11KDRFolteaeFfDVjvGxFou7p963f3NOXvqz-LHNx3aRoI5QsBYY-UPMrerbCpLREUCGg'
})

messaging.setBackgroundMessageHandler((payload) => {
	let data = JSON.parse(payload.data.custom_notification);
	let notificationTitle = data.title;
	let notificationOptions = {
		body: data.body,
		icon: 'https://image.flaticon.com/icons/png/128/107/107822.png',
		// options event
		actions: [
			{ action: 'confirmAttendance', title: '👍 Confirm attendance' },
			{ action: 'cancel', title: '👎 Not coming' }
		],
		// For additional data to be sent to event listeners, needs to be set in this data {}
		data: { confirm: data.confirm, decline: data.decline, open: data.open }
	};

	return self.registration.showNotification(notificationTitle, notificationOptions);
});


messaging
	.requestPermission()
	.then(() => {
		message.innerHTML = "Notifications allowed";
		return messaging.getToken();
	})
	.then(token => {
		tokenString.innerHTML = "Token Is : " + token;
	})
	.catch(err => {
		errorMessage.innerHTML = errorMessage.innerHTML + "; " + err;
		console.log("No permission to send push", err);
	});

//background notifications will be received here
messaging.setBackgroundMessageHandler(function (payload) {
	console.log('[firebase-messaging-sw.js] Received background message ', payload)
	// Customize notification here
	const notificationTitle = 'Background Message Title'
	const notificationOptions = {
		body: 'Background Message body.',
		icon: '/firebase-logo.png'
	}

	return self.registration.showNotification(notificationTitle, notificationOptions)
})

messaging.onBackgroundMessage(function (payload) {
	console.log('[firebase-messaging-sw.js] Received background message ', payload)
	const notificationTitle = 'Background Message Title'
	const notificationOptions = {
		body: 'Background Message body.',
		icon: '/firebase-logo.png'
	}

	return self.registration.showNotification(notificationTitle, notificationOptions)
})


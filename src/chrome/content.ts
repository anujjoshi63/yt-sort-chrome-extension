import { ChromeMessage, Sender } from '../types';

const messagesFromReactAppListener = (
	message: ChromeMessage,
	// @ts-ignore
	sender,
	// @ts-ignore
	response
) => {
	console.log('[content.js]. Message received', {
		message,
		sender
	});

	if (
		sender.id === chrome.runtime.id &&
		message.from === Sender.React &&
		message.message === 'Hello from React'
	) {
		// const videos = [
		// 	// @ts-ignore
		// 	...new Array(
		// 		document.querySelector(
		// 			' #contents.style-scope ytd-playlist-video-list-renderer #contents'
		// 		)!.children
		// 	)[0]
		// ]
		// 	// @ts-ignore
		// 	.sort(
		// 		(a, b) =>
		// 			a.__data.data.lengthSeconds - b.__data.data.lengthSeconds
		// 	)
		// 	.map(el => {
		// 		// @ts-ignore
		// 		el = el.__data.data;
		// 		let newObj: any = {};
		// 		// @ts-ignore
		// 		newObj.videoId = el.videoId;
		// 		// @ts-ignore
		// 		newObj.thumbnail = el.thumbnail.thumbnails[0].url;
		// 		// @ts-ignore
		// 		newObj.time = el.lengthText.simpleText;
		// 		// @ts-ignore
		// 		newObj.title = el.title.runs[0].text;
		// 		// @ts-ignore
		// 		newObj.author = el.shortBylineText.runs[0].text;
		// 		return newObj;
		// 	});
		// response(JSON.stringify(videos));
		response('hey');
	}

	if (
		sender.id === chrome.runtime.id &&
		message.from === Sender.React &&
		message.message === 'delete logo'
	) {
		// console.log(
		// 	// @ts-ignore
		// 	document.querySelector(
		// 		' #contents.style-scope ytd-playlist-video-list-renderer #contents'
		// 	)!.children[0] // @ts-ignore
		// 	// .map(el => {
		// 	// 	// @ts-ignore
		// 	// 	el = el.__data.data;
		// 	// 	let newObj: any = {};
		// 	// 	// @ts-ignore
		// 	// 	newObj.videoId = el.videoId;
		// 	// 	// @ts-ignore
		// 	// 	newObj.thumbnail = el.thumbnail.thumbnails[0].url;
		// 	// 	// @ts-ignore
		// 	// 	newObj.time = el.lengthText.simpleText;
		// 	// 	// @ts-ignore
		// 	// 	newObj.title = el.title.runs[0].text;
		// 	// 	// @ts-ignore
		// 	// 	newObj.author = el.shortBylineText.runs[0].text;
		// 	// 	return newObj;
		// 	// })
		// );
		response('AA');
		//
		// TRY MAPPING BRO INSTEAD OF SENDING DOM ELEMENTS SEND JS OBJECTS
		//
		// response(
		// 	JSON.stringify(
		// 		// @ts-ignore
		// 		...new Array(
		// 			document.querySelector(
		// 				' #contents.style-scope ytd-playlist-video-list-renderer #contents'
		// 			)!.children
		// 		)[0]
		// 	)
		// );
	}
};
const test = (...props: any) => {
	console.log({ props });
	window.scrollTo(
		0,
		document.querySelector(
			' #contents.style-scope ytd-playlist-video-list-renderer #contents'
		)!.scrollHeight
	);
	let x = [
		...document.querySelector(
			' #contents.style-scope ytd-playlist-video-list-renderer #contents'
		)!.children
	];
	let modX = x.map((el, ind) => {
		let text =
			el.childNodes[3].childNodes[1].childNodes[1].childNodes[1]
				.childNodes[5].childNodes[0];
		// @ts-ignore
		if (!text.childNodes[2]?.innerText)
			// @ts-ignore
			text = text.parentNode.childNodes[2].children[1].innerText;
		// @ts-ignore
		else text = text.childNodes[2].innerText;
		// console.log(text);
		let thumbnail =
			el.children[1].children[0].children[0].children[0].children[1] // @ts-ignore
				.children[0].src;
		thumbnail =
			thumbnail.trim() == ''
				? 'https://via.placeholder.com/300x200'
				: thumbnail.trim();
		return {
			title:
			el.children[1].children[0].children[1].children[0].children[1]
			// @ts-ignore
					.innerText,
			thumbnail,

			author:
				// @ts-ignore
				el.children[1].children[0].children[1].children[1].innerText,
			time: text || 'NONE'
		};
	});

	// for (let k of x) {
	// 	// @ts-ignore
	// 	console.log(k);
	// }
	props[2](JSON.stringify(modX));
};
/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(test);

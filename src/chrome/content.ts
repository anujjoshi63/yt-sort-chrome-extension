import { ChromeMessage } from '../types';

const test = (...props: any) => {
	// console.log({ props });
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
	let modX = x.map((el: any, ind) => {
		let text: any =
			el.childNodes[3].childNodes[1].childNodes[1].childNodes[1]
				.childNodes[5].childNodes[0];
		if (!text.childNodes[2]?.innerText)
			text = text.parentNode.childNodes[2].children[1].innerText;
		else text = text.childNodes[2].innerText;

		let lengthFactor = text.split(':').length;
		let modText = text.split(':');
		let seconds = 0;
		if (lengthFactor === 1) {
			seconds = parseInt(modText[0]);
		} else if (lengthFactor === 2) {
			seconds = parseInt(modText[0]) * 60 + parseInt(modText[1]);
		} else if (lengthFactor === 3) {
			seconds =
				parseInt(modText[0]) * 60 * 60 +
				parseInt(modText[1]) * 60 +
				parseInt(modText[2]);
		}

		let thumbnail =
			el.children[1].children[0].children[0].children[0].children[1]
				.children[0].src;
		thumbnail =
			thumbnail.trim() === ''
				? 'https://via.placeholder.com/168x94'
				: thumbnail.trim();
		let title =
			el.children[1].children[0].children[1].children[0].children[1]
				.innerText;
		return {
			title,
			thumbnail,
			url: el.childNodes[3].childNodes[1].childNodes[1].childNodes[1]
				.href,
			author: el.children[1].children[0].children[1].children[1]
				.innerText,
			time: text || 'NONE',
			seconds
		};
	});

	props[2](JSON.stringify(modX));
};
/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(test);

import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { ChromeMessage, Sender } from './types';

import './App.css';

const App = () => {
	const [responseFromContent, setResponseFromContent] = useState<string>('');
	const [list, setList] = useState([
		{
			title: 'MS In US| Application Timeline| Documents, Deadlines and When to take Exams|',
			thumbnail:
				'https://i.ytimg.com/vi/gZYZc7BSLoM/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLAr-SYN73a8Fwi2cZ8_2heDMVJ9pA',
			author: 'Nachi Talks',
			time: '10:02'
		},
		{
			title: 'Evolution of DevOps With @Rawkode Academy',
			thumbnail:
				'https://i.ytimg.com/vi/2kROABaJrks/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLBDrAAclf2O4jGI-Zan1Z_Mcr-gfA',
			author: 'Kunal Kushwaha',
			time: '33:56'
		},
		{
			title: 'How To Shortlist Universities for Masters Abroad| Complete Walk Through|',
			thumbnail:
				'https://i.ytimg.com/vi/WJHqSfDnlR8/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLByCjMx1ygZ3Mfv1mKOG1k7VE3sqg',
			author: 'Nachi Talks',
			time: '17:26'
		},
		{
			title: 'checking out deno + fresh, learning golang | neovim, tmux',
			thumbnail:
				'https://i.ytimg.com/vi/3b_eBAjuD_0/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLC-k-s07P-jPO8fJk3SqpK4D7Egdg',
			author: 'Sean Walker',
			time: '1:11:40'
		},
		{
			title: 'Ryan Carniato on Solid.js, Jarred Sumner on Bun, & Alex Cole on e2e Reactivity',
			thumbnail:
				'https://i.ytimg.com/vi/qpAkYk1LK-U/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCUAwQvMXggiRAko_opbktYXrCBTQ',
			author: 'Real World React',
			time: '1:29:25'
		},
		{
			title: 'Full Stack Invoice App Using Next js & MongoDB Atlas Tutorial | Next js Project',
			thumbnail:
				'https://i.ytimg.com/vi/hNczF4zcu2Q/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCRRgICvf5_A4eXZgnddbhXLNpULQ',
			author: 'Coding With Muhib',
			time: '3:05:24'
		}
	]);
	/**
	 * Get current URL
	 */
	useEffect(() => {
		const queryInfo = { active: true, lastFocusedWindow: true };

		chrome.tabs &&
			chrome.tabs.query(queryInfo, tabs => {
				const url = tabs[0].url;
				// @ts-ignore
				setUrl(url);
			});
	}, []);

	/**
	 * Send message to the content script
	 */

	const sendRemoveMessage = () => {
		const message: ChromeMessage = {
			from: Sender.React,
			message: 'get the list'
		};

		const queryInfo: chrome.tabs.QueryInfo = {
			active: true,
			currentWindow: true
		};

		chrome.tabs &&
			chrome.tabs.query(queryInfo, tabs => {
				const currentTabId = tabs[0].id;
				// @ts-ignore
				chrome.tabs.sendMessage(currentTabId, message, response => {
					try {
						let data = JSON.parse(response);
						console.log({ data });
						setList(data.sort());
						if (
							data.length > 0 &&
							// @ts-ignore
							data.some(el => el.thumbnail == '')
						) {
							setTimeout(sendRemoveMessage, 100);
						}
						setResponseFromContent('ASDASDDone!');
					} catch (e) {
						setTimeout(sendRemoveMessage, 100);
						console.log('error', e);
					}
				});
			});
	};

	return (
		<div>
			<button onClick={sendRemoveMessage} className="get-list-btn">
				🚀 Get list
			</button>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				{list.map((el: any) => (
					<div
						key={el.title}
						onClick={() => {
							// open google in new tab
							window.open(
								`https://www.youtube.com/watch?v=${el.time}`,
								'_blank'
							);
						}}
						className="card"
					>
						<img src={el.thumbnail} />
						<div style={{ padding: '1rem' }}>
							<p>{el.title}</p>
							<div style={{ marginTop: '1rem' }}>
								<i>
									<span>{el.author}</span>
								</i>
								<span
									style={{
										position: 'absolute',
										right: '1rem'
									}}
								>
									{el.time}
								</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
export default App;

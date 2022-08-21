import { useState } from 'react';
import { ChromeMessage, Sender } from './types';

import './App.css';

const App = () => {
	const [list, setList] = useState([
		{
			title: 'Click the get list button when ready :)',
			thumbnail: 'https://via.placeholder.com/168x94',
			author: '...',
			time: '...',
			seconds: 100
		}
	]);

	/**
	 * Send message to the content script
	 */
	const sendRemoveMessage = () => {
		setList([
			{
				title: 'Loading...',
				thumbnail: 'https://via.placeholder.com/168x94',
				author: '...',
				time: '...',
				seconds: 0
			}
		]);
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
				const currentTabId = Number(tabs[0].id);
				chrome.tabs.sendMessage(currentTabId, message, response => {
					try {
						let data = JSON.parse(response);
						setList(data.sort());
						if (
							data.length > 0 &&
							data.some((el: any) => el.thumbnail === '')
						) {
							setTimeout(sendRemoveMessage, 200);
						}
					} catch (e) {
						setTimeout(sendRemoveMessage, 200);
						console.log('error', e);
					}
				});
			});
	};

	return (
		<>
			<button onClick={sendRemoveMessage} className="get-list-btn">
				🚀 Get list
			</button>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				{list
					.sort((a, b) => a.seconds - b.seconds)
					.map((el: any) => (
						<div
							key={el.title}
							onClick={() => {
								window.open(el.url, '_blank');
							}}
							className="card"
						>
							<img src={el.thumbnail} alt={'video thumbnail'} />
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
		</>
	);
};
export default App;

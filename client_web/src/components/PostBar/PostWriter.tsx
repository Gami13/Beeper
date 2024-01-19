import { IconPhotoPlus, IconTrash } from '@tabler/icons-solidjs';
import { A } from '@solidjs/router';
import style from './PostBar.module.css';
import { For, createResource, createSignal, onMount } from 'solid-js';
import { API_URL, CDN_URL } from '@/constants';
import { useAppState } from '@/AppState';
import Fallback from '@/fallback.png';
import { t } from '@/Translation';
type PostWriterProps = {
	quoteOf?: string;
	replyTo?: string;
};
export default function PostWriter(props: PostWriterProps) {
	const [files, setFiles] = createSignal<File[]>([]);
	const [text, setText] = createSignal('');
	const AppState = useAppState();
	const [userAvatar, userAvatarActions] = createResource(() => {
		return CDN_URL + AppState.userAvatar();
	});
	onMount(() => {
		console.log(AppState.userAvatar());
	});

	console.log(AppState.userAvatar());
	return (
		<div class={style.postTemplate}>
			{/* <object class={style.avatar} data={Fallback} type="image/png"> */}
			<img src={userAvatar()} alt="TEMP" />
			{/* </object> */}
			<div class={style.post}>
				<div
					class={style.post_text}
					role="textbox"
					contentEditable="plaintext-only"
					onfocus={(e) => {
						if (e.currentTarget.innerText == t.posts.whatsHappening()) e.currentTarget.innerText = '';
						e.currentTarget.style.color = 'white';
					}}
					onblur={(e) => {
						if (e.currentTarget.innerText == '') {
							e.currentTarget.innerText = t.posts.whatsHappening();
							e.currentTarget.style.color = 'var(--text2)';
						}
					}}
					oninput={(e) => {
						setText(e.currentTarget.innerText);

						e.currentTarget.style.height = 'auto';

						e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';

						console.log(text());
					}}
					onpaste={(e) => {
						if (e.clipboardData && e.clipboardData.files.length > 0) {
							e.preventDefault();
							console.log(e.clipboardData.files);
							for (let i = 0; i < e.clipboardData.files.length; i++) {
								let blob = e.clipboardData.files[i];
								setFiles((files) => [...files, blob]);
							}
						}
					}}
					innerText={t.posts.whatsHappening()}
				></div>
				<hr />
				<div class={style.post_buttons}>
					<button
						title="Add image"
						type="button"
						onclick={(e) => {
							e.preventDefault();
							document.getElementById('imgupload')?.click();
						}}
					>
						<IconPhotoPlus></IconPhotoPlus>
					</button>
					<input
						title="Add image"
						type="file"
						id="imgupload"
						style="display:none"
						multiple
						onchange={(e) => {
							console.log(e.currentTarget.files);
							if (e.currentTarget.files) {
								for (let i = 0; i < e.currentTarget.files.length; i++) {
									setFiles((files) => [...files, e.currentTarget.files![i]]);
								}
							}
						}}
					/>

					<button
						class={style.postButton}
						type="button"
						onclick={(e) => {
							e.preventDefault();
							//multiform fetch
							const formData = new FormData();
							formData.append('content', text());
							formData.append('quoteOf', props.quoteOf || '');
							formData.append('replyTo', props.replyTo || '');
							for (let i = 0; i < files().length; i++) {
								formData.append('files', files()[i]);
							}
							fetch(API_URL + '/post', {
								method: 'POST',
								body: formData,
								headers: {
									Authorization: `${AppState.userToken()}`,
								},
							}).then((res) => {
								if (res.ok) {
									res.json().then((data) => {
										console.log(data);
										setText('');
										setFiles([]);
									});
								}
							});
						}}
					>
						{t.posts.post()}
					</button>
				</div>
			</div>
			<ul>
				<For each={files()}>
					{(file) => {
						if (file.type.startsWith('image')) {
							return (
								<li>
									<button
										onClick={() => {
											setFiles((files) => files.filter((f) => f != file));
										}}
									>
										<IconTrash></IconTrash>
									</button>

									<img src={URL.createObjectURL(file)} alt="lol" />
								</li>
							);
						} else if (file.type.startsWith('video')) {
							return (
								<li>
									<button
										onClick={() => {
											setFiles((files) => files.filter((f) => f != file));
										}}
									>
										X
									</button>

									<video style="width: 50px; height:50px" src={URL.createObjectURL(file)} controls></video>
								</li>
							);
						}
					}}
				</For>
			</ul>
		</div>
	);
}
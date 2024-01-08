import {
	IconUpload,
	IconPhoto,
	IconBookmark,
	IconChartBar,
	IconHeart,
	IconRepeat,
	IconMessageCircle,
	IconDots,
} from '@tabler/icons-solidjs';
import { A } from '@solidjs/router';
import style from './PostBar.module.css';
import { createSignal } from 'solid-js';
import { CDN_URL } from '@/constants';
import { useAppState } from '@/AppState';

export default function PostBar() {
	const [text, setText] = createSignal('');
	const AppState = useAppState();
	return (
		<>
			<div class={style.content_header}>
				<button>For You</button>
				<button>Following</button>
			</div>
			<div class={style.postTemplate}>
				<object class={style.avatar} data="https://dummyimage.com/360x360/fc03d7.png?text=Avatar" type="image/png">
					<img src={`${CDN_URL}${AppState.userAvatar()}`} alt="TEMP" />
				</object>
				<div class={style.post}>
					<div
						class={style.post_text}
						role="textbox"
						contentEditable="plaintext-only"
						onfocus={(e) => {
							if (e.currentTarget.innerText == "What's happening?") e.currentTarget.innerText = '';
							e.currentTarget.style.color = 'white';
						}}
						onblur={(e) => {
							if (e.currentTarget.innerText == '') {
								e.currentTarget.innerText = "What's happening?";
								e.currentTarget.style.color = 'var(--text2)';
							}
						}}
						oninput={(e) => {
							setText(e.currentTarget.innerText);

							e.currentTarget.style.height = 'auto';

							e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';

							console.log(text());
						}}
						innerText={"What's happening?"}
					></div>
					<hr />
					<div class={style.post_buttons}>
						<IconPhoto></IconPhoto>

						<button class={style.postButton} type="button">
							Post
						</button>
					</div>
				</div>
			</div>
			<div class={style.posts}>
				<div class={style.post}>
					<object class={style.avatar} data="https://dummyimage.com/360x360/fc03d7.png?text=Avatar" type="image/png">
						<img src={`${CDN_URL}${AppState.userAvatar()}`} alt="TEMP" />
					</object>
					<div class={style.postData}>
						<div class={style.userData}>
							<h4>username</h4> <h4>tag</h4> <h4>time</h4> <IconDots></IconDots>
						</div>
						<div class={style.postContent}>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio nesciunt animi enim veniam, dolor
								recusandae eligendi dolores obcaecati sit molestiae blanditiis veritatis assumenda placeat perspiciatis
								officiis molestias cumque at! Odio!
							</p>
							<object
								class={style.avatar}
								data="https://dummyimage.com/360x360/fc03d7.png?text=Avatar"
								type="image/png"
							>
								<img src={`${CDN_URL}${AppState.userAvatar()}`} alt="TEMP" />
							</object>
						</div>
						<div class={style.postButtons}>
							<button title="coment">
								<IconMessageCircle></IconMessageCircle>
								XXX
							</button>
							<button title="repost">
								<IconRepeat></IconRepeat>
								XXX
							</button>
							<button title="like">
								<IconHeart></IconHeart>
								XXX
							</button>
							<button title="view">
								<IconChartBar></IconChartBar>
								XXX
							</button>

							<button title="bookmark">
								<IconBookmark></IconBookmark>
							</button>
							<button title="upload">
								<IconUpload></IconUpload>
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

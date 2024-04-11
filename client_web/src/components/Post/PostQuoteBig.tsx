import { timeSince } from "@/Translation";
import type { Post as PostType, User } from "@/types/internal";
import stylex from "@stylexjs/stylex";
import { Show } from "solid-js";
import { AttachmentList } from "./AttachmentList";
import { colors } from "../../variables.stylex";
//! Post is safe to be asserted as defined
const styles = stylex.create({
	post: {
		width: "100%",
		height: "fit-content",
		color: colors.text900,
		display: "flex",
		backgroundColor: colors.background100,
		padding: "0.5em",
		paddingTop: "0.75em",
		paddingBottom: "0em",
		borderRadius: "1em",
		flexDirection: "column",
		gap: "0.4em",

		border: "1px solid",
		borderColor: colors.text300,
	},
	header: {
		gap: "0.5em",
		display: "flex",
		alignItems: "center",
		paddingHorizontal: "0.5em",
	},
	avatar: {
		flexShrink: 0,
		width: "2em",
		height: "2em",
		borderRadius: "50%",
		aspectRatio: "1/1",
	},
	names: {
		display: "flex",
		gap: "0.1em",
		flexDirection: "column",
		justifyContent: "center",
	},
	username: {
		fontSize: "0.7em",
		color: colors.text500,
		fontWeight: 500,
	},
	time: {
		fontSize: "0.7em",
		color: colors.text500,
		height: "2.3em",
		display: "flex",
		justifyContent: "center",
		alignItems: "flex-start",
	},
	displayName: {
		fontSize: "0.8em",
	},
	content: {
		// paddingHorizontal: "0.5em",
		fontSize: "0.9em",
	},
	// attachments: {
	// 	paddingHorizontal: "0.5em",
	// },
	main: {
		display: "flex",
		flexDirection: "column",
		gap: "0.5em",
		paddingHorizontal: "0.5em",
	},
});
export function PostQuoteBig(props: { post: PostType }) {
	props.post.author = props.post.author as User;
	return (
		<article {...stylex.attrs(styles.post)}>
			<header {...stylex.attrs(styles.header)}>
				<img
					{...stylex.attrs(styles.avatar)}
					src={props.post.author.avatar}
					alt={props.post.author.displayName}
				/>
				<section {...stylex.attrs(styles.names)}>
					<h2 {...stylex.attrs(styles.displayName)}>
						{props.post.author.displayName}
					</h2>
					<h3 {...stylex.attrs(styles.username)}>
						@{props.post.author.username}
					</h3>
				</section>
				<time {...stylex.attrs(styles.time)}>
					○ {timeSince(props.post.timePosted)}
				</time>
			</header>
			<main {...stylex.attrs(styles.main)}>
				<p {...stylex.attrs(styles.content)}>{props.post.content}</p>
				<Show when={props.post.attachments.length > 0}>
					<AttachmentList attachments={props.post.attachments} />
				</Show>
			</main>
		</article>
	);
}

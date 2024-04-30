import { colors, transitions } from "../../variables.stylex";
import stylex from "@stylexjs/stylex";
import { A } from "@solidjs/router";
import type { TbBeach } from "solid-icons/tb";

const styles = stylex.create({
	navElement: {
		fontSize: "1em",
		display: "flex",
		width: "100%",
		justifyContent: "flex-start",
		alignItems: "center",
		color: colors.text950,
		textDecoration: "none",
		gap: "1em",
		height: "100%",
		backgroundColor: {
			":hover": colors.background100,
		},

		transitionDuration: transitions.duration,
		transitionTimingFunction: transitions.timing,
		padding: "1.0em",
		borderRadius: "12em",
	},
	navElementWrapper: {
		display: "flex",
		flexDirection: "column",
	},
	navElementIcon: {
		height: "1.75em",
		width: "1.75em",
		margin: 0,
		fontSize: "1.2em",
	},
	navElementText: {
		fontSize: "1.75em",
		fontWeight: 500,
		whiteSpace: "nowrap",
		overflowX: "hidden",
	},
});

export function NavigationListLink(props: {
	Icon: typeof TbBeach;
	text: string;
	href: string;
}) {
	//assert props.Icon is a jsx element

	return (
		<li {...stylex.attrs(styles.navElementWrapper)}>
			<A {...stylex.attrs(styles.navElement)} href={props.href}>
				{/* YES IT CAN SHUT UP */}
				<props.Icon {...stylex.attrs(styles.navElementIcon)} />
				<span {...stylex.attrs(styles.navElementText)}>{props.text}</span>
			</A>
		</li>
	);
}

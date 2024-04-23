import { colors } from "../../variables.stylex";
import stylex from "@stylexjs/stylex";
import { A } from "@solidjs/router";
import type { IconBell } from "@tabler/Icons-solidjs";
import { JSXElement } from "solid-js";

const styles = stylex.create({
	navElement: {
		fontSize: "1em",
		display: "flex",
		width: "100%",
		justifyContent: "flex-start",
		alignItems: "center",
		color: colors.text900,
		textDecoration: "none",
		gap: "1em",
	},
	navElementWrapper: {
		display: "flex",
		flexDirection: "column",
	},
	navElementIcon: {
		height: "2em",
		width: "2em",
		margin: 0,
		fontSize: "1.2em",
	},
	navElementText: {
		fontSize: "2em",
		fontWeight: 500,
	},
});
// Icon can be used as jsx component
type IconType = typeof IconBell;

export function NavigationListElement(props: {
	Icon: IconType;
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

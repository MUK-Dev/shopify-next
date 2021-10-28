import React, { FC } from "react";
import Link from "next/link";

import { Container } from "@components/ui";
import s from "./Navbar.module.css";
import { Usernav } from "..";

const Navbar: FC = () => {
	return (
		<Container>
			<div className={s.root}>
				<div className={s.rootInner}>
					<h1>
						<Link href="/">
							<a className={s.logo}>NEXT_STORE</a>
						</Link>
					</h1>
					<nav>
						<Link href="/">
							<a className={s.link}>All</a>
						</Link>
						<Link href="/">
							<a className={s.link}>Clothes</a>
						</Link>
						<Link href="/">
							<a className={s.link}>Accesories</a>
						</Link>
						<Link href="/">
							<a className={s.link}>Shoes</a>
						</Link>
					</nav>
					<div className={s.usernav}>
						<Usernav />
					</div>
				</div>
			</div>
		</Container>
	);
};

export default Navbar;

import {
	ButtonHTMLAttributes,
	ComponentType,
	FC,
	HTMLAttributes,
	ReactNode,
} from "react";
// import { LoadingDots } from "@components/ui"
import s from "./Button.module.css";
import cn from "classnames";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode | ReactNode[];
	isLoading?: boolean;
	Component?: string | ComponentType<HTMLAttributes<HTMLElement>>;
	href?: string;
}

const Button: FC<Props> = ({
	children,
	className,
	isLoading = false,
	Component = "button",
	...rest
}) => {
	const rootClassName = cn(s.root, className, {
		[s.loading]: isLoading,
	});

	return (
		<button type="button" className={cn(s.root, className)} {...rest}>
			{children}
			{/* { isLoading &&
        <i className="pl-2 m-0 flex">
          <LoadingDots />
        </i>
      } */}
		</button>
	);
};

export default Button;

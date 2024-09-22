import type React from "react";
import type { PropsWithChildren } from "react";
import BottomNavigationItem from "./BottomNavigationItem";

type BottomNavigationType = typeof BottomNavigation & {
	Item: React.JSX.Element;
};

function BottomNavigation({ children }: PropsWithChildren) {
	return (
		<div className="sticky bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
			<div className="grid h-full max-w-lg grid-cols-3 mx-auto">{children}</div>
		</div>
	);
}

BottomNavigation.Item = BottomNavigationItem;

export default BottomNavigation as BottomNavigationType;

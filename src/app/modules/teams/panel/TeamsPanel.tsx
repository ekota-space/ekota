import React from "react";
import TeamsModalButton from "./TeamsModalButton";
import TeamsList from "./TeamsList";

export default function TeamsPanel() {
	return (
		<aside className="p-2">
			<TeamsModalButton />
			<TeamsList />
		</aside>
	);
}

"use client";

import { Button, Modal } from "flowbite-react";
import React from "react";
import { FaPlus } from "react-icons/fa6";
import TeamsForm from "./TeamsForm";

function TeamsModalButton() {
	const [openModal, setOpenModal] = React.useState(false);

	return (
		<>
			<Button size="sm" fullSized onClick={() => setOpenModal(true)}>
				<FaPlus className="mr-2 h-5 w-5" />
				New Team
			</Button>
			<Modal show={openModal} onClose={() => setOpenModal(false)}>
				<Modal.Header>New team</Modal.Header>
				<Modal.Body>
					<TeamsForm
						onSubmitted={() => {
							setOpenModal(false);
						}}
					/>
				</Modal.Body>
			</Modal>
		</>
	);
}

export default TeamsModalButton;

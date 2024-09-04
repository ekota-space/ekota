import React, { forwardRef, useState } from "react";
import TextFormInput from "./TextFormInput";
import { PiEyeClosedDuotone, PiEyeDuotone } from "react-icons/pi";
import { Button } from "flowbite-react";

const PasswordFormInput: typeof TextFormInput = forwardRef(
	function PasswordFormInput(props, ref) {
		const [hidden, setHidden] = useState(true);

		return (
			<TextFormInput
				{...props}
				ref={ref}
				type={hidden ? "password" : "text"}
				onCopy={(e) => e.preventDefault()}
        onCut={(e) => e.preventDefault()}
				rightIcon={() => {
					return (
						<Button
							type="button"
							color="transparent"
              className="w-5"
							onClick={() => setHidden(!hidden)}
						>
							{hidden ? <PiEyeDuotone /> : <PiEyeClosedDuotone />}
						</Button>
					);
				}}
			/>
		);
	},
);

export default PasswordFormInput;

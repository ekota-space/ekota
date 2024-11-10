import {
	TextField,
	TextFieldErrorMessage,
	TextFieldInput,
	TextFieldLabel,
	TextFieldTextArea,
} from "~/components/ui/text-field";
import { createSignal, type JSX, Show, splitProps } from "solid-js";
import { BsEye, BsEyeSlash } from "solid-icons/bs";

type TextFieldProps = {
	name: string;
	type: "text" | "email" | "tel" | "password" | "url" | "date";
	label?: string | undefined;
	placeholder?: string | undefined;
	value: string | undefined;
	error: string;
	multiline?: boolean | undefined;
	required?: boolean | undefined;
	disabled?: boolean | undefined;
	ref: (element: HTMLInputElement | HTMLTextAreaElement) => void;
	onInput: JSX.EventHandler<HTMLInputElement | HTMLTextAreaElement, InputEvent>;
	onChange: JSX.EventHandler<HTMLInputElement | HTMLTextAreaElement, Event>;
	onBlur: JSX.EventHandler<HTMLInputElement | HTMLTextAreaElement, FocusEvent>;
};

export function FormTextField(props: TextFieldProps) {
	const [rootProps, inputProps] = splitProps(
		props,
		["name", "value", "required", "disabled"],
		["placeholder", "ref", "onInput", "onChange", "onBlur"],
	);
	const [fieldType, setFieldType] = createSignal(props.type);

	const toggleType = () => {
		setFieldType(fieldType() === "password" ? "text" : "password");
	};
	return (
		<TextField
			{...rootProps}
			class="space-y-2"
			validationState={props.error ? "invalid" : "valid"}
		>
			<Show when={props.label}>
				<TextFieldLabel>{props.label}</TextFieldLabel>
			</Show>
			<Show
				when={props.multiline}
				fallback={
					<div class="relative">
						<TextFieldInput {...inputProps} type={fieldType()} />
						<Show when={props.type === "password"}>
							<span
								class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer select-none"
								onClick={toggleType}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										toggleType();
									}
								}}
							>
								{fieldType() === "password" ? <BsEyeSlash /> : <BsEye />}
							</span>
						</Show>
					</div>
				}
			>
				<TextFieldTextArea {...inputProps} autoResize />
			</Show>
			<TextFieldErrorMessage>{props.error}</TextFieldErrorMessage>
		</TextField>
	);
}

"use client";

import { TextInput, type TextInputProps } from "flowbite-react";
import React, { forwardRef, type ForwardRefExoticComponent } from "react";
import {
	type Control,
	type FieldValues,
	useController,
	type UseControllerProps,
} from "react-hook-form";

interface FieldProps<T extends FieldValues = FieldValues> {
	name: string;
	control?: Control<T>;
	rules?: UseControllerProps["rules"];
}

const TextFormInput: ForwardRefExoticComponent<
	TextInputProps & FieldProps & import("react").RefAttributes<HTMLInputElement>
> = forwardRef(function TextFormInput({ control, name, rules, ...props }, ref) {
	const {
		field,
		fieldState: { error },
	} = useController({
		name,
		control,
		defaultValue: props.defaultValue,
		disabled: props.disabled,
		rules,
	});

	return (
		<>
			<TextInput
				name={field.name}
				onChange={(event) => {
					field.onChange(event);
					props.onChange?.(event);
				}}
				onBlur={field.onBlur}
				color={error ? "failure" : undefined}
				helperText={
					<span className="font-medium">{error?.message}</span>
				}
				{...props}
				ref={ref}
			/>
		</>
	);
});

export default TextFormInput;

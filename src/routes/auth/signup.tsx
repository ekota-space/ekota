import SignupForm from "~/components/modules/auth/signup-form";

const SignupPage = () => {
	return (
		<main class="flex justify-center items-center h-screen">
			<div class="min-w-72 max-w-96">
				<SignupForm />
			</div>
		</main>
	);
};

export default SignupPage;

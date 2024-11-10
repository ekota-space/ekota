import LoginForm from "~/components/modules/auth/login-form";

const LoginPage = () => {
	return (
		<main class="flex justify-center items-center h-screen">
			<div class="min-w-72">
				<LoginForm />
			</div>
		</main>
	);
};

export default LoginPage;

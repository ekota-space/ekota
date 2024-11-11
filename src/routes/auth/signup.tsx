import SignupForm from "~/components/modules/auth/signup-form";

const SignupPage = () => {
	return (
		<main class="flex justify-center items-center h-screen">
			<div class="min-w-72 max-w-96 space-y-6">
				<SignupForm />
        
        <p class="text-center">
          Already have an account?{" "}
          <a href="/auth/login">
            Login
          </a>
        </p>
			</div>
		</main>
	);
};

export default SignupPage;

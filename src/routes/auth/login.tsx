import LoginForm from "~/components/modules/auth/login-form";
import { Button } from "~/components/ui/button";

const LoginPage = () => {
	return (
		<main class="flex justify-center items-center h-screen">
			<div class="min-w-72 flex flex-col gap-6 items-stretch">
				<LoginForm />
        <div class="flex flex-col items-center">
          <Button variant="link" as="a" href="/auth/reset-password">
            Forgot password?
          </Button>
          <p class="text-center">
            Don't have an account?{" "}
            <a href="/auth/signup">
              Sign up
            </a>
          </p>
        </div>
			</div>
		</main>
	);
};

export default LoginPage;

'use client'
import { signIn, useSession } from "next-auth/react";
import Form from "../Global/Form";
import Button from "../Global/Button";
import { forgotPasswordWithCredentials } from "@/actions/authActions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock } from "react-icons/fa";

const SignIn = ({ callbackUrl }) => {
  const { data: session } = useSession();
  const router = useRouter()

  if (session) {
    router.push('/')
  }

  async function handleCredentialsLogin(formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    await signIn("credentials", { email, password, callbackUrl });
  }

  async function handleForgotPassword(formData) {
    const email = formData.get("email");
    const res = await forgotPasswordWithCredentials({ email });
    if (res?.msg) alert(res?.msg);
  }

  return (
    <div className="h-full flex flex-col justify-center items-center p-4 bg-white  lg:border-none">
      <div className="w-full flex flex-col justify-center items-center h-full max-w-md">
        <h2 className="text-3xl text-center font-bold mb-8 text-red-500">Sign In to Your Account!</h2>

        {/* SignIn with credentials */}
        <Form action={handleCredentialsLogin} className="w-full flex flex-col text-center mb-8">
          <div className="flex border-b-2 text-xl bg-transparent border-red-400 py-2 mb-4">
            <FaEnvelope className="text-red-500 w-6 h-5 mr-2" />
            <input className="bg-transparent w-full focus:outline-none" type="email" name="email" placeholder="Enter your email" required />
          </div>
          <div className="flex border-b-2 text-xl bg-transparent border-red-400 py-2 mb-6">
            <FaLock className="text-red-500 w-6 h-5 mr-2" />
            <input className="bg-transparent w-full focus:outline-none" type="password" name="password" placeholder="Enter your password" required />
          </div>
          <Button
            value="Sign In"
            className="w-1/2 mx-auto mb-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
          />
        </Form>

        {/* Forgot Password */}
        <Form action={handleForgotPassword} className="w-full flex flex-col text-center mb-8">
          <div className="flex border-b-2 text-xl bg-transparent border-red-400 py-2 mb-6">
            <FaEnvelope className="text-red-500 w-6 h-5 mr-2" />
            <input className="bg-transparent w-full focus:outline-none" type="email" name="email" placeholder="Enter your email" required />
          </div>
          <Button
            value="Forgot Password"
            className="w-1/2 mx-auto mb-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
          />
        </Form>

        {/* GoogleLogin */}
        <div className="mt-4 text-center">
          <h1 className="font-semibold text-lg mb-4">Or Continue With</h1>
          <button
            onClick={() => signIn("google", { callbackUrl })}
            className="w-full cursor-pointer hover:scale-110 duration-200 p-4 text-center font-semibold text-gray-800 flex items-center justify-center gap-2"                    >
            <Image
              src="/google.png"
              alt="Google Icon"
              width={30}
              height={30}
              className="object-contain"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
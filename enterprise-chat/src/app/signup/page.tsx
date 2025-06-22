"use client"
import { SignUpForm } from "@/components/signup-form"
import { useRouter } from "next/navigation";
import { signUp, signIn } from "aws-amplify/auth"
import { PassThrough } from "stream";
import { Amplify } from 'aws-amplify'
import awsconfig from '@/aws-exports'
import { toast } from "sonner"

Amplify.configure(awsconfig)

export default function SignUp() {
  const router = useRouter()

  async function signup({ email, password }: { email: string; password: string }) {
    console.log("signing tf in")
    try {
      await signUp({
        username: email,
        password: password
      })
      await signIn({ username: email, password })
      toast("Signed Up Successfully!")
      
      await signIn({
        username: email, password
      })
      router.push("/chat")
      toast("Logged In")

    } catch (error: any) {
      console.error("Signup error:", error.message);
      toast("Authentication failed")
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-1/2">
            <SignUpForm onSubmit={signup}/>
        </div>
    </div>
  );
}

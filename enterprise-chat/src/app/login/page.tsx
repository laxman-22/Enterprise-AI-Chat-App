'use client'
import { LoginForm } from "@/components/login-form"
import { useRouter } from 'next/navigation';
import { signIn, fetchAuthSession } from "aws-amplify/auth"
import { toast } from "sonner"
import { Amplify } from 'aws-amplify'
import awsconfig from '@/amplifyconfig'

Amplify.configure(awsconfig)


export default function Login() {
    const router = useRouter()
    async function login({ email, password }: { email: string; password: string }) {
        try {
            console.log(email, password)
            await signIn({
                username: email, 
                password: password
            })
            const session = await fetchAuthSession()
            toast("Logged In Successfully!")
            router.push("/chat")
        } catch(error: any) {
            toast(error.message)
        }
    }
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-1/2">
                <LoginForm onSubmit={login} />
            </div>
        </div>
    );
}

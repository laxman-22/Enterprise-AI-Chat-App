'use client'
import { LoginForm } from "@/components/login-form"
import { useRouter } from 'next/navigation';



export default function Login() {
    const router = useRouter()
    function login() {

        console.log("locked tf in")

        router.push('/chat')
    }
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-1/2">
                <LoginForm onSubmit={login} />
            </div>
        </div>
    );
}

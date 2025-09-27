import Image from "next/image";
import LoginForm from "@/components/LoginForm";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="z-10 mx-auto max-w-md w-full items-center rounded-2xl px-8 py-12 shadow-lg bg-white">
        <div className="flex justify-center items-center w-full mb-8">
       <p className="text-green-700 text-5xl font-semibold">Rutalism</p>
        </div>
        <div className="w-full text-[#353F50]">
          <h1 className="mb-4 text-2xl font-semibold text-center">Welcome Back!</h1>
          <p className="mb-6 text-gray-600 text-center">Please sign in to your email dashboard</p>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
import Image from "next/image";
import LoginForm from "@/components/LoginForm";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="z-10 mx-auto max-w-md w-full items-center rounded-2xl px-8 py-12 shadow-lg bg-white">
        <div className="flex justify-center items-center w-full mb-8">
          <Image
            src="https://qm-frontend-portal.k8.isw.la/_next/static/media/quickteller-energy-logo.5920f881.svg"
            alt="Quickteller Logo"
            width={150}
            height={150}
            priority
          />
        </div>
        <div className="w-full text-[#353F50]">
          <h1 className="mb-4 text-2xl font-semibold text-center">Welcome Back!</h1>
          <p className="mb-6 text-gray-600 text-center">Please sign in with your Quickteller Business Account</p>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
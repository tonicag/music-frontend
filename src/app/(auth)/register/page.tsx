import LoginForm from "@/app/(auth)/login/components/login-form";
import RegisterForm from "@/app/(auth)/register/components/register-form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full bg-slate-300 grid grid-cols-2">
      <div className="p-10 bg-slate-50 flex items-center justify-center col-span-2 md:col-span-1">
        <RegisterForm />
      </div>
      <div className="p-10 flex flex-col items-center justify-center col-span-2 md:col-span-1">
        <h1 className="text-[48px] font-semibold text-gray-600">
          Sound<span className="font-thin text-gray-500">zzz</span>
        </h1>
        <h1 className="font-thin text-lg">
          Join now and lets get started building your music library!
        </h1>
      </div>
    </div>
  );
}

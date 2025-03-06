"use client";

import { UserService } from "@/services/userService";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userService = new UserService();
  const { push } = useRouter();

  const submit = (e: React.FormEvent) => {
    userService
      .login({ email, password })
      .then((response) => {
        localStorage.setItem("token", response.data.accessToken);
        push("/home");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
    e.preventDefault();
  };
  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(e.target.value);
    };

  return (
    <div className="flex flex-col justify-center items-center h-full gap-5">
      <h3 className="text-4xl">Login</h3>
      <form onSubmit={submit} className="flex flex-col gap-5 w-85">
        <input
          type="email"
          placeholder="E-mail "
          className="border p-2 rounded-[0.5em] focus:outline-blue-700"
          onChange={handleInputChange(setEmail)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          className="border p-2 rounded-[0.5em] focus:outline-blue-700"
          onChange={handleInputChange(setPassword)}
          required
        />
        <button className="bg-blue-800 text-lg font-bold text-amber-50 p-2 rounded-xl">
          Entrar
        </button>
      </form>

      <p className="font-bold mt-10">
        Você não possui uma conta?{" "}
        <a href={"/signup"} className="text-blue-600 ">
          cadastre-se
        </a>
      </p>
    </div>
  );
}

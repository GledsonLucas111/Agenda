"use client";

import { UserService } from "@/services/userService";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userService = new UserService();
  const { push } = useRouter();

  function submit(e: any) {
    userService
      .login({ email, password })
      .then((response) => {
        console.log(response.data);
        push("/");

      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
    e.preventDefault();
  }
  function emailHandleChange(e: any) {
    setEmail(e.target.value);
  }
  function passwordlHandleChange(e: any) {
    setPassword(e.target.value);
  }

  return (
    <div className="flex flex-col justify-center items-center h-full gap-5">
      <h3 className="text-4xl">Login</h3>
      <form onSubmit={submit} className="flex flex-col gap-5 w-85">
        <input
          type="email"
          placeholder="E-mail "
          className="border p-2 rounded-[0.5em] focus:outline-blue-700"
          onChange={emailHandleChange}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          className="border p-2 rounded-[0.5em] focus:outline-blue-700"
          onChange={passwordlHandleChange}
          required
        />
        <button className="bg-blue-800 text-lg font-bold text-amber-50 p-2 rounded-xl">
          Entrar
        </button>
      </form>

      <p className="font-bold mt-10">
        Você não possui uma conta?{" "}
        <a href="" className="text-blue-600 ">
          cadastre-se
        </a>
      </p>
    </div>
  );
}

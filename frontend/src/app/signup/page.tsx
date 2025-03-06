"use client";
import { UserService } from "@/services/userService";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userService = new UserService();
  const { push } = useRouter();

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(e.target.value);
    };

  const submit = (e: React.FormEvent) => {
    userService
      .create({ name, email, password })
      .then((response) => {
        push("/");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
    e.preventDefault();
  };
  return (
    <div className="flex flex-col justify-center items-center h-full gap-5">
      <h3 className="text-4xl">Cadastro</h3>
      <form className="flex flex-col gap-5 w-85" onSubmit={submit}>
        <input
          onChange={handleInputChange(setName)}
          type="text"
          placeholder="Nome"
          className="border p-2 rounded-[0.5em] focus:outline-blue-700"
          required
        />
        <input
          onChange={handleInputChange(setEmail)}
          type="email"
          placeholder="E-mail"
          className="border p-2 rounded-[0.5em] focus:outline-blue-700"
          required
        />
        <input
          onChange={handleInputChange(setPassword)}
          type="password"
          placeholder="Senha"
          className="border p-2 rounded-[0.5em] focus:outline-blue-700"
          required
        />
        <button className="bg-blue-800 text-lg font-bold text-amber-50 p-2 rounded-xl">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

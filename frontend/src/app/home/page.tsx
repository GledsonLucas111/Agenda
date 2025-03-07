"use client";

import { EventService } from "@/services/eventService";
import { UserService } from "@/services/userService";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface User {
  username: string;
  sub: number;
  iat: number;
  exp: number;
}
interface Event {
  id: number;
  description: string;
  startDate: Date;
  endDate: Date;
  authorId: number;
}

export default function Home() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startHour, setStartHour] = useState("");
  const [endHour, setEndHour] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState("");

  const eventService = new EventService();
  const userService = new UserService();

  function dateformatted(dateISO: Date) {
    const formatted = new Date(dateISO).toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
    });
    return formatted;
  }

  // Função para formatar input de data (minima data possível)
  const formatDateInput = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  // Função de mudança de dados do formulário
  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(e.target.value);
    };

  // Requisição para buscar usuário e eventos
  useEffect(() => {
    userService
      .decoded({ token: localStorage.getItem("token") })
      .then((response) => setUser(response.data))
      .catch((error) =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        })
      )
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!user) return;
    eventService
      .list(user.sub.toString())
      .then((response) => setEvents(response.data))
      .catch((error) =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        })
      );
  }, [user]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const response = await eventService.create({
        description: description,
        startDate: new Date(`${startDate}T${startHour}:00`),
        endDate: new Date(`${endDate}T${endHour}:00`),
        authorId: user.sub,
      });

      setEvents((prevEvents) => [...prevEvents, response.data]);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };
  return (
    <div>
      <header className="p-7 mb-5 bg-blue-950">
        <p className="text-center text-amber-50 font-bold text-xl">
          CALENDÁRIO DE EVENTOS
        </p>
      </header>
      <div className="flex flex-col justify-center mb-10 items-center">
        <h3 className="font-bold p-1 bg-blue-900 text-amber-50 active:bg-blue-950 w-full">
          Meus eventos:
        </h3>
        <div>
          {loading ? (
            <p>carregando...</p>
          ) : events.length === 0 ? (
            <p className="font-bold mt-2">
              você não possui nenhum evento agendado.
            </p>
          ) : (
            events.map(
              (e: {
                id: number;
                description: string;
                startDate: Date;
                endDate: Date;
                authorId: number;
              }) => {
                return (
                  <div key={e.id} className="border mt-2 w-80">
                    <div>
                      <div>
                        Descriçao:{" "}
                        <p className="font-bold inline">{e.description}</p>
                      </div>
                      <div>
                        Data de inicio:{" "}
                        <p className="font-bold inline">
                          {dateformatted(e.startDate)}
                        </p>
                      </div>

                      <div>
                        Data de termino:{" "}
                        <p className="font-bold inline">
                          {dateformatted(e.endDate)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }
            )
          )}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <h3 className="font-bold p-1 bg-blue-900 text-amber-50 active:bg-blue-950 w-full">
          Adicionar evento
        </h3>
        <form className="flex flex-col mt-2 mb-10 gap-3" onSubmit={onSubmit}>
          <textarea
            onChange={handleInputChange(setDescription)}
            name="description"
            placeholder="Descrição"
            className="border p-2 rounded-[0.5em] focus:outline-blue-700"
            required
          />
          <div>
            <label>Inicio:</label>
            <input
              type="date"
              min={formatDateInput()}
              id="data_inicio"
              onChange={handleInputChange(setStartDate)}
              className="font-bold"
              required
            />
            <input
              type="time"
              onChange={handleInputChange(setStartHour)}
              id="appt"
              name="appt"
              className="font-bold"
              required
            />
          </div>
          <div>
            <label>Termino:</label>
            <input
              onChange={handleInputChange(setEndDate)}
              type="date"
              min={formatDateInput()}
              id="data_inicio"
              className="font-bold"
              required
            />
            <input
              onChange={handleInputChange(setEndHour)}
              type="time"
              id="appt"
              name="appt"
              className="font-bold"
              required
            />
          </div>
          <button className="bg-blue-800 text-amber-50 p-1 rounded">
            Criar
          </button>
        </form>
      </div>
    </div>
  );
}

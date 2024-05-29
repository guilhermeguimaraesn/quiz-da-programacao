"use client";

import Image from "next/image";
import computacao from "../../public/computacao.jpg";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [name, setName] = useState("");
  const Router = useRouter();

  const SalvarNome = (e) => {
    e.preventDefault();
    localStorage.setItem("name", name);
  };

  const notify = () => {
    if (name == "") {
      toast.error("Digite o nome do jogador!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.success("Nome salvo com sucesso!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => {
          Router.push("/quiz");
        },
      });
    }
  };

  return (
    <div className="w-1/2 bg-blue-100 p-8 rounded flex flex-col justify-center items-center gap-4">
      <h1 className="text-3xl font-bold">Quiz da Programação</h1>
      <p className="text-xl text-center">
        Vamos descobrir o quanto que você sabe sobre Programação
      </p>
      <Image src={computacao} width={375} height={275} className="rounded" />
      <div className="flex flex-col w-2/3">
        <form onSubmit={SalvarNome} className="flex flex-col">
          <label className="font-bold">Quem está jogando?</label>
          <input
            className="border border-gray-400 rounded p-4"
            placeholder="Seu nome aqui"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="submit"
            className="font-bold bg-blue-600 px-5 py-3 rounded text-white mt-2 hover:brightness-90 text-center"
            onClick={notify}
          >
            INICIAR
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}

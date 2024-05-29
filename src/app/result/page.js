"use client";

import Image from "next/image";
import computacao from "../../../public/computacao.jpg";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import muitoRuim from '../../../public/pergunta1.jpg'
import ruim from '../../../public/pensativo.jpg'
import ok  from '../../../public/felizleve.jpg'
import bom  from '../../../public/satisfeita.jpg'
import otimo  from '../../../public/trofeucomp.jpeg'
import perfeito  from '../../../public/festacomp.jpeg'

export default function Result() {
  const [name, setName] = useState("");
  const [pontos, setPontos] = useState(0)
  const [message, setMessage] =useState('')
  const [foto, setFoto] = useState('')

  useEffect(() => {
    const savedName = localStorage.getItem("name");
    const pontos = localStorage.getItem('pontos')
    let newMessage = ''

    if (savedName) {
      setName(savedName);
    }
    if (pontos){
        setPontos(pontos)
    }

    if (pontos == 0){
      newMessage = 'Computação realmente não é sua área. Não se preocupe, há muitas outras áreas para explorar'
      setMessage(newMessage)
      setFoto(muitoRuim)
    }

    if (pontos >= 1 && pontos <= 3){
      newMessage = 'Hmm, parece que você conhece um pouco sobre a história da computação, mas ainda há muito para descobrir!'
      setMessage(newMessage)
      setFoto(ruim)
    }

    if (pontos >= 4 && pontos <= 6){
      newMessage = 'Você está no caminho certo! Com um pouco mais de estudo, você pode se tornar um verdadeiro conhecedor da história da computação.'
      setMessage(newMessage)
      setFoto(ok)
    }

    if (pontos >= 7 && pontos <= 8){
      newMessage = 'Bom trabalho! Você tem um conhecimento sólido sobre a história da computação. Continue assim!'
      setMessage(newMessage)
      setFoto(bom)
    }

    if (pontos == 9 ){
      newMessage = 'Excelente! Você claramente conhece bem a história da computação. Continue assim e você se tornará um especialista!'
      setMessage(newMessage)
      setFoto(otimo)
    }

    if (pontos == 10 ){
      newMessage = 'Incrível! Você realmente domina a história da computação. Parabéns pelo seu excelente desempenho!'
      setMessage(newMessage)
      setFoto(perfeito)
    }
  }, []);

  return (
    <div className="w-1/2 bg-blue-100 p-8 rounded flex flex-col justify-center items-center gap-4">
      <h1 className="text-3xl font-bold">Resultado do Quiz da Programação</h1>
      <Image src={foto} width={350}
          height={250}/>
      <p className="text-center">
        {message} <br></br>
        Você acertou <strong>{pontos}</strong> de <strong>10</strong> perguntas
       </p>
      <a className="font-bold bg-blue-600 px-5 py-3 rounded text-white mt-2 hover:brightness-90 text-center w-full" href="/" >VOLTAR</a>
    </div>
  );
}

"use client";

import Image from "next/image";
import paiComputacao from "../../../public/paiComputacao.jpg";
import javascript from "../../../public/desenvolvimentoWeb.jpg";
import html from "../../../public/html.webp";
import variaveis from "../../../public/variaveis.png";
import debuging from "../../../public/debug.avif";
import teste from "../../../public/teste.jpg";
import python from "../../../public/python.jpg";
import eficiencia from "../../../public/eficiencia.jpg";
import compilar from "../../../public/compilando.webp";
import heranca from "../../../public/heranca.webp";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const questions = [
  {
    question: "Quem é considerado o pai da computação moderna?",
    options: [
      "Alan Turing",
      "Charles Babbage",
      "John von Neumann",
      "Ada Lovelace",
    ],
    correctOption: "Alan Turing",
    img: paiComputacao,
    feedback:
      "Alan Turing é considerado o pai da computação moderna por seu trabalho pioneiro na teoria da computação e na criação da máquina de Turing.",
  },
  {
    question:
      "Qual linguagem de programação é frequentemente usada para desenvolvimento web?",
    options: ["Python", "Java", "JavaScript", "C++"],
    correctOption: "JavaScript",
    img: javascript,
    feedback:
      "JavaScript é frequentemente usada para desenvolvimento web devido à sua capacidade de criar interatividade em páginas web.",
  },
  {
    question: "O que significa a sigla “HTML”?",
    options: [
      "Hyper Text Markup Language",
      "High-Level Text Management Language",
      "Hyperlink Text Manipulation Language",
      "Hyper Transferable Markup Logic",
    ],
    correctOption: "Hyper Text Markup Language",
    img: html,
    feedback:
      "HTML significa Hyper Text Markup Language e é a linguagem padrão para criar páginas web.",
  },
  {
    question: "O que é uma variável em programação?",
    options: [
      "Um valor fixo no código",
      "Um local de armazenamento que pode conter diferentes valores",
      "Uma função que realiza cálculos",
      "Um comentário no código",
    ],
    correctOption:
      "Um local de armazenamento que pode conter diferentes valores",
    img: variaveis,
    feedback:
      "Uma variável em programação é um local de armazenamento que pode conter diferentes valores, permitindo a manipulação de dados ao longo da execução do programa.",
  },
  {
    question:
      "Qual é o nome do processo de encontrar e corrigir erros em um programa?",
    options: ["Debugging", "Compiling", "Executing", "Optimizing"],
    correctOption: "Debugging",
    img: debuging,
    feedback:
      "Debugging é o processo de encontrar e corrigir erros em um programa.",
  },
  {
    question:
      "Qual é o termo usado para descrever a prática de escrever código para testar partes específicas de um programa?",
    options: [
      "Unit testing",
      "Integration testing",
      "Regression testing",
      "System testing",
    ],
    correctOption: "Unit testing",
    img: teste,
    feedback:
      "Unit testing é a prática de escrever código para testar partes específicas de um programa.",
  },
  {
    question:
      "Qual é o nome da linguagem de programação criada por Guido van Rossum?",
    options: ["Java", "C#", "Python", "Ruby"],
    correctOption: "Python",
    img: python,
    feedback:
      "Python foi criada por Guido van Rossum e é conhecida por sua simplicidade e legibilidade.",
  },
  {
    question: "Qual é o principal objetivo da otimização de código?",
    options: [
      "Reduzir o tamanho do código",
      "Melhorar a legibilidade do código",
      "Aumentar a eficiência do código",
      "Adicionar mais comentários ao código",
    ],
    correctOption: "Aumentar a eficiência do código",
    img: eficiencia,
    feedback:
      "O principal objetivo da otimização de código é aumentar a eficiência do código.",
  },
  {
    question:
      "Qual é o nome do processo de converter código-fonte em código executável?",
    options: ["Compilação", "Interpretação", "Depuração", "Otimização"],
    correctOption: "Compilação",
    img: compilar,
    feedback:
      "Compilação é o processo de converter código-fonte em código executável.",
  },
  {
    question:
      "Qual é o termo usado para descrever a prática de reutilizar código existente em novos projetos?",
    options: ["Refatoração", "Herança", "Polimorfismo", "Modularização"],
    correctOption: "Herança",
    img: heranca,
    feedback:
      "Herança é a prática de reutilizar código existente em novos projetos, permitindo a criação de novas classes baseadas em classes existentes.",
  },
];

const Quiz = () => {
  const [atualQuestion, setAtualQuestion] = useState(0);
  const [pontos, setPontos] = useState(0);
  const [mostrarPontos, setMostrarPontos] = useState(false);
  const [desativarBotao, setDesativarBotao] = useState(false);
  const Router = useRouter();

  const respostaOpcao = (resposta) => {
    setDesativarBotao(true); // ao clicar em uma resposta todos os botões são desativados

    let newPoint = pontos;
    if (resposta == questions[atualQuestion].correctOption) {
      newPoint = pontos + 1;
      setPontos(newPoint);
      localStorage.setItem("pontos", newPoint);
      console.log(pontos);
    }

    const notify = (situacao, onCloseCallBack) => {
      if (situacao === true) {
        return toast.success("você acertou ", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          onClose: () => {
            if (onCloseCallBack) {
              onCloseCallBack();
              setDesativarBotao(false);
            } else {
              setAtualQuestion(nextQuestion);
              setDesativarBotao(false); // ao finalizar a notificação os botões voltam a funcionar
            }
          },
        });
      }
      if (situacao === false) {
        return toast.error(
          `VOCÊ ERROU!! ${questions[atualQuestion].feedback}`,
          {
            position: "top-center",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            onClose: () => {
              if (onCloseCallBack) {
                onCloseCallBack();
                setDesativarBotao(false);
              } else {
                setAtualQuestion(nextQuestion);
                setDesativarBotao(false); // ao finalizar a notificação os botões voltam a funcionar
              }
            },
          }
        );
      }
    };

    const nextQuestion = atualQuestion + 1;

    if (nextQuestion < questions.length) {
      if (resposta == questions[atualQuestion].correctOption) {
        notify(true);
      } else {
        notify(false);
      }
    } else {
      if (resposta == questions[atualQuestion].correctOption) {
        notify(true, () => {
          console.log(pontos);
          localStorage.setItem("pontos", newPoint);
          Router.push("/result");
          setMostrarPontos(false);
          setDesativarBotao(false); // ao finalizar a notificação os botões voltam a funcionar
        });
      } else {
        notify(false, () => {
          console.log(pontos);
          localStorage.setItem("pontos", newPoint);
          Router.push("/result");
          setMostrarPontos(false);
          setDesativarBotao(false); // ao finalizar a notificação os botões voltam a funcionar
        });
      }
    }
  };

  return (
    <div className="w-1/2 bg-blue-100 h-auto p-4 rounded flex flex-col justify-center items-center gap-4">
      <ToastContainer />
      <div className="flex justify-between w-full">
        <p className="bg-blue-300 p-4 rounded font-bold text-blue-600">
          Pergunta{" "}
          <span>
            {atualQuestion + 1} de <span>{questions.length}</span>
          </span>
        </p>
        <p className="bg-blue-300 p-4 rounded font-bold text-blue-600">
          Sua pontuação <span>{pontos}</span>
        </p>
      </div>
      <p className="text-xl text-center">{questions[atualQuestion].question}</p>
      <div>
        <Image
          src={questions[atualQuestion].img}
          width={350}
          height={250}
          className="rounded"
        />
      </div>
      <div className="flex gap-4 flex-col w-full">
        {questions[atualQuestion].options.map((option) => (
          <button
            className="bg-blue-600 px-2 py-2 rounded text-white hover:brightness-90 w-full"
            onClick={() => respostaOpcao(option)}
            key={option}
            disabled={desativarBotao}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;

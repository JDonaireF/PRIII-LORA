'use client';
import React from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"

export default function Login() {
  /*const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    const data = {
      emailAddress: email,
      password: password,
      role: role,
    };

    fetch("http://apitestingelfec.somee.com/api/Users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          confirm("Login fallido");
        }
      })
      .then((responseData) => {
        sessionStorage.setItem("fullName", responseData.fullName);
        sessionStorage.setItem("role", responseData.role);
        sessionStorage.setItem("zone", responseData.zone);
        sessionStorage.setItem("authenticated", true);

        router.push("/meters");
      })
      .catch((error) => {
        confirm("Error:", error);
      });
  };*/
  
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    await signIn('credentials', {
      emailAddress: email,
      password: password,
      role: role,
      redirect: false,
      callbackUrl: '/meters',
    }).then((res) => {
      if (res?.error) {
        confirm("Inicio de sesion fallido");
      } else {
        router.push('/meters')
      }
    });
  };

  return (
    <div className="bg-white dark:bg-white my-auto">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <h1 className="flex items-center mb-6 text-7xl font-semibold text-blue-600 dark:text-blue-600">LORA</h1>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" method="POST">
                <div>
                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Correo</label>
                    <input type="email" name="email" id="email" className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6" placeholder="name@gmail.com" required=""/>
                </div>
                <div>
                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Contraseña</label>
                    <input type="password" name="password" id="password" placeholder="••••••••" className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6" required=""/>
                </div>
                <div>
                  <label for="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Rol</label>
                  <select id="role" name="role" className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6">
                    <option>Supervisor</option>
                    <option>Cliente</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                </div>
                <button onClick={handleSubmit} type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold m-2 p-2 rounded">
                  Ingresar
                </button>
            </form>
          </div>
      </div>
    </div>
  )
}
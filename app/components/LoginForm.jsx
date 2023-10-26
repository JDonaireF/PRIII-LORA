"use client";

import React from "react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rol, setRol] = useState("");
    
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await signIn("credentials", {
                emailAddress: email,
                password: password, 
                role: rol, 
                redirect: false,
            });
            if (res.error) {
                return;
            }
            if (rol === 'Supervisor') {
              router.replace('meters');
            } else if (rol === 'Cliente') {
              router.replace('invoices');
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
      <div className="bg-white dark:bg-white my-auto">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <h1 className="flex items-center mb-6 text-7xl font-semibold text-blue-600 dark:text-blue-600">LORA</h1>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleSubmit} className="space-y-6" method="POST">
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Correo</label>
                      <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6" placeholder="name@gmail.com" required=""/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Contraseña</label>
                      <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6" required=""/>
                  </div>
                  <div>
                    <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Rol</label>
                    <select onChange={(e) => setRol(e.target.value)} id="role" name="role" className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6">
                      <option></option>
                      <option>Supervisor</option>
                      <option>Cliente</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Olvidaste tu contraseña?</a>
                  </div>
                  <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold m-2 p-2 rounded">
                    Ingresar
                  </button>
              </form>
            </div>
        </div>
      </div>
    )
}
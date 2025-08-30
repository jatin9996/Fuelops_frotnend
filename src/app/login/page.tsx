"use client";

import Image from "next/image";
import React, { useState } from "react";
import fuelops from "@/assets/fuelops.png";
import Link from "next/link";
import SaleCounter from "./SaleCounter";
import { FaWhatsapp } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Temporary hardcoded credentials
    if (email === "admin@test.com" && password === "123456789") {
      // Set cookie to mark logged in
      document.cookie = "loggedIn=true; path=/";
      router.push("/dashboard/dash");
    } else {
      setError("Invalid email or password");
    }
  };
  return (
    <div className="flex  w-[100%] min-h-screen">
      <div className="bg-[#e6f0ff] min-h-screen w-[50%]">
        <div className="flex items-center justify-center my-[5%]">
          <Image src={fuelops} alt="fuel" className="size-[25%]" />
        </div>
        <div className="flex flex-col justify-center items-start px-[15%]">
          <h1 className="text-[42px] font-semibold text-gray-500 font-mono">
            Welcome to Fuelops
          </h1>
          <p className="text-[18px] font-normal text-gray-400 font-mono">
            A Petrol Pump Accounting and Inventory management software.
            Developed under the guidance of RPDA.
          </p>
        </div>
        <div className="mt-[25%] px-[15%]">
          <p className="text-[18px] font-medium text-gray-400 font-mono">
            © 2025 Fuelops. All Rights Reserved.
          </p>
        </div>
      </div>

      <div className="min-h-screen w-[50%]">
        <div className="flex items-end justify-center flex-col p-[5%]">
          <p className="text-[14px] font-normal text-gray-600 font-mono">
            Don't have an account yet?{" "}
            <Link href={""} className="text-blue-500 font-medium ms-2">
              Sign Up!
            </Link>
          </p>
          <p className="text-[14px] font-normal text-gray-600 font-mono">
            If You are Customer, Please Click here{" "}
            <Link href={""} className="text-blue-500 font-medium ms-2">
              {" "}
              Customer Login!
            </Link>
          </p>
        </div>
        <div className="flex items-center justify-center flex-col space-y-5">
          <Image src={fuelops} alt="fuel" className="size-[20%]" />
          <div>
            <SaleCounter />
          </div>
        </div>
        <div className="">
          <form
            action=""
            onSubmit={handleLogin}
            className="flex flex-col items-center justify-center py-5"
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[60%] h-[40px] bg-gray-200 rounded-lg outline-none text-gray-500 ps-2"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[60%] h-[40px] bg-gray-200 rounded-lg outline-none text-gray-500 ps-2 mt-2"
            />
            <div className="flex items-center justify-between w-[60%] mt-3">
              <label className="inline-flex items-center cursor-pointer select-none space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <span className="text-gray-500 font-normal text-[16px]">
                  Remember Me
                </span>
              </label>

              <Link href={""} className="text-gray-500 font-normal text-[16px]">
                Forgot Password?
              </Link>
              {error && <p className="text-red-500">{error}</p>}
              <button
                type="submit"
                className="bg-blue-500 px-3 py-2 rounded-md text-white font-medium cursor-pointer"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
        <div className="flex items-center justify-center flex-col mt-16">
          <p className="text-[16px] font-normal text-gray-600 font-mono">
            Support :{" "}
            <span className="text-[16px] font-normal text-blue-500 font-mono">
              123456789
            </span>{" "}
            ,{" "}
            <span className="text-[16px] font-normal text-blue-500 font-mono">
              987456321
            </span>
          </p>
          <p className="flex items-center justify-center gap-2 text-[16px] font-normal text-gray-600 font-mono">
            <FaWhatsapp className="text-green-500" /> Whatsapp : 1234567890
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;

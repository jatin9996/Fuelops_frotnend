"use client";
import { useEffect, useState } from "react";

const Digit = ({ value }: { value: number }) => {
  return (
    <div className="relative w-6 h-10 overflow-hidden inline-block">
      <div
        className="absolute top-0 left-0 transition-transform duration-300 ease-out"
        style={{ transform: `translateY(-${value * 2.5}rem)` }} // 2.5rem = h-10
      >
        {[...Array(10).keys()].map((num) => (
          <div
            key={num}
            className="h-10 w-6 flex items-center justify-center text-2xl font-mono text-red-700 bg-gray-200 rounded-md"
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  );
};

const NumberMeter = ({ number }: { number: number }) => {
  const digits = number.toString().padStart(5, "0").split("");

  return (
    <div className="flex justify-center items-center gap-1">
      {digits.map((d, i) => (
        <Digit key={i} value={parseInt(d)} />
      ))}
    </div>
  );
};

const SaleCounter = ({ initialSold = 1000 }) => {
  const [sold, setSold] = useState(initialSold);

  useEffect(() => {
    const interval = setInterval(() => {
      setSold((prev) => prev + Math.floor(Math.random() * 3));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center space-x-5">
      <span className="text-lg font-semibold text-green-500">SALE</span>
      <NumberMeter number={sold} />
      <span className="text-lg font-semibold text-green-500">LTR.</span>
    </div>
  );
};

export default SaleCounter;

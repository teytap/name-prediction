"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
  const [inputVal, setInputVal] = useState("");
  const { push } = useRouter();
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    push(`/prediction/${inputVal}`);
  };
  return (
    <div className=" w-96  p-8 bg-zinc-800 m-10 mx-auto drop-shadow-md rounded-lg">
      <div className="text-3xl font-bold text-purple-400 p-4">
        🔮 Let's predict your age, gender and country!
      </div>
      <form action="" className="flex flex-col my-4 " onSubmit={handleSubmit}>
        <input
          className="p-4 drop-shadow-md rounded mt-8"
          type="text"
          placeholder="Type your name..."
          onChange={(e) => setInputVal(e.target.value)}
        />
        <button
          type="submit"
          className="mt-8 bg-purple-500 text-orange-100 text-xl rounded p-4 mt-4 drop-shadow-md hover:bg-purple-700 hover:scale-1"
        >
          Predict 🤔
        </button>
      </form>
    </div>
  );
}

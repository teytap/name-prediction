//this is a dynamic route because of folder [name]
"use client";
import countriesObject from "../../data";
import { useRouter } from "next/navigation";

const countries: { [key: string]: string } = countriesObject;
const getPredictedAge = async (name: string) => {
  const res = await fetch(`https://api.agify.io/?name=${name}`);
  return res.json();
};
const getPredictedGender = async (name: string) => {
  const res = await fetch(`https://api.genderize.io/?name=${name}`);
  return res.json();
};
const getPredictedCountry = async (name: string) => {
  const res = await fetch(`https://api.nationalize.io/?name=${name}`);
  console.log(res.json);
  return res.json();
};

interface Params {
  params: { name: string };
}
// after adding async functions add Page function "async" too
export default async function Page({ params }: Params) {
  const { back } = useRouter();
  const ageData = getPredictedAge(params.name);
  const genderData = getPredictedGender(params.name);
  const countryData = getPredictedCountry(params.name);
  //collect data by Promise.all and put in an destructred array by defining
  const [age, gender, country] = await Promise.all([
    ageData,
    genderData,
    countryData,
  ]);
  console.log(ageData);
  //{params.name}// url deki parametreyi alır sayfada gösterir
  return (
    <div className="m-10 w-96 text-lg text-gray-100 mx-auto bg-zinc-800 drop-shadow-md rounded-lg">
      <div className="p-8">
        <div className="border-b-2 p-2">
          <div className="text-3xl mb-8">
            Hi{" "}
            <span className="capitalize text-lime-600  px-1 font-bold">
              {params.name}
            </span>
            !
          </div>{" "}
          Here is your predictions 👇🏻
        </div>
        <div className="p-2">Age: {age?.age - 13}</div>
        <div className="p-2 capitalize">Gender: {gender?.gender}</div>
        <div className="p-2">
          Country:
          {countries[country?.country[0]?.country_id]},{" "}
          {countries[country?.country[1]?.country_id]},{" "}
          {countries[country?.country[2]?.country_id]}
        </div>
        <button
          className=" text-white py-2 px-4 bg-lime-600 m-2 rounded drop-shadow hover:bg-lime-700 mr-auto"
          type="button"
          onClick={() => back()}
        >
          ↩ Go back
        </button>
      </div>
    </div>
  );
}

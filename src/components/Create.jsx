import { useState } from "react";
import { IoCloudUpload } from "react-icons/io5";
import { categories } from "../data";

function Create() {
  const [category, setCategory] = useState("Select category");
  return (
    <>
      <div className={`w-full flex items-center p-10`}>
        <div
          className={` w-[80%] h-full flex flex-col gap-2 justify-center items-center`}
        >
          <input
            className={`appearance-none bg-transparent border-b-2  border-gray-400 w-full text-gray-700 text-base py-2 px-2 leading-tight focus:outline-none`}
            placeholder="Title"
          />

          <div className={`flex w-full justify-around my-4`}>
            <div className="w-full">
              <select name="" className="px-2" id="">
                <option value="" disabled className="text-gray-400">
                  {category}
                </option>
                {categories &&
                  categories.map((data) => (
                    <option value={data.name} key={data.id}>
                      {data.name}
                      {/* {data.iconSrc}s */}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <input
                className={`appearance-none bg-transparent border-b-2  border-gray-400 w-full text-gray-700 text-base py-2 px-2 leading-tight focus:outline-none`}
                placeholder="Location"
              />
            </div>
          </div>

          <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="items-center justify-center w-full h-full cursor-pointer flex flex-col">
              <IoCloudUpload className="text-3xl" />
              <h4 className="mt-5 text-3xl">Click to upload</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Create;

import { useState } from "react";
// import { HiOutlineUser, HiOutlineCog, HiAdjustments } from "react-icons/hi";
// import { BsBell } from "react-icons/bs";
// import { AiOutlineLogout } from "react-icons/ai";
import { categories } from "../data";

const Sidebar = () => {
  const [category, setCategory] = useState("Select category");

  return (
    <form class="flex justify-center items-center w-full min-h-screen p-10">
      <div class="w-4/5 h-full border border-gray-300 rounded-md p-4 flex flex-col items-center justify-center gap-2">
        {/* {alert && (
          <AlertMsg status={alertStatus} msg={alertMsg} icon={alertIcon} />
        )} */}

        <input
          class="w-full text-2xl placeholder-gray-500 focus:border-gray-400"
          placeholder="Title"
          required
          type="text"
          // value={title}
          // onChange={(e) => setTitle(e.target.value)}
        />

        <div class="w-full bg-blue-500 flex justify-between items-center my-4 gap-8">
          <select class="w-full bg-blue-500 text-white outline-none py-2 px-4 rounded-md">
            <option disabled selected class=" py-2 px-4 rounded-md">
              {category}
            </option>
            {categories &&
              categories.map((data) => (
                <option
                  key={data.id}
                  class="px-4 py-2 text-lg hover:bg-black hover:bg-opacity-25"
                  onClick={() => setCategory(data.name)}
                  value={data.name}
                >
                  {data.iconSrc}
                  <span class="ml-4">{data.name}</span>
                </option>
              ))}
          </select>
        </div>

        <div class="w-full flex justify-between items-center my-4 gap-8">
          {/* <div class="relative">
            <button class="w-full bg-blue-500 text-white py-2 px-4 rounded-md">
              {category}
            </button>
            <div class="absolute top-full left-0 z-10 w-64 shadow-xl">
              <ul class="bg-white divide-y divide-gray-200">
                {categories &&
                  categories.map((data) => (
                    <li
                      key={data.id}
                      class="px-4 py-2 text-lg hover:bg-black hover:bg-opacity-25"
                      onClick={() => setCategory(data.name)}
                    >
                      {data.iconSrc}
                      <span class="ml-4">{data.name}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div> */}

          <div class="w-full">
            <div class="relative">
              <div class="absolute left-0 top-0 h-full w-10 flex items-center justify-center">
                <svg
                  class="h-6 w-6 fill-current
              text-gray-400"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.293 4.293a1 1 0 011.414 0L12 10.586l6.293-6.293a1 1 0 111.414 1.414L13.414 12l6.293 6.293a1 1 0 01-1.414 1.414L12 13.414l-6.293 6.293a1 1 0 01-1.414-1.414L10.586 12 4.293 5.707a1 1 0 010-1.414z" />
                </svg>
              </div>
              <input
                class="w-full pl-12 pr-4 py-2 text-lg placeholder-gray-500 border border-gray-300 rounded-md focus:border-gray-400"
                placeholder="URL"
                type="url"
                // value={url}
                // onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          </div>
        </div>

        <textarea
          class="w-full h-64 resize-none border border-gray-300 rounded-md p-2 text-lg placeholder-gray-500 focus:border-gray-400"
          placeholder="Description"
          // value={description}
          // onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <button
          class="w-full bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600"
          // onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Sidebar;

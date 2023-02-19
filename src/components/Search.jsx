import { IoSearch } from "react-icons/io5";
function Search() {
  return (
    <>
      {/* SearchArea Wrapper */}
      <div className="flex flex-1 items-center bg-[#efefef] w-full h-[38px] sm:h-[48px] rounded-3xl pl-4 md:mr-2">
        <div className="mr-3">
          <IoSearch className="h-5 cursor-pointer text-[#0000004d]" />
        </div>
        <form className="flex flex-1 ">
          <input
            type="text"
            placeholder="Search"
            // onChange={(e) => setInput(e.target.value)}
            className="bg-transparent outline-none w-full"
          />
          <button
            type="submit"
            // onClick={onSearchSubmit}
            style={{ display: "none" }}
          >
            Search
          </button>
        </form>
      </div>
    </>
  );
}

export default Search;

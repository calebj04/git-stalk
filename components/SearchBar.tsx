export default function SearchBar({
  icon,
  text,
  height,
  width,
}: {
  icon: number;
  text: string;
  height: number;
  width: number;
}) {
  return (
    <form
      role="search"
      style={{ maxWidth: width }}
      className="flex relative w-full p-1"
    >
      {" "}
      <svg
        style={{ width: icon, height: icon, left: icon }}
        className="absolute top-1/2 -translate-y-1/2 text-gray-500"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Interface / Search_Magnifying_Glass">
          <path
            id="Vector"
            d="M15 15L21 21M10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
      <input
        type="search"
        placeholder="search a git username"
        style={{ height: height, paddingLeft: icon * 2 }}
        className={`bg-white text-black pb-1 pr-4 rounded-full ${text} w-full outline-none focus:ring-2 focus:ring-green-900`}
      />
    </form>
  );
}

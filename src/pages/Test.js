import React from "react";

function Test() {
  return (
    <div>
      <nav class="fixed bottom-0 w-full bg-white border-t border-gray-300">
        <div class="flex justify-between px-4 py-2">
          <a href="c" class="flex items-center">
            <svg
              class="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
            <span class="font-semibold">Home</span>
          </a>
          <a href="home" class="flex items-center">
            <svg
              class="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
            <span class="font-semibold">Search</span>
          </a>
          <a href="search" class="flex items-center">
            <svg
              class="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 22s-8-4.5-8-11.8c0-4.1 2.8-7.5 6.5-7.5 3 0 4.5 2.2 4.5 2.2s1-2.2 4.5-2.2c3.7 0 6.5 3.4 6.5 7.5 0 7.3-8 11.8-8 11.8z"
              ></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span class="font-semibold">Camera</span>
          </a>
          <a href="camera" class="flex items-center">
            <svg
              class="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 22s-8-4.5-8-11.8c0-4.1 2.8-7.5 6.5-7.5 3 0 4.5 2.2 4.5 2.2s1-2.2 4.5-2.2c3.7 0 6.5 3.4 6.5 7.5 0 7.3-8 11.8-8 11.8z"
              ></path>
              <circle cx="17" cy="6" r="3"></circle>
            </svg>
            <span class="font-semibold">Notifications</span>
          </a>
        </div>
      </nav>
    </div>
  );
}

export default Test;

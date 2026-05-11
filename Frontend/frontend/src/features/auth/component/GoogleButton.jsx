import React from "react";

const GoogleButton = ({onClick}) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-700 font-medium py-2.5 rounded-lg transition shadow-sm"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google logo"
        className="w-5 h-5"
      />
      Continue with Google
    </button>
  );
};

export default GoogleButton;
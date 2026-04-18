"use client";

export default function Home() {
  return (
    <div>
      <h1>Hello</h1>
      <button
        className="border px-2 py-1 m-2 rounded cursor-pointer"
        onClick={() => (window.location.href = "/dashboard")}
      >
        Dashboard
      </button>
    </div>
  );
}

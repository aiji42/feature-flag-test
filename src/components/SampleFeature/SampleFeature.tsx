"use client";

import { useRef } from "react";

export const SampleFeature = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        onClick={open}
        className="rounded-full size-12 bg-blue-500 fixed bottom-4 right-4 z-10 shadow-xl"
      >
        ✨
      </button>
      <dialog
        ref={dialogRef}
        onClick={close}
        className="rounded-lg p-4 bg-white fixed inset-0 m-auto shadow-2xl"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="min-w-64 flex flex-col items-center justify-center gap-2"
        >
          <p>This is a sample feature.</p>
          <button
            onClick={close}
            className="rounded-md bg-red-500 px-10 py-2 text-white"
          >
            Close
          </button>
        </div>
      </dialog>
    </>
  );
};

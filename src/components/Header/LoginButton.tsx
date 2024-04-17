import React from "react";
import { Form } from "./Form";

export const LoginButton = () => {
  const openModal = () => {
    const modal = document.getElementById("my_modal_3") as HTMLDialogElement; // HTMLDialogElement として型アサーション
    if (modal) {
      modal.showModal(); // modal が null でないことが確認されたので、showModal() を安全に呼び出せる
    }
  };

  return (
    <>
      <button className="btn rounded-full" onClick={openModal}>
        Login & Sign in
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-red-500">
              ✕
            </button>
          </form>
          {/*ここにコンポーネント*/}
          <Form />
        </div>
      </dialog>
    </>
  );
};

import React from "react";

const Accordion = () => {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="collapse bg-gray-200 mb-5 w-45">
        <input type="radio" name="my-accordion-1" defaultChecked />
        <div className="collapse-title text-lg font-medium">
          旅行先の人と話せる！
        </div>
        <div className="collapse-content text-base">
          <p>旅行先のおすすめスポットを地元の人から直接きけちゃう！</p>
          <p>地元の人しか知らない穴場が見つかるかも！？</p>
        </div>
      </div>
      <div className="collapse bg-gray-200 mb-5">
        <input type="radio" name="my-accordion-1" />
        <div className="collapse-title text-lg font-medium">
          地元の魅力を伝えることも！
        </div>
        <div className="collapse-content">
          <p>募集部屋に入って地元の魅力を伝えよう！</p>
        </div>
      </div>
      <div className="collapse bg-gray-200">
        <input type="radio" name="my-accordion-1" />
        <div className="collapse-title text-base font-medium">
          お店の宣伝等にも！
        </div>
        <div className="collapse-content">
          <p className="text-base">旅行客に自分のお店の魅力を伝えよう！</p>
        </div>
      </div>
    </div>
  );
};

export default Accordion;

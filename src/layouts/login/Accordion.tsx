import React from "react";

const Accordion = () => {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="collapse bg-gray-200 mb-5 w-45">
        <input type="radio" name="my-accordion-1" defaultChecked />
        <div className="collapse-title text-xl font-medium">
          旅行先の人と話せる！
        </div>
        <div className="collapse-content">
          <p>旅行先のおすすめスポットを地元の人から直接きけちゃう！</p>
          <p>地元の人しか知らない穴場が見つかるかも！？</p>
        </div>
      </div>
      <div className="collapse bg-gray-200 mb-5">
        <input type="radio" name="my-accordion-1" />
        <div className="collapse-title text-xl font-medium">
          地元の魅力を伝えることも！
        </div>
        <div className="collapse-content">
          <p>具体的な機能を書く</p>
        </div>
      </div>
      <div className="collapse bg-gray-200">
        <input type="radio" name="my-accordion-1" />
        <div className="collapse-title text-xl font-medium">
          お店の宣伝等にも！
        </div>
        <div className="collapse-content">
          <p>具体的な機能を書く</p>
        </div>
      </div>
    </div>
  );
};

export default Accordion;

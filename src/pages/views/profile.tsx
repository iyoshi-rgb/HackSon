import React from "react";

export const Profile = () => {
  return (
    <div className="">
      <div className="w-full h-24 bg-slate-400">
        <div className="flex justify-center items-center">
          <img className="mt-3 h-10 w-10 mr-4 rounded-full" src="default.png" alt="画像" />
          <div className="flex flex-col">
            <div className="text-xl font-medium">山田太郎</div>
            <div>
              <div>地元:京都</div>
              <div>獲得したいいね数:20</div>
            </div>
          </div>
        </div>
      </div>

      {/* 一言コメントとおすすめスポットを表示 */}
      <div className="h-full flex flex-col items-center px-8">
        <div className="w-1/2">
          <div className="mt-4 mb-10">
            <div className="text-2xl font-semibold ">ひとこと</div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, consectetur? Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Consequatur, unde?
            </div>
          </div>
          <div className="mt-4 mb-10">
            <div className="text-2xl font-semibold">おすすめスポット</div>
            <div className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, eaque? Lorem ipsum dolor sit amet
              consectetur adipisicing elit. At, quod!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

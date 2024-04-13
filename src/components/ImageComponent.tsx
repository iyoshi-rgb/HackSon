import React, { useRef, useState } from "react";

export const ImageComponent = () => {
  const [base64Images, setBase64Images] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState<boolean>(false);

  const handleInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }

    // FileListのままだとforEachが使えないので配列に変換する
    const fileArray = Array.from(files);

    // 読み込み結果を保管するための一時配列
    const loadImages = new Array<string>(fileArray.length);
    let loadCount = 0; // 読み込み済みのファイル数
    fileArray.forEach((file, index) => {
      // indexを追加
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result !== "string") {
          return;
        }

        loadImages[index] = result; // 修正: indexを使用
        loadCount++;

        if (loadCount === fileArray.length) {
          setBase64Images((prevImages) => [...prevImages, ...loadImages]);
        }
      };
      reader.readAsDataURL(file);
    });

    // inputの値をリセットする
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleImageClick = (index: number) => {
    setBase64Images((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false); // ここをtrueからfalseに修正

    const files = e.dataTransfer.files;
    if (files.length === 0) {
      return;
    }
    const file = files[0];
    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const data = reader.result;
      if (typeof data !== "string") {
        return;
      }
      setBase64Images((prevImages) => [...prevImages, data]);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative border-2 border-red-200 bg-red-100 w-[600px] h-[600px] flex flex-col space-y-4">
      <input type="file" multiple accept="image/jpeg, image/png" onChange={handleInputFile} ref={inputRef} />
      <div className="p-4 bg-gray-200">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={`flex justify-center items-center w-[200px] h-[100px] rounded-md border-dashed border-2 border-gray-500 ${
            dragOver ? "bg-white" : "bg-gray-300"
          }`}
        >
          ドラッグ&ドロップ
        </div>
      </div>
      <div className="border-2 border-blue-300 bg-blue-200">
        <p>画像プレビュー</p>
        <div className="flex space-x-4 overflow-x-auto py-4">
          {base64Images.map((image, idx) => (
            <div key={idx} className="flex-shrink-0">
              <img src={image} className="w-32 h-32" alt="プレビュー" onClick={() => handleImageClick(idx)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

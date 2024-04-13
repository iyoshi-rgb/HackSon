import React, { createContext, useState, useContext } from "react";

interface IUserContext {
  receiverUserID: string; // userIDを文字列として扱います
  setReceiverUserID: React.Dispatch<React.SetStateAction<string>>; // userIDを更新するための関数
}

const defaultState: IUserContext = {
  receiverUserID: "", // userIDのデフォルト値を空文字列で初期化
  setReceiverUserID: () => {}, // setUserIDのデフォルト関数
};

export const UserIdContext = createContext<IUserContext>(defaultState);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [receiverUserID, setReceiverUserID] = useState<string>("");

  return (
    <UserIdContext.Provider value={{ receiverUserID, setReceiverUserID }}>
      {children}
    </UserIdContext.Provider>
  );
};

// カスタムフックの名前を useUserIdContext に変更
export const UseUserIdContext = () => useContext(UserIdContext);

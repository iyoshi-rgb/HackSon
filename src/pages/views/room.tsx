import { useLocation } from "react-router";

export const Room = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ChatRoomID = queryParams.get("ChatRoomID");

  return <div>部屋{ChatRoomID}</div>;
};

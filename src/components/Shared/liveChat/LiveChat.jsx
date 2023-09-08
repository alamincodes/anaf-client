import { useLottie } from "lottie-react";
import React from "react";
import LiveChatIcon from "../../Shared/liveChat/liveChat.json";
const LiveChat = () => {
  const options = {
    animationData: LiveChatIcon,
    loop: true,
  };

  const { View } = useLottie(options);
  return (
    <div>
      <a
        href="https://m.me/anaafshop"
        target="_blank"
        className="bg-white ring-4 ring-neutral-700 rounded-full scale-75 z-50 fixed md:right-10 right-1 md:bottom-28 bottom-[80px]"
      >
        {/* <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse mr-1"></span> */}
        <h4 className="w-20 h-20">{View}</h4>
      </a>
    </div>
  );
};

export default LiveChat;

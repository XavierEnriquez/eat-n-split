import { useState, useCallback } from "react";
import FriendsList from "./FriendsList";
import { SplitBill } from "./SplitBill";

const startData = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  return <EatNsplit data={startData} />;
}

export default App;

function EatNsplit({ data }) {
  const [isData, setIsData] = useState([...data]);
  const [isSelected, setIsSelected] = useState("");
  const [bill, setBill] = useState("");
  const [youPay, setYouPay] = useState("");
  const [friendPays, setFriendPays] = useState("");

  const handleDataUpdate = useCallback((updatedFriend) => {
    setIsData((prevData) =>
      prevData.map((friend) =>
        friend.id === updatedFriend.id ? updatedFriend : friend
      )
    );
  }, []);

  return (
    <div className="app">
      <FriendsList
        data={isData}
        isSelected={isSelected}
        onSelected={setIsSelected}
        onData={setIsData}
        onBill={setBill}
        onYouPay={setYouPay}
        onFriendPays={setFriendPays}
      />
      <SplitBill
        data={isData}
        isSelected={isSelected}
        onUpdateFriend={handleDataUpdate}
        bill={bill}
        youPay={youPay}
        friendPays={friendPays}
        onBill={setBill}
        onYouPay={setYouPay}
        onFriendPays={setFriendPays}
      />
    </div>
  );
}

import { useState, useCallback } from "react";

export function SplitBill({
  data,
  isSelected,
  onUpdateFriend,
  bill,
  youPay,
  friendPays,
  onBill,
  onYouPay,
  onFriendPays,
}) {
  const [yourInput, setYourInput] = useState(false);
  const [friendInput, setFriendInput] = useState(false);

  const [whoPays, setWhoPays] = useState("youPay");

  const splitFriend = data.find((friend) => friend.id === isSelected);

  const handleSplitValues = useCallback(
    (who, value) => {
      const numValue = Number(value);
      const numBill = Number(bill);
      if (who === "youPay") {
        onYouPay(value);
        onFriendPays(Math.max(0, numBill - numValue).toString());
        setFriendInput(value >= 1 ? true : false);
      } else {
        onFriendPays(value);
        onYouPay(Math.max(0, numBill - numValue).toString());
        setYourInput(value >= 1 ? true : false);
      }
    },
    [bill, onYouPay, onFriendPays]
  );

  const handleSplitBill = useCallback(
    (e) => {
      e.preventDefault();

      if (!isSelected) {
        alert("Please select a friend first");
        return;
      }

      if (
        !bill ||
        !youPay ||
        !friendPays ||
        Number(youPay) + Number(friendPays) !== Number(bill)
      ) {
        alert("Please enter valid amounts");
        return;
      }

      const balanceChange =
        whoPays === "youPay" ? Number(friendPays) : -Number(youPay);

      onUpdateFriend({
        ...splitFriend,
        balance: splitFriend.balance + balanceChange,
      });

      // Reset form
      onBill("");
      onYouPay("");
      onFriendPays("");
      setWhoPays("youPay");
      setFriendInput(false);
      setYourInput(false);
    },
    [
      bill,
      youPay,
      friendPays,
      whoPays,
      splitFriend,
      onUpdateFriend,
      isSelected,
      onFriendPays,
      onYouPay,
      onBill,
    ]
  );

  return (
    <form className="form-split-bill" onSubmit={handleSplitBill}>
      <h2>
        {splitFriend
          ? `Split the bill with ${splitFriend.name}`
          : "Select a friend to split the bill"}
      </h2>
      <div className="form_input_wrapper">
        <label>🧾 Bill amount</label>
        <input
          name="bill"
          type="number"
          min={0}
          value={bill}
          onChange={(e) => onBill(e.target.value)}
          disabled={!isSelected}
        />
        <label>🧍Your portion</label>
        <input
          name="youPay"
          type="number"
          min={0}
          max={bill}
          value={youPay}
          onChange={(e) => handleSplitValues("youPay", e.target.value)}
          disabled={!isSelected ? true : yourInput}
        />
        <label>
          🧑‍🤝‍👩 {splitFriend ? splitFriend.name + "'s" : "Friend's"} portion
        </label>
        <input
          name="friendPays"
          type="number"
          min={0}
          max={bill}
          value={friendPays}
          onChange={(e) => handleSplitValues("friendPays", e.target.value)}
          disabled={!isSelected ? true : friendInput}
        />
        <label>💸 Who's paying the bill?</label>
        <select
          value={whoPays}
          onChange={(e) => setWhoPays(e.target.value)}
          disabled={!isSelected}
        >
          <option value="youPay">You</option>
          {splitFriend && (
            <option value={splitFriend.id}>{splitFriend.name}</option>
          )}
        </select>
        <button type="submit" className="button" disabled={!isSelected}>
          Split bill
        </button>
      </div>
    </form>
  );
}

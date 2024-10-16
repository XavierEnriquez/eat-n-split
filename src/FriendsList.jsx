import { useState } from "react";
import AddFriend from "./AddFriend";

export default function FriendsList({
  data,
  isSelected,
  onSelected,
  onData,
  onBill,
  onYouPay,
  onFriendPays,
}) {
  const [hideForm, setHideForm] = useState(true);
  const [formClass, setFormClass] = useState("hide");
  const [buttonClass, setButtonClass] = useState("hide");
  const [showButton, setShowButton] = useState("");

  // Select a friend on select button click, and on close button click reset bill, youPay, friendPays
  function handleSelect(e) {
    e !== isSelected ? onSelected(e) : onSelected("");
    onBill("");
    onYouPay("");
    onFriendPays("");
  }

  // Display or hide the add a friend form by setting hideForm true or false
  function handleHideForm() {
    setHideForm(!hideForm ? true : false);
    setFormClass(!hideForm ? "form-add-friend hide" : "form-add-friend");
  }

  // Display or hide the delete button on each of the friend's cards
  function handleShowButton(e) {
    setShowButton(e);
    setButtonClass(e === showButton ? "delete-button hide" : "delete-button");
  }

  // Delete friend on delete button click and reset selected, bill, youPay, friendPays
  function handleDelete(e) {
    onData((data) => data.filter((el) => el.id !== e));

    onSelected("");
    onBill("");
    onYouPay("");
    onFriendPays("");
  }

  return (
    <div className="sidebar">
      <ul>
        {data.map((el) => (
          <li
            key={el.id}
            className={el.id === isSelected ? "selected" : ""}
            onMouseEnter={() => handleShowButton(el.id)}
            onMouseLeave={() =>
              el.id === showButton ? setShowButton("") : null
            }
          >
            <img src={el.image} alt={el.name} />
            <h3>{el.name}</h3>
            {el.balance === 0 ? (
              <p>You and {el.name} are even</p>
            ) : el.balance >= 1 ? (
              <p className="green">
                {" "}
                {el.name} owes you ${el.balance}
              </p>
            ) : (
              <p className="red">
                You owe {el.name} ${Math.abs(el.balance)}
              </p>
            )}
            <button
              className={
                el.id === showButton ? buttonClass : "delete-button hide"
              }
              onClick={() => handleDelete(el.id)}
            >
              Delete
            </button>
            <button className="button" onClick={() => handleSelect(el.id)}>
              {el.id === isSelected ? "Close" : "Select"}
            </button>
          </li>
        ))}
      </ul>
      <AddFriend formClass={formClass} data={data} onData={onData} />
      <button className="button" onClick={handleHideForm}>
        {hideForm ? "Add a friend" : "Close"}
      </button>
    </div>
  );
}

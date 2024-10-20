import { useState } from "react";

export default function AddFriend({ formClass, data, onData, onClick }) {
  const [objectId, setObjectId] = useState(data.at(-1).id + 1);
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  function handleAddFriend(e) {
    e.preventDefault();

    if (!name || !image) return;

    setObjectId(objectId + 1);
    const newFriend = {
      id: objectId,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      image,
      balance: 0,
    };

    onData([...data, newFriend]);
    setName("");
    onClick();
  }
  return (
    <form className={formClass} onSubmit={(e) => handleAddFriend(e)}>
      <label>🧑‍🤝‍👩 Friend name</label>
      <input
        required
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>🌌 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button type="submit" className="button">
        Add
      </button>
    </form>
  );
}

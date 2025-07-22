import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addCompanion, getCompanions } from "../lib/companionApi";

function FamPage() {
  const [usernameToAdd, setUsernameToAdd] = useState("");
  const [companions, setCompanions] = useState([]);

  const fetchCompanions = async () => {
    try {
      const res = await getCompanions();
      setCompanions(res.data);
    } catch (err) {
      toast.error("Failed to fetch companions");
    }
  };

  const handleAddCompanion = async () => {
    if (!usernameToAdd.trim()) return toast.error("Username required");
    try {
      await addCompanion(usernameToAdd);
      toast.success("Companion added!");
      setUsernameToAdd("");
      fetchCompanions();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error adding companion");
    }
  };

  useEffect(() => {
    fetchCompanions();
  }, []);

  return (
    <div className="min-h-screen pt-20 px-4 bg-base-300">
      <div className="flex justify-center mx-auto">
        <div className="max-w-4xl w-full bg-base-100 border border-base-content rounded-xl p-6">
          <h1 className="text-3xl font-bold mb-4 text-center">Your Profile Companions</h1>

          <div className="flex gap-2 mb-6">
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter companion's username"
              value={usernameToAdd}
              onChange={(e) => setUsernameToAdd(e.target.value)}
            />
            <button onClick={handleAddCompanion} className="btn btn-primary">
              Add
            </button>
          </div>

          <h2 className="text-xl font-semibold mb-2">Companions List</h2>
          <ul className="space-y-3">
            {companions.map((c) => (
              <li
                key={c._id}
                className="p-3 border rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-lg">{c.fullName}</p>
                  <p className="text-sm text-base-content/60">@{c.username}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FamPage;

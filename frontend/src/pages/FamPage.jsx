import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addCompanion, getCompanions } from "../lib/companionApi";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Cross, Search } from "lucide-react";
import { removeCompanion } from "../lib/companionApi"; // make sure it's imported

function FamPage() {
  const handleRemoveCompanion = async (username) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to remove @${username} from companions?`
    );
    if (!confirmDelete) return;

    try {
      await removeCompanion(username);
      toast.success("Companion removed successfully!");
      fetchCompanions(); // refresh the list
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to remove companion");
    }
  };

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
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
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
          <div className="flex justify-end">
            <button
              onClick={handleBack}
              className="btn btn-outline btn-accent btn-sm flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          </div>
          <h1 className="text-3xl font-bold mb-4 text-center">
            Your Profile Companions
          </h1>
          <div className="label-text mx-2 my-2 flex items-center">
            <Search className="size-5 mx-1" />
            Search User
          </div>
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
            {companions.map((c) => {
              const isProtectedUser = ["shivam2004", "YemmyChats"].includes(
                c.username
              );

              return (
                <li
                  key={c._id}
                  className="p-3 border rounded-lg flex justify-between items-center"
                >
                  <div className="flex w-full">
                    <div>
                      <img
                        src={c.profilePic}
                        alt="Profile"
                        className="size-14 rounded-full object-cover shadow-md"
                      />
                    </div>
                    <div className="flex justify-between w-full items-center px-4">
                      <div>
                        <p className="font-semibold text-lg">{c.fullName}</p>
                        <p className="font-semibold text-lg">{c.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-base-content/60">
                          @{c.username}
                        </p>
                      </div>
                    </div>

                    {/* Remove button (disabled for protected users) */}
                    {!isProtectedUser && (
                      <div className="flex justify-center items-center">
                        <button
                          onClick={() => handleRemoveCompanion(c.username)}
                          className="btn btn-outline btn-error btn-sm flex items-center gap-1 mx-2"
                        >
                          X
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FamPage;

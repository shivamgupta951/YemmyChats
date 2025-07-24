import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  addCompanion,
  getCompanions,
  removeCompanion,
} from "../lib/companionApi";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";

function FamPage() {
  const [usernameToAdd, setUsernameToAdd] = useState("");
  const [companions, setCompanions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [targetUsername, setTargetUsername] = useState("");

  const navigate = useNavigate();

  const handleBack = () => navigate("/");

  const fetchCompanions = async () => {
    try {
      const res = await getCompanions();
      setCompanions(res.data);
    } catch {
      toast.error("Failed to fetch companions");
    }
  };

  useEffect(() => {
    fetchCompanions();
  }, []);

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

  const handleRemovePrompt = (username) => {
    if (["shivam2004", "YemmyChats"].includes(username)) {
      toast.error("Professional accounts can’t be removed!");
      return;
    }
    setTargetUsername(username);
    setShowModal(true);
  };

  const confirmRemove = async () => {
    try {
      await removeCompanion(targetUsername);
      toast.success("Companion removed successfully!");
      fetchCompanions();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to remove companion");
    } finally {
      setShowModal(false);
      setTargetUsername("");
    }
  };

  return (
    <div className="min-h-screen pt-28 px-4 bg-base-300">
      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="modal-box bg-base-100 max-w-sm w-full">
            <h3 className="font-bold text-lg">Remove Companion</h3>
            <p className="py-2">
              Are you sure you want to remove{" "}
              <span className="font-semibold">@{targetUsername}</span>?
            </p>
            <div className="modal-action">
              <button className="btn btn-error" onClick={confirmRemove}>
                Yes, Remove
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center mx-auto">
        <div className="w-full max-w-screen-md bg-base-100 border border-base-content rounded-xl p-4 sm:p-6 mb-10">
          <div className="flex justify-end">
            <button
              onClick={handleBack}
              className="btn btn-outline btn-accent btn-sm flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
            Your Profile Companions
          </h1>
          <div className="label-text mx-2 my-2 flex items-center">
            <Search className="size-5 mx-1" />
            Search User
          </div>
          <div className="flex flex-col sm:flex-row gap-2 mb-6">
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

          <h2 className="text-lg sm:text-xl font-semibold mb-2">
            Companions List
          </h2>
          <ul className="space-y-3">
            {companions.map((c) => {
              const isProtectedUser = ["shivam2004", "YemmyChats"].includes(
                c.username
              );

              return (
                <li
                  key={c._id}
                  className="p-3 border rounded-lg flex flex-col sm:flex-row items-center sm:justify-between gap-4"
                >
                  <div className="flex items-center gap-4 w-full">
                    <img
                      src={c.profilePic || "/avatar.png"}
                      alt="Profile"
                      className="w-14 h-14 rounded-full object-cover shadow-md"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-base sm:text-lg">
                        {c.fullName}
                      </p>
                      <p className="text-sm text-base-content/60">
                        @{c.username}
                      </p>
                      <p className="text-sm text-base-content/70">
                        {c.email}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemovePrompt(c.username)}
                      className={`btn btn-outline btn-error btn-sm ${
                        isProtectedUser ? "opacity-40 cursor-not-allowed" : ""
                      }`}
                    >
                      X
                    </button>
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

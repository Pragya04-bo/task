import { useState } from "react";
import { X, Plus, Check, Bookmark } from "lucide-react";
import type { UserProfileSummary } from "@/types";
import { useProfileStore } from "@/store/useProfileStore";
import { getProfileIdentifier } from "@/utils/dataHelpers";
import { motion, AnimatePresence } from "framer-motion";

interface AddToListModalProps {
  profile: UserProfileSummary | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AddToListModal({ profile, isOpen, onClose }: AddToListModalProps) {
  const { lists, createList, addProfileToList } = useProfileStore();
  const [newListName, setNewListName] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [feedback, setFeedback] = useState<{ listId: string; success: boolean; message: string } | null>(null);

  if (!profile) return null;

  const identifier = getProfileIdentifier(profile);

  const handleAdd = (listId: string) => {
    const res = addProfileToList(listId, profile);
    setFeedback({ listId, success: res.success, message: res.message });
    setTimeout(() => {
      setFeedback(null);
    }, 2500);
  };

  const handleCreateAndAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListName.trim()) return;
    const newList = createList(newListName.trim());
    setNewListName("");
    setShowCreateForm(false);
    handleAdd(newList.id);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-xl">
                  <Bookmark className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-base">Save to List</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Add @{identifier} to your saved lists</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              {/* List options */}
              <div className="space-y-2">
                {lists.map((list) => {
                  const isInList = list.profiles.some((p) => p.user_id === profile.user_id);
                  const listFeedback = feedback?.listId === list.id ? feedback : null;

                  return (
                    <div
                      key={list.id}
                      className="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-gray-800/80 hover:border-indigo-200 dark:hover:border-indigo-900/50 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/20 transition-all group"
                    >
                      <div className="flex-1 min-w-0 pr-3">
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate">{list.name}</h4>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          {list.profiles.length} {list.profiles.length === 1 ? "profile" : "profiles"}
                        </p>
                      </div>

                      {listFeedback ? (
                        <span
                          className={`text-xs px-2.5 py-1 rounded-lg font-medium flex items-center gap-1 animate-pulse ${
                            listFeedback.success
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                              : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                          }`}
                        >
                          {listFeedback.message}
                        </span>
                      ) : (
                        <button
                          onClick={() => handleAdd(list.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                            isInList
                              ? "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                              : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-200 dark:shadow-none"
                          }`}
                        >
                          {isInList ? (
                            <>
                              <Check className="w-3.5 h-3.5" /> Added
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" /> Add
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Create new list form */}
              {showCreateForm ? (
                <form onSubmit={handleCreateAndAdd} className="pt-2">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl space-y-3">
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">Create New List</label>
                    <input
                      type="text"
                      value={newListName}
                      onChange={(e) => setNewListName(e.target.value)}
                      placeholder="e.g., Q3 Tech Creators"
                      className="w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      autoFocus
                    />
                    <div className="flex gap-2 justify-end">
                      <button
                        type="button"
                        onClick={() => setShowCreateForm(false)}
                        className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={!newListName.trim()}
                        className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                      >
                        Create & Add
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="w-full py-2.5 px-3 border border-dashed border-gray-300 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-600 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center justify-center gap-2 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Create a new list
                </button>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-xl text-xs font-semibold transition-colors"
              >
                Done
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { useState } from "react";
import { X, Trash2, UserX, ExternalLink, BookmarkCheck, FolderOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProfileStore } from "@/store/useProfileStore";
import { formatFollowers } from "@/utils/formatters";
import { getProfileIdentifier } from "@/utils/dataHelpers";
import { Avatar } from "./Avatar";

interface MyListsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MyListsModal({ isOpen, onClose }: MyListsModalProps) {
  const { lists, deleteList, removeProfileFromList } = useProfileStore();
  const [selectedListId, setSelectedListId] = useState<string>(lists[0]?.id || "");
  const navigate = useNavigate();

  if (!isOpen) return null;

  const currentList = lists.find((l) => l.id === selectedListId) || lists[0];

  const handleNavigateToProfile = (identifier: string) => {
    onClose();
    navigate(`/profile/${identifier}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl h-[80vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-xl">
              <BookmarkCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 dark:text-white text-lg">My Saved Lists</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Manage your saved influencer shortlists</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Left sidebar lists, Right panel profiles */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 border-r border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-900/50 p-3 overflow-y-auto space-y-1">
            <div className="px-2 py-1.5 text-[11px] font-semibold tracking-wider text-gray-400 dark:text-gray-500 uppercase">
              Your Lists ({lists.length})
            </div>
            {lists.map((list) => (
              <button
                key={list.id}
                onClick={() => setSelectedListId(list.id)}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between group ${
                  currentList?.id === list.id
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none font-medium"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <div className="truncate pr-2">
                  <div className="text-sm font-semibold truncate">{list.name}</div>
                  <div
                    className={`text-xs ${
                      currentList?.id === list.id ? "text-indigo-100" : "text-gray-400 dark:text-gray-500"
                    }`}
                  >
                    {list.profiles.length} items
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Main List Content */}
          <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 overflow-hidden">
            {currentList ? (
              <>
                {/* List Title Header */}
                <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/20 dark:bg-gray-800/20">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-base">{currentList.name}</h3>
                    <p className="text-xs text-gray-400">
                      Contains {currentList.profiles.length} saved influencer profiles
                    </p>
                  </div>
                  {lists.length > 1 && (
                    <button
                      onClick={() => {
                        if (confirm(`Delete list "${currentList.name}"?`)) {
                          deleteList(currentList.id);
                          setSelectedListId(lists.find((l) => l.id !== currentList.id)?.id || "");
                        }
                      }}
                      className="px-3 py-1.5 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Delete List
                    </button>
                  )}
                </div>

                {/* Profiles Grid */}
                <div className="flex-1 p-4 overflow-y-auto">
                  {currentList.profiles.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400 dark:text-gray-500">
                      <FolderOpen className="w-12 h-12 mb-2 stroke-[1.5] text-gray-300 dark:text-gray-600" />
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This list is currently empty</p>
                      <p className="text-xs mt-1">Search for influencers and click "Add to List" to add them here.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {currentList.profiles.map((profile) => {
                        const identifier = getProfileIdentifier(profile);
                        return (
                          <div
                            key={profile.user_id}
                            className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30 transition-all group"
                          >
                            <Avatar
                              src={profile.picture}
                              alt={profile.fullname || identifier}
                              name={profile.fullname || identifier}
                              className="w-10 h-10 border border-gray-200 dark:border-gray-700"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-xs text-gray-900 dark:text-white truncate">
                                @{identifier}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{profile.fullname}</div>
                              <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium mt-0.5">
                                {formatFollowers(profile.followers)} followers
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleNavigateToProfile(identifier)}
                                title="View Profile"
                                className="p-1.5 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => removeProfileFromList(currentList.id, profile.user_id)}
                                title="Remove from List"
                                className="p-1.5 text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
                              >
                                <UserX className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

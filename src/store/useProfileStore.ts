import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Platform, UserProfileSummary } from "@/types";

export interface CustomList {
  id: string;
  name: string;
  createdAt: number;
  profiles: UserProfileSummary[];
}

interface ProfileStoreState {
  selectedPlatform: Platform;
  searchQuery: string;
  lists: CustomList[];
  
  // Actions
  setPlatform: (platform: Platform) => void;
  setSearchQuery: (query: string) => void;
  createList: (name: string) => CustomList;
  deleteList: (listId: string) => void;
  addProfileToList: (listId: string, profile: UserProfileSummary) => { success: boolean; message: string };
  removeProfileFromList: (listId: string, userId: string) => void;
}

export const useProfileStore = create<ProfileStoreState>()(
  persist(
    (set, get) => ({
      selectedPlatform: "instagram",
      searchQuery: "",
      lists: [
        {
          id: "default-favorites",
          name: "Favorites",
          createdAt: Date.now(),
          profiles: [],
        },
      ],

      setPlatform: (platform) => set({ selectedPlatform: platform }),
      setSearchQuery: (query) => set({ searchQuery: query }),

      createList: (name) => {
        const newList: CustomList = {
          id: `list-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          name: name.trim() || "Untitled List",
          createdAt: Date.now(),
          profiles: [],
        };
        set((state) => ({ lists: [...state.lists, newList] }));
        return newList;
      },

      deleteList: (listId) => {
        set((state) => ({
          lists: state.lists.filter((l) => l.id !== listId),
        }));
      },

      addProfileToList: (listId, profile) => {
        const { lists } = get();
        const targetList = lists.find((l) => l.id === listId);

        if (!targetList) {
          return { success: false, message: "List not found" };
        }

        const exists = targetList.profiles.some(
          (p) => p.user_id === profile.user_id || p.username === profile.username
        );

        if (exists) {
          return { success: false, message: `Already in "${targetList.name}"` };
        }

        const updatedLists = lists.map((list) => {
          if (list.id === listId) {
            return {
              ...list,
              profiles: [...list.profiles, profile],
            };
          }
          return list;
        });

        set({ lists: updatedLists });
        return { success: true, message: `Added to "${targetList.name}"` };
      },

      removeProfileFromList: (listId, userId) => {
        set((state) => ({
          lists: state.lists.map((list) => {
            if (list.id === listId) {
              return {
                ...list,
                profiles: list.profiles.filter((p) => p.user_id !== userId),
              };
            }
            return list;
          }),
        }));
      },
    }),
    {
      name: "vibe-influencer-store",
    }
  )
);

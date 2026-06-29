import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { AddToListModal } from "@/components/AddToListModal";
import { Avatar } from "@/components/Avatar";
import type { FullUserProfile, ProfileDetailResponse } from "@/types";
import { formatEngagementRate, formatFollowers } from "@/utils/formatters";
import { loadProfileByUsername } from "@/utils/profileLoader";
import {
  ArrowLeft,
  BookmarkPlus,
  ExternalLink,
  Users,
  TrendingUp,
  Heart,
  MessageSquare,
  Eye,
  Activity,
  Award,
} from "lucide-react";

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform") || "instagram";
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    if (!username) return;

    loadProfileByUsername(username).then((data) => {
      setProfileData(data);
      setLoaded(true);
    });
  }, [username]);

  if (!username) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Invalid profile requested</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Search
          </Link>
        </div>
      </Layout>
    );
  }

  if (!loaded) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto space-y-6 animate-pulse p-4">
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
          <div className="flex gap-6 items-center">
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
            <div className="space-y-3 flex-1">
              <div className="h-6 w-48 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!profileData || !profileData.data?.user_profile) {
    return (
      <Layout>
        <div className="max-w-md mx-auto text-center py-12 px-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Profile Details Unavailable</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
            Detailed analytical metrics are currently only available for flagship benchmark accounts on this platform.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Discovery Search
          </Link>
        </div>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;
  const identifier = user.username || user.handle || user.custom_name || user.user_id;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Back navigation */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to discovery search
        </Link>

        {/* Profile Card Header */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
            <Avatar
              src={user.picture}
              alt={user.fullname || identifier}
              name={user.fullname || identifier}
              className="w-24 h-24 sm:w-28 sm:h-28 border-4 border-white dark:border-gray-800 shadow-lg"
            />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                  @{identifier}
                </h1>
                <VerifiedBadge verified={user.is_verified} className="w-5 h-5" />
                <span className="capitalize text-xs font-bold px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-700">
                  {platform}
                </span>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">
                {user.fullname}
              </p>

              {user.description && (
                <p className="mt-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
                  {user.description}
                </p>
              )}

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-200 dark:shadow-none flex items-center gap-2 transition-all active:scale-95"
                >
                  <BookmarkPlus className="w-4 h-4" /> Add to Saved List
                </button>

                {user.url && (
                  <a
                    href={user.url}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors"
                  >
                    <span>View Platform Profile</span>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800/80">
            <h3 className="text-xs font-bold tracking-wider text-gray-400 dark:text-gray-500 uppercase mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-500" /> Key Analytics & Performance
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {/* Followers */}
              <div className="p-4 bg-gray-50/50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 rounded-2xl">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <Users className="w-3.5 h-3.5 text-indigo-500" /> Followers
                </div>
                <div className="text-lg font-extrabold text-gray-900 dark:text-white">
                  {formatFollowers(user.followers)}
                </div>
              </div>

              {/* Engagement Rate */}
              <div className="p-4 bg-gray-50/50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 rounded-2xl">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> Engagement Rate
                </div>
                <div className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
                  {formatEngagementRate(user.engagement_rate)}
                </div>
              </div>

              {/* Total Engagements */}
              {user.engagements !== undefined && (
                <div className="p-4 bg-gray-50/50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 rounded-2xl">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <Activity className="w-3.5 h-3.5 text-purple-500" /> Engagements
                  </div>
                  <div className="text-lg font-extrabold text-gray-900 dark:text-white">
                    {formatFollowers(user.engagements)}
                  </div>
                </div>
              )}

              {/* Avg Likes */}
              {user.avg_likes !== undefined && (
                <div className="p-4 bg-gray-50/50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 rounded-2xl">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <Heart className="w-3.5 h-3.5 text-rose-500" /> Avg Likes
                  </div>
                  <div className="text-lg font-extrabold text-gray-900 dark:text-white">
                    {formatFollowers(user.avg_likes)}
                  </div>
                </div>
              )}

              {/* Avg Comments */}
              {user.avg_comments !== undefined && (
                <div className="p-4 bg-gray-50/50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 rounded-2xl">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <MessageSquare className="w-3.5 h-3.5 text-sky-500" /> Avg Comments
                  </div>
                  <div className="text-lg font-extrabold text-gray-900 dark:text-white">
                    {formatFollowers(user.avg_comments)}
                  </div>
                </div>
              )}

              {/* Avg Views */}
              {user.avg_views !== undefined && user.avg_views > 0 && (
                <div className="p-4 bg-gray-50/50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 rounded-2xl">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <Eye className="w-3.5 h-3.5 text-amber-500" /> Avg Views
                  </div>
                  <div className="text-lg font-extrabold text-gray-900 dark:text-white">
                    {formatFollowers(user.avg_views)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add To List Modal */}
      <AddToListModal
        profile={user}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </Layout>
  );
}

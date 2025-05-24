"use client";
import { Button } from "@/components";
import { PictureIcon, TrashIcon } from "@/components/icons";
import { useProfile } from "@/hooks/useProfile";
import Image from "next/image";
import { useState } from "react";

const AvatarForm = () => {
  const {
    profile,
    isUploadingAvatar,
    isRemovingAvatar,
    updateAvatar,
    removeAvatar,
  } = useProfile();
  const [timestamp, setTimestamp] = useState(Date.now());

  // Get avatar URL with timestamp to prevent caching
  const avatarUrl = profile?.avatarUrl
    ? `${profile.avatarUrl}?t=${timestamp}`
    : null;

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    updateAvatar(file);

    // Update timestamp for cache busting
    setTimestamp(Date.now());

    // Reset the file input
    event.target.value = "";
  };

  const handleRemoveAvatar = () => {
    removeAvatar();
  };

  return (
    <div className="mt-8 flex gap-8 items-center">
      <div className="relative w-[120px] h-[120px] rounded-full overflow-hidden bg-slate-300">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt="Profile avatar"
            fill
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-2xl text-slate-500 font-semibold">
            {profile?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <input
          type="file"
          id="profile-image"
          accept="image/jpeg, image/png, image/gif"
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploadingAvatar}
        />
        <Button
          variant="icon"
          icon={<PictureIcon />}
          label={isUploadingAvatar ? "Uploading..." : "Change"}
          className="border-purple-600 border-2 text-purple-600 px-4 py-1 hover:border-purple-700"
          onClick={() => document.getElementById("profile-image")?.click()}
          disabled={isUploadingAvatar}
        />
        <Button
          variant="icon"
          icon={<TrashIcon />}
          label="Remove"
          className="border-purple-600 border-2 text-purple-600 px-4 py-1 hover:border-purple-700"
          onClick={handleRemoveAvatar}
          disabled={!avatarUrl || isRemovingAvatar}
        />
      </div>
    </div>
  );
};

export default AvatarForm;

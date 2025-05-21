"use client";
import { Button } from "@/components";
import { PictureIcon, TrashIcon } from "@/components/icons";

const AvatarForm = () => {
  return (
    <div className="mt-8 flex gap-8 items-center">
      <div className="bg-slate-300 w-42 h-42 rounded-full" />
      <div className="flex flex-col gap-2">
        <input
          type="file"
          id="profile-image"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              // Handle the uploaded image here
              console.log("File uploaded:", file);
            }
          }}
        />
        <Button
          variant="icon"
          icon={<PictureIcon />}
          label="Change"
          className="border-purple-600 border-2 text-purple-600 px-4 py-1 hover:border-purple-700"
          onClick={() => document.getElementById("profile-image")?.click()}
        />
        <Button
          variant="icon"
          icon={<TrashIcon />}
          label="Remove"
          className="border-purple-600 border-2 text-purple-600 px-4 py-1 hover:border-purple-700"
        />
      </div>
    </div>
  );
};

export default AvatarForm;

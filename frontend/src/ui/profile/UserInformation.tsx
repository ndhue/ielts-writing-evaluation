"use client";
import { Button, Input, Textarea } from "@/components";
import { ProfileData, profileSchema, useProfile } from "@/hooks/useProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ChangePasswordDialog from "./ChangePasswordDialog";

const UserInformation = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { profile, isLoading, isUpdating, updateProfile } = useProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      target: null,
      description: "",
    },
  });

  useEffect(() => {
    if (profile) {
      setValue("name", profile.name);
      setValue("email", profile.email);
      setValue("target", profile.target);
      setValue("description", profile.description);
    }
  }, [profile, setValue]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (profile) {
      reset({
        name: profile.name,
        email: profile.email,
        target: profile.target,
        description: profile.description,
      });
    }
    setIsEditing(false);
  };

  const onSubmit = (data: ProfileData) => {
    updateProfile(data);
    setIsEditing(false);
  };

  return (
    <div className="mt-8 flex flex-col gap-4 text-sm">
      <form onSubmit={handleSubmit(onSubmit)} id="profile-form">
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-2">
            <div className="name">
              <label htmlFor="name">Name</label>
              <Input
                {...register("name")}
                type="text"
                className="mt-1 py-2.5 px-2"
                disabled={!isEditing || isLoading}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message?.toString()}
                </p>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <Input
                {...register("email")}
                type="text"
                className="mt-1 py-2.5 px-2"
                // Email should never be editable
                disabled={true}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message?.toString()}
                </p>
              )}
            </div>
            <div className="target">
              <label htmlFor="target">Your target</label>
              <Input
                {...register("target")}
                type="number"
                step="0.5"
                min="0"
                max="9"
                className="mt-1 py-2.5 px-2"
                disabled={!isEditing || isLoading}
              />
              {errors.target && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.target.message?.toString()}
                </p>
              )}
            </div>
            <ChangePasswordDialog />
          </div>
          <div className="desc">
            <label htmlFor="description">Description</label>
            <Textarea
              {...register("description")}
              className="mt-1 py-2.5 px-2"
              rows={5}
              disabled={!isEditing || isLoading}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message?.toString()}
              </p>
            )}
          </div>
        </div>

        <div className="buttons mt-4">
          {!isEditing ? (
            <Button
              variant="primary"
              label="Edit Profile"
              onClick={handleEdit}
              className="w-1/4 rounded-md border-2"
              disabled={isLoading}
            />
          ) : (
            <div className="flex items-center gap-4 w-1/2 pr-4">
              <Button
                variant="secondary"
                label="Cancel"
                onClick={handleCancel}
                className="w-1/2 rounded-md border-2 border-purple-600 text-purple-600"
                disabled={isUpdating}
                type="button"
              />
              <Button
                variant="primary"
                label={isUpdating ? "Saving..." : "Save"}
                className="w-1/2 rounded-md border-2"
                disabled={isUpdating}
                type="submit"
                form="profile-form"
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserInformation;

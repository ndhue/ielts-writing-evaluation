"use client";
import { Button, Input, Textarea } from "@/components";
import { useState } from "react";
import ChangePasswordDialog from "./ChangePasswordDialog";

const UserInformation = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    // Save logic would go here
    setIsEditing(false);
  };

  return (
    <div className="mt-8 flex flex-col gap-4 text-sm">
      <div className="grid grid-cols-2 gap-8">
        <div className="name">
          <label htmlFor="name">Name</label>
          <Input
            name="name"
            type="text"
            className="mt-1 py-2.5 px-2"
            disabled={!isEditing}
          />
        </div>
        <div className="target">
          <label htmlFor="target">Your target</label>
          <Input
            name="target"
            type="number"
            className="mt-1 py-2.5 px-2"
            disabled={!isEditing}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <div className="email">
            <label htmlFor="email">Email</label>
            <Input
              name="email"
              type="text"
              className="mt-1 py-2.5 px-2"
              disabled={!isEditing}
            />
          </div>
          <div className="password mt-3">
            <label htmlFor="password">Password</label>
            <Input
              name="password"
              type="password"
              className="mt-1 py-2.5 px-2"
              disabled={!isEditing}
            />
            <ChangePasswordDialog />
          </div>
        </div>
        <div className="desc">
          <label htmlFor="desc">Description</label>
          <Textarea
            name="desc"
            className="mt-1 py-2.5 px-2"
            rows={5}
            disabled={!isEditing}
          />
        </div>
      </div>
      <div className="buttons">
        {!isEditing ? (
          <Button
            variant="primary"
            label="Edit Profile"
            onClick={handleEdit}
            className="w-1/4 rounded-md border-2"
          />
        ) : (
          <div className="flex items-center gap-4 w-1/2 pr-4">
            <Button
              variant="secondary"
              label="Cancel"
              onClick={handleCancel}
              className="w-1/2 rounded-md border-2 border-purple-600 text-purple-600"
            />
            <Button
              variant="primary"
              label="Save"
              onClick={handleSave}
              className="w-1/2 rounded-md border-2"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInformation;

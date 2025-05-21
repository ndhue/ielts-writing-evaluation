import { Button, Input } from "@/components";

const ChangePasswordForm = ({
  onClose,
}: // handleSave,
{
  onClose: () => void;
  // handleSave: () => void;
}) => {
  return (
    <>
      <p className="font-bold text-2xl">Change Password</p>
      <div className="password mt-6">
        <label htmlFor="oldPassword">Old password</label>
        <Input
          name="oldPassword"
          type="oldPassword"
          className="w-[300px] mt-1 py-2"
        />
      </div>
      <div className="password mt-6">
        <label htmlFor="newPassword">New password</label>
        <Input
          name="newPassword"
          type="newPassword"
          className="w-[300px] mt-1 py-2"
        />
      </div>
      <div className="password mt-6">
        <label htmlFor="confirmPassword">Confirm password</label>
        <Input
          name="confirmPassword"
          type="confirmPassword"
          className="w-[300px] mt-1 py-2"
        />
      </div>
      <div className="mt-6 flex items-center gap-4">
        <Button
          variant="secondary"
          label="Cancel"
          onClick={onClose}
          className="w-1/2 rounded-md border-2"
        />
        <Button
          variant="primary"
          label="Save"
          // onClick={handleSave}
          className="w-1/2 rounded-md border-2"
        />
      </div>
    </>
  );
};

export default ChangePasswordForm;

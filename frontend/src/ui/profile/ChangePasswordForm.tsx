import { Button, Input } from "@/components";
import { passwordSchema, useProfile } from "@/hooks/useProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePasswordForm = ({ onClose }: { onClose: () => void }) => {
  const { changePassword, isChangingPassword } = useProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmitPassword = (data: ChangePasswordForm) => {
    changePassword(data, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  return (
    <>
      <p className="font-bold text-2xl">Change Password</p>
      <div className="password mt-6">
        <label htmlFor="currentPassword">Current password</label>
        <Input
          {...register("currentPassword")}
          type="password"
          className="w-[300px] mt-1 py-2"
          disabled={isChangingPassword}
          autoComplete="current-password"
        />
        {errors.currentPassword && (
          <p className="text-red-500 text-xs mt-1">
            {errors.currentPassword.message?.toString()}
          </p>
        )}
      </div>
      <div className="password mt-6">
        <label htmlFor="newPassword">New password</label>
        <Input
          {...register("newPassword")}
          type="password"
          className="w-[300px] mt-1 py-2"
          disabled={isChangingPassword}
          autoComplete="new-password"
        />
        {errors.newPassword && (
          <p className="text-red-500 text-xs mt-1">
            {errors.newPassword.message?.toString()}
          </p>
        )}
      </div>
      <div className="password mt-6">
        <label htmlFor="confirmPassword">Confirm password</label>
        <Input
          {...register("confirmPassword")}
          type="password"
          className="w-[300px] mt-1 py-2"
          disabled={isChangingPassword}
          autoComplete="new-password"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">
            {errors.confirmPassword.message?.toString()}
          </p>
        )}
      </div>
      <div className="mt-6 flex items-center gap-4">
        <Button
          variant="secondary"
          label="Cancel"
          onClick={onClose}
          className="w-1/2 rounded-md border-2"
          disabled={isChangingPassword}
          type="button"
        />
        <Button
          variant="primary"
          label={isChangingPassword ? "Saving..." : "Save"}
          className="w-1/2 rounded-md border-2"
          disabled={isChangingPassword}
          onClick={handleSubmit(onSubmitPassword)}
          type="button"
        />
      </div>
    </>
  );
};

export default ChangePasswordForm;

import { AvatarForm, UserInformation } from "@/ui/profile";

const ProfilePage = () => {
  return (
    <div className="flex justify-center items-center h-full bg-white">
      <div className="border border-border rounded-2xl w-[70%] py-8 px-10">
        <p className="text-2xl font-bold">Account preferences</p>
        <AvatarForm />
        <UserInformation />
      </div>
    </div>
  );
};

export default ProfilePage;

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const UserAvatar = () => {
  const storedEmail = localStorage.getItem("userEmail");
  const email = storedEmail && storedEmail !== "null" ? storedEmail : "User";
  const avatarLetter = email.trim().charAt(0).toUpperCase();

  return (
    <Avatar className="h-10 w-10">
      <AvatarFallback>{avatarLetter}</AvatarFallback>
    </Avatar>
  );
};

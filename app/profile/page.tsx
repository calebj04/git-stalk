"use client";

import { useState } from "react";
import { Button } from "@/components/auth/ui/button";
import { createClient } from "@/lib/supabase/client";

export default function Profile() {
  const supabase = createClient();

  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    try {
      let avatar_url: string | null = null;

      if (avatar) {
        const fileExt = avatar.name.split(".").pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const filePath = `avatars/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, avatar);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("avatars")
          .getPublicUrl(filePath);
        avatar_url = data.publicUrl;
      }

      const { data: userData, error: profileError } = await supabase
        .from("profiles")
        .upsert({
          id: (await supabase.auth.getUser()).data.user?.id,
          username,
          avatar_url,
        });

      if (profileError) throw profileError;
      console.log("Profile saved:", userData);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center p-12">
      <div className="bg-white rounded-xl w-full max-w-sm h-96 p-7 flex flex-col items-center justify-between">
        <div className="flex flex-col items-center mt-6">
          <label
            htmlFor="avatar-upload"
            className="cursor-pointer group w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition"
          >
            {avatar ? (
              <img
                src={URL.createObjectURL(avatar)}
                alt="Avatar"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 5v14M5 12h14"
                  stroke="#16a349"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              e.target.files ? setAvatar(e.target.files[0]) : null
            }
          />
        </div>

        <div className="cursor-text group mb-5">
          <input
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-white text-black focus:outline-none text-center h-full text-2xl"
          ></input>
          <div className="bg-gray-200 h-1 rounded-full group-hover:bg-gray-300 transition"></div>
        </div>

        <div className="w-full">
          <Button
            className="w-full"
            type="button"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Profile"}
          </Button>
          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
}

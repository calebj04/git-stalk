"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/auth/ui/button";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

export default function Profile() {
  const supabase = createClient();

  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null); // This stores the "active" image (DB or Preview)
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("username, avatar_url")
        .eq("id", user.id)
        .single();

      if (data) {
        setUsername(data.username || "");
        setAvatarUrl(data.avatar_url);
      }
      setIsLoading(false);
    };

    fetchProfile();
  }, [supabase]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarUrl(URL.createObjectURL(file)); // Create local preview
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      let finalAvatarUrl = avatarUrl; // Default to current URL (prevents overwriting with null)

      if (avatarFile) {
        const filePath = `avatars/${user.id}-${Math.random()}.${avatarFile.name.split(".").pop()}`;
        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, avatarFile);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("avatars")
          .getPublicUrl(filePath);
        finalAvatarUrl = data.publicUrl;
      }

      const { error: profileError } = await supabase.from("profiles").upsert({
        id: user.id,
        username,
        avatar_url: finalAvatarUrl,
      });

      if (profileError) throw profileError;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading)
    return <div className="p-12 text-center text-2xl">Loading...</div>;

  return (
    <div className="w-full flex items-center justify-center p-12">
      <div className="bg-white rounded-xl w-full max-w-sm h-96 p-7 flex flex-col items-center justify-between">
        <div className="flex flex-col items-center mt-6">
          <label
            htmlFor="avatar-upload"
            className="relative cursor-pointer group w-32 h-32 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center hover:bg-gray-300 transition"
          >
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="Avatar"
                fill
                className="object-cover"
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
            onChange={handleFileChange}
          />
        </div>

        <div className="group mb-5 w-full">
          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-white text-black focus:outline-none text-center text-2xl"
          />
          <div className="bg-gray-200 h-1 rounded-full group-hover:bg-gray-300 transition" />
        </div>

        <div className="w-full">
          <Button className="w-full" onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Profile"}
          </Button>
          {error && (
            <p className="text-red-500 mt-2 text-sm text-center">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}

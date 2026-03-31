"use server";

import { revalidatePath } from "next/cache";

export async function refreshUserProfile() {
  revalidatePath("/", "layout");
}

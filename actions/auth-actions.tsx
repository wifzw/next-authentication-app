"use server";

import { redirect } from "next/navigation";

import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { createUser, getUserByEmail } from "@/lib/user";
import { createAuthSession, destroySession } from "@/lib/auth";

export async function signUp(prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  let errors: { email?: string; password?: string } = {};

  if (!email || !email?.includes("@")) {
    errors.email = "Please enter a valid email address.";
  }

  if (password && password?.trim().length < 8) {
    errors.email = "Password must be at least 8 characters long.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
    };
  }

  const hashedPassword = hashUserPassword(password!);

  try {
    const id = createUser(email!, hashedPassword);

    await createAuthSession(id);

    redirect("/training");
  } catch (error: any) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return {
        errors: {
          email:
            "It seems like an account for the chosen email already exists.",
        },
      };
    }

    throw error;
  }
}

export async function login(prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  const existingUser = getUserByEmail(email);

  if (!existingUser) {
    return {
      errors: {
        email: "Could not authenticate user, please check your credentials.",
      },
    };
  }

  const isValidPassword = verifyPassword(existingUser.password, password);

  if (!isValidPassword) {
    return {
      errors: {
        password: "Could not authenticate user, please check your credentials.",
      },
    };
  }

  await createAuthSession(existingUser.id);
  redirect("/training");
}

export async function auth(
  mode: "login" | "signup",
  prevState: unknown,
  formData: FormData
) {
  if (mode === "login") {
    return login(prevState, formData);
  }

  return signUp(prevState, formData);
}

export async function logout() {
  await destroySession();
  redirect("/");
}

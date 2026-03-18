import { Octokit, type RequestError } from "octokit";

const octokit = new Octokit();

type GitHubUser = Awaited<
  ReturnType<Octokit["rest"]["users"]["getByUsername"]>
>["data"];

type UserEvents = Awaited<
  ReturnType<Octokit["rest"]["activity"]["listPublicEventsForUser"]>
>["data"];

export async function getGitHubUser(username: string): Promise<GitHubUser> {
  try {
    const res = await octokit.request(`GET /users/${username}`, {
      username,
      headers: {
        "X-GitHub-Api-Version": "2026-03-10",
      },
    });
    return res.data;
  } catch (err) {
    const error = err as RequestError;
    if (error.status === 404) {
      throw new Error(`User "${username}" not found.`);
    } else if (error.status === 403) {
      throw new Error("Rate limit exceeded. Try again later.");
    } else {
      throw new Error(`Unexpected error: ${error.message}`);
    }
  }
}

export async function getLastActiveCommit(
  username: string,
): Promise<string | null> {
  try {
    const res = await octokit.request("GET /users/{username}/events/public", {
      username,
      per_page: 10,
      headers: {
        "X-GitHub-Api-Version": "2026-03-10",
      },
    });

    const events: UserEvents = res.data;

    // Find first PushEvent (contains commits)
    const pushEvent = events.find((event) => event.type === "PushEvent");

    return pushEvent?.created_at ?? null;
  } catch (err) {
    const error = err as RequestError;

    if (error.status === 404) {
      throw new Error(`User "${username}" not found.`);
    } else if (error.status === 403) {
      throw new Error("Rate limit exceeded. Try again later.");
    } else {
      throw new Error(`Unexpected error: ${error.message}`);
    }
  }
}

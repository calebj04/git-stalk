import { Octokit, type RequestError } from "octokit";
import { timeAgo } from "@/lib/stats";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

type GitHubUser = Awaited<
  ReturnType<Octokit["rest"]["users"]["getByUsername"]>
>["data"];

type UserEvents = Awaited<
  ReturnType<Octokit["rest"]["activity"]["listPublicEventsForUser"]>
>["data"];

type UserInfo = {
  user: GitHubUser;

  stats: {
    followers: number;
    following: number;
    repos: number;
    stars: number;
  };

  lastActive: {
    time: string;
    url: string | null;
  };
};

export async function getUserInfo(
  username: string,
): Promise<UserInfo> {
  try {
    const [userRes, eventsRes, starredRes] = await Promise.all([
      octokit.request("GET /users/{username}", {
        username,
        headers: { "X-GitHub-Api-Version": "2026-03-10" },
      }),

      octokit.request("GET /users/{username}/events/public", {
        username,
        per_page: 10,
        headers: { "X-GitHub-Api-Version": "2026-03-10" },
      }),

      octokit.request("GET /users/{username}/starred", {
        username,
        per_page: 1,
        headers: { "X-GitHub-Api-Version": "2026-03-10" },
      }),
    ]);

    const user = userRes.data;
    const events: UserEvents = eventsRes.data;

    const pushEvent = events.find((e) => e.type === "PushEvent");

    const lastActiveTime = pushEvent?.created_at
      ? timeAgo(pushEvent.created_at)
      : "No recent activity";

    const repoUrl = pushEvent?.repo?.name
      ? `https://github.com/${pushEvent.repo.name}`
      : null;

    let starredCount = 0;
    const linkHeader = starredRes.headers.link;

    if (linkHeader) {
      const match = linkHeader.match(/&page=(\d+)>; rel="last"/);
      if (match) starredCount = parseInt(match[1], 10);
    } else {
      starredCount = starredRes.data.length;
    }

    return {
      user,

      stats: {
        followers: user.followers,
        following: user.following,
        repos: user.public_repos,
        stars: starredCount,
      },

      lastActive: {
        time: lastActiveTime,
        url: repoUrl,
      },
    };
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

import { readFile, writeFile } from "node:fs/promises";

const owner = process.env.GITHUB_REPOSITORY_OWNER || "RobersonCodes";
const token = process.env.GITHUB_TOKEN;
const readmePath = new URL("../../README.md", import.meta.url);
const startMarker = "<!-- AUTO-REPOS:START -->";
const endMarker = "<!-- AUTO-REPOS:END -->";

const excluded = new Set([
  owner.toLowerCase(),
  "aula-06",
  "aula-pratica-git",
  "meu-projeto",
  "meu-projeto-git-1",
]);

const response = await fetch(
  `https://api.github.com/users/${owner}/repos?type=owner&sort=created&direction=desc&per_page=100`,
  {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": `${owner}-profile-readme`,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  },
);

if (!response.ok) {
  throw new Error(`GitHub API returned ${response.status}: ${await response.text()}`);
}

const repositories = (await response.json())
  .filter((repo) => !repo.fork && !repo.archived && !excluded.has(repo.name.toLowerCase()))
  .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  .slice(0, 5);

const compact = (value, max = 70) => {
  const normalized = (value || "Repository without a public description.")
    .replace(/\s+/g, " ")
    .trim();
  return normalized.length > max ? `${normalized.slice(0, max - 1).trimEnd()}…` : normalized;
};

const lines = repositories.map((repo) => {
  const language = repo.language ? ` · \`${repo.language}\`` : "";
  const created = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(new Date(repo.created_at));
  return `- [**${repo.name}**](${repo.html_url}) —\n  ${compact(repo.description)}${language} · created ${created}`;
});

const block = `${startMarker}\n${lines.join("\n")}\n${endMarker}`;
const readme = await readFile(readmePath, "utf8");
const markerPattern = new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`);

if (!markerPattern.test(readme)) {
  throw new Error("Automatic repository markers were not found in README.md");
}

const nextReadme = readme.replace(markerPattern, block);
if (nextReadme !== readme) {
  await writeFile(readmePath, nextReadme, "utf8");
  console.log(`Updated ${repositories.length} recent public repositories.`);
} else {
  console.log("README repository list is already current.");
}

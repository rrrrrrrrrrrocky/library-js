const path = require("path");
const resolveFrom = require("resolve-from");

const SEMVER_TYPES = ["patch", "minor", "major"];

async function main() {
  // cjs를 지원하지 않는 패키지
  const { execa } = await import("execa");
  const args = process.argv;
  const releaseType = args[args.indexOf("--release-type") + 1];
  const semverType = args[args.indexOf("--semver-type") + 1];
  const isCanary = releaseType !== "stable";

  if (releaseType !== "stable" && releaseType !== "canary") {
    console.log(
      `Invalid release type ${releaseType}, must be stable or canary`
    );
    return;
  }
  if (!isCanary && !SEMVER_TYPES.includes(semverType)) {
    console.log(
      `Invalid semver type ${semverType}, must be one of ${SEMVER_TYPES.join(
        ", "
      )}`
    );
    return;
  }

  const githubToken = process.env.GITHUB_TOKEN;
  const npmToken = process.env.NPM_TOKEN;

  if (!githubToken) {
    throw new Error("Missing GITHUB_TOKEN");
  }

  if (!npmToken) {
    throw new Error("Missing NPM_TOKEN");
  }

  const configStorePath = resolveFrom(
    path.join(process.cwd(), "node_modules/release"),
    "configstore"
  );
  const ConfigStore = require(configStorePath);

  const config = new ConfigStore("release");
  config.set("token", githubToken);

  await execa(
    `git remote set-url origin https://x-access-token:${githubToken}@github.com/rrrrrrrrrrrocky/library-js.git`,
    { stdio: "inherit", shell: true }
  );
  await execa(`git config user.name "github-actions[bot]"`, {
    stdio: "inherit",
    shell: true,
  });
  await execa(
    `git config user.email "41898282+github-actions[bot]@users.noreply.github.com"`,
    {
      stdio: "inherit",
      shell: true,
    }
  );

  console.log(`Running pnpm release-${isCanary ? "canary" : "stable"}...`);
  const preReleaseType =
    semverType === "major"
      ? "premajor"
      : semverType === "minor"
      ? "preminor"
      : "prerelease";

  const child = execa(
    isCanary
      ? `pnpm lerna version ${preReleaseType} --preid canary --force-publish -y`
      : `pnpm lerna version ${semverType} --force-publish -y`,
    {
      stdio: "pipe",
      shell: true,
    }
  );

  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
  await child;
  console.log("Release process is finished");
}

main();

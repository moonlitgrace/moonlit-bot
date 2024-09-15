import { Probot } from "probot";

export default (app: Probot) => {
  app.on("push", async (context) => {
    const payload = context.payload;

    if (payload.ref === 'refs/heads/main') {
      const owner = payload.repository.owner.login
      const repo = payload.repository.name

      try {
        const forks = await context.octokit.repos.listForks({
          owner,
          repo
        });

        for (const fork of forks.data) {
          const forkOwner = fork.owner.login
          const forkRepo = fork.name

          app.log.info(`Checking for existing pull request on fork: ${forkOwner}/${forkRepo}`);

          const existingPRs = await context.octokit.pulls.list({
            owner: forkOwner,
            repo: forkRepo,
            head: `${owner}:main`,
            state: 'open'
          })

          if (existingPRs.data.length > 0) {
            app.log.info(`Existing pull request found for ${forkOwner}/${forkRepo}. Skipping new PR creation.`);
            continue;
          }

          app.log.info(`Fetching installation_id for fork: ${forkOwner}/${forkRepo}`);

          const installation = await context.octokit.apps.getRepoInstallation({
            owner: forkOwner,
            repo: forkRepo,
          })

          const installationId = installation.data.id;

          const forkOctokit = await app.auth(installationId);

          app.log.info(`Creating pull request for fork: ${forkOwner}/${forkRepo}`);

          await forkOctokit.pulls.create({
            owner: forkOwner,
            repo: forkRepo,
            title: 'chore: Sync with upstream changes',
            head: `${owner}:main`,
            base: fork.default_branch || 'main',
            body: 'This PR contains updates from the upstream repository.',
            maintainer_can_modify: false,
          })

          app.log.info(`Pull request created for ${forkOwner}/${forkRepo}`);
        }
      } catch (err) {
        app.log.error(err)
      }
    }
  });
};

[&#X21e7; back to the "README" &#X21e7;](../../../README.md)

# How to create and push a local repo to GitHub

1. After installing "next.js" there should be already a git file, if not then create one:

```bash
git init -b main
```

2. Stage and commit all the files in your project:

```bash
git add . && git commit -m "initial commit"
```

4. To create a repository for your project on GitHub, use the `gh` command:

```bash
gh repo create
```

5. Follow the interactive prompts. To add the remote and push the repository, confirm yes when asked to add the remote and push the commits to the current branch.
6. If not ask if you want to push to repo use the following command:

```bash
git remote add origin git@github.com:Zolske/zoltankepes.com.git
git branch -M main
git push -u origin main
```

(_`Zolske` is the repo's user name, `zoltankepes.com` is the name of the project_)

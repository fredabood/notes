---
title: Git
---

#### [Relevant XKCD](https://xkcd.com/1597/)

[Learn Git Branching](https://learngitbranching.js.org/) is the best resource I've found to learn Git. It has a terminal and a visual of the Git tree that allows you to see the effect of your code and compare it to your goal. I highly recommend it for anyone who's new to Git.

## Create a folder for all your repositories

I have a directory in my home directory called Projects (`~/Projects`) where I store all my repositories.

This is definitely an optional step. You're welcome to organize your files however you want. It's also not necessary to execute the `pwd` command if you know your current working directory.

```bash
pwd; # pwd stands for 'print working directory', this will print your current path
mkdir ~/Repositories; # creating a folder for all your projects
cd ~/Repositories; # navigating into said folder
pwd; # printing the directory again
```

## Global Git Configuration

This should be done before working on specific repositories.

`git version` at the beginning and `git config --global --list` at the end are both optional steps.

```bash
git version; # prints your git version
git config --global user.name "Fred Abood"; # assigns your name as the user to your global git settings
git config --global user.email "fred@fredabood.com"; # assigns your email to your global git settings
git config --global --list; # lists all global git settings
```

## Initiating a Repo Locally for the First Time

There are 2 ways to start a git repo on your local machine. You only need to pick one method for a given repository.

Both methods require you to create the repo remotely (on Github, Gitlab, etc.) first.

### Method 1

Create a git repo remotely then clone the repo and add all your files to the new directory. This example uses the SSH link to clone the repo, but you could use HTTPS if you'd prefer to authenticate with a username/password over SSH keys.

If you're aware of what files are in your directories, you can skip the `ls` commands.

```bash
git clone git@gitlab.com:fredabood/git-cheat-sheet.git; # cloning the remote repo to your local machine
ls; # listing all files in your current working directory
cd git-cheat-sheet; # navigating into the git repo we just cloned
ls; # listing all the files the repo
git status; # checking the status of the repo against the master branch
```

### Method 2

Initiate the repo in the directory where your work currently lives, then assign the remote repo as the master branch. Here we used the HTTPS link to authenticate with a username/password, but you could have just as easily used SSH as in the previous example.

`git remote -v` is optional if you don't want to verify the remote repository.

```bash
git init; # initiates a repo locally
git add .; # adds all files to the repo
git commit -m 'initial commit'; # commits all the files to the repo
git remote add origin https://gitlab.com/fredabood/git-cheat-sheet.git; # assigns a remote repo as the master branch
git remote -v; # verifies the remote repository is there
git push -u origin master # pushes the commit to the remote repo
```

## Committing Changes to an Existing Repo

This example creates a new file, adds it to git, commits it to the repo, and pushes it to the master.

The `ls` and `cat` commands as well as `git status` in this step are all optional.

```bash
echo "Isn't git great?!" >> example.txt; # creating a text file
ls; # verifying the creation of the text file
cat example.txt; # verifying the contents of the text file
git status; # checking git status, the file we created is currently untracked.
git add example.txt; # adding the text file to git
git status; # verifying the text file is now tracked
git commit -m "Adding example.txt file"; # committing the file to git
git status; # check status to see it's been committed
git push origin master; # pushing the commit to the master branch
```

## Add vs Commit vs Push

`git add` adds files to the Git index, which is a staging area for objects prepared to be committed
`git commit` commits the files in the index to the repository
`git push` sends all the pending changes to the remote repository

### Different ways to `git add`

| Bash Command | New Files | Modified Files | Deleted Files | |
|------------|---------|--------------|-------------|-------|
| git add -A | Yes | Yes | Yes | Stage all files (new, modified, deleted) |
| git add . | Yes | Yes | No | Stage new & modified files only |
| git add * | Yes | Yes | No | Stage new & modified files only |
| git add -u | No | Yes | Yes | Stage modified & deleted files only |
| git commit -a | No | Yes | Yes | Combines the add and commit steps, staging modified & deleted files only |

It's noteworthy that `.` is a Bash shortcut for the current working directory and the `*` is a similar shortcut for all files in the working directory. They aren't git specific shortcuts, we're simply taking advantage of them in the `git add` commands above.

## Deleting Files

`rm <filename>` deletes the file from the local file system, the change must then be staged with a `git add`
`git rm <filename>` combines `rm` and `git add` into one step to delete the file and stage the change
`git rm --cached <filename>` removes the file from the git index without deleting it from the local file system

## Stringing Bash Commands Together

Semicolons allow you to string commands together into a single line while still executing them sequentially.

All optional steps from above are removed in the commands below, but you could easily add them in with semicolons if you want to.

### Init a new repo locally, assign a master branch, add & commit files, and push to the master in one line of code

```bash
git init; git add .; git commit -m 'Initial Commit'; git remote add origin git@gitlab.com:fredabood/git-cheat-sheet.git; git push -u origin master;
```

### Pull, add & commit changes, and push from an existing repo in one line

```bash
git pull; git add *; git commit -m 'REPLACE ME WITH YOUR COMMIT MESSAGE'; git push;
```

### Create a function that does all git push steps

```bash
function git_push() {
  git add -A; \
  git commit -m "$1"; \
  git pull --rebase && \
  git push;
}
```

---

## Bonus: Installing the Bash kernel for Jupyter

This is only required if you want to run Bash commands from Jupyter Notebooks. It's not required to run Bash commands from the terminal in Jupyter.

```bash
pip install bash_kernel
python -m bash_kernel.install
```

You can read more about the Bash kernel for Jupyter here: https://github.com/takluyver/bash_kernel
In fact, there are Jupyter kernels for a lot of other languages as well. You can find a list of them here: https://github.com/jupyter/jupyter/wiki/Jupyter-kernels

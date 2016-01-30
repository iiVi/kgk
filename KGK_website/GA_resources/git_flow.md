# Git Flow

### Learning Objectives

- Explain what a branch is in a git repository
- Use the __git flow__ model for collaborative software development

## So far...

### Master

We've been working on only one branch within our git repository for class,
`master`. Master is the default branch that is created when you initialize any
git repository and usually serves as the main vein of the codebase. It
represents the most up-to-date, working version of a project that is
production-ready. As a codebase grows and more complex features are added it
becomes dangerous to work solely on the `master` branch. You don't want to
introduce a piece of buggy or untested code into `master` that has the potential
to break your application. So how do we solve this problem?

### Branches

We use branching in git to keep the `master` branch 'safe' while working in
development.

##### What is a branch?

> A branch of a git repository is simply a divergence of commit history into
  multiple paths

Branching is useful when, for example, you have an experimental feature that you
want to work on, but are not yet sure whether it should be part of the *main*
codebase just yet. By creating a branch you allow yourself the freedom to
experiment on a new feature, with the added benefit of always having the *main*
codebase, `master` fully functional and safe. Branching also gives you the
flexibility to either **merge** your feature back into the *main* codebase, or
to simply discard, or ignore, your work. There are no obligations to merge in an
experimental development branch into `master`.

##### What does this look like?

> At commit 3, a new branch is created called `suite-feature`, and commits
4, 5, and 6 are made on this branch. Meanwhile, work continues on `master`,
namely, commits 7 and 8.

```
                                 * master
  (1) -- (2) -- (3) -- (7) -- (8)
                 \                    * suite-feature
                  \-- (4) -- (5) -- (6)

```

> If the suite feature is not-so-suite, it can be ignored, and work can continue
  on master as usual.

```

                                                        * master
  (1) -- (2) -- (3) -- (7) -- (8) --- (9) -- (10) -- (11)
                 \
                  \-- (4) -- (5) -- (6)
                                     * suite-feature (that nobody cares about)

```

> If the suite feature is awesome, it can be merged back into the master branch.

```


                                          * master
  (1) -- (2) -- (3) -- (7) -- (8) --- (9)  <= Commit 9 is a "merge commit". It
                 \                    /        merges two branches together.
                  \-- (4) -- (5) -- (6)
                                     * suite-feature

```

**WAIT What happens when git merges the two branches together?**

Will that overwrite the work that happened on `master` after the `suite-feature`
branch was created? In other words, what happens to the work done in commits 7
and 8 after the commits from the feature branch are merged in?

### Merging branches

##### Git is SMART

Usually git is smart enough to **NOT** erase anyone's changes.

**Breathe...Let that sink in**

When you attempt to merge togther commits from two separate branches git will
intelligently take the changes from both branches and combine them all together.
So going back to the last example above, the changes from commits 4, 5, 6, and
the changes from commits 7, 8 will be compared and combined into one commit,
commit 9 on master.

##### But...

Sometimes it is not so easy and there might be changes that affect the same
file. Whose changes should take precedence? Do commits on `master` have more
precedence than the `suite-feauture` branch?

Git will never accidentally erase or overwrite someone's work. In those
situations git will not attempt to make any assumptions about your code. It will
prevent a merge from happening and ask the developer to decide which changes
should be accepted. We call this a **MERGE CONFLICT**.

**Take a look at this:** [A successful Git branching model](http://nvie.com/posts/a-successful-git-branching-model/)

With your group discuss the workflow presented by this article. Some things to
keep in mind while reading:

- How the master branch is used
- How development branches are used to aggregate features
- How feature branches are used for work

```
  master ---------- master ------------ master ------------ master ----------
                                                              /
  dev ------------- dev --------------- dev --------------- dev -------------
   \                / \                 /
    feature --------   feature2---------
```

Jot down some thoughts together on:

- How your team can manage the merging of branches?
- How your team can manage or prevent merge conflicts?

### Pull Requests and the Git Czar

Your group should select one person to act as the **Git Czar**. This person will
be responsible for merging all branches of work into `master`, reviewing commits
with the team while merging branches, and resolving any merge conflicts that may
arise.

To review and submit work to be merged into master a **Pull Request** should be
submitted for each branch. The job of the pull request is to request that a
specific branch be merged into the `master` branch of a repository. The Git Czar
can accept or deny any pull requests, and should make sure that all team members
are submitting pull requests for the work that they are doing.

**Take a look at these:**

- [Using Pull Requests - GitHub](https://help.github.com/articles/using-pull-requests/)
- [Creating a Pull Request - GitHub](https://help.github.com/articles/creating-a-pull-request/)

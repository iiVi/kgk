#Git Resources (aka gettin' Git)

Here is a rundown of our general Git process flow in our cohort.

##Setting up a Git/Github Repo (the 1st time -- Else skip to 5!).

###1. In the terminal, initialize directory with Git

Inside the directory you want to track with Git, input:

`git init`

in your terminal.

![git init](https://github-images.s3.amazonaws.com/blog/2011/fullmetal.jpg)

###2. Create a repository on Github

Click on repositories and then click new to make a new repository.
Name your repository (best to match name of directory).
Choose 'Initialize this repository...' and click 'Create Repository'

![octocat](http://cssnerd.com/wp-content/plugins/better-github-widget/octocat.png)

###3. Copy the SSH link on the right.  It should look something like this:

`git@github.com:bigtone1284/gittest.git`

###4. Back in terminal, input:

`git clone git@github.com:bigtone1284/gittest.git`

![clone](http://pld.name/wp-content/uploads/2013/04/git-clone-300x225.png)

##Tracking changes: Git and Github (repeat these steps everytime)

###5. Grab the latest version of our repository:

In terminal, input:

`git pull upstream master`

Now you can work with our repository!

###6. See what you've changed! (After you've written some suite code!)

In terminal, input:

`git status`

This will tell us which files we have changed and aren't currently tracked by git.

![status](http://www.midwesternmac.com/sites/midwesternmac.com/files/ds_store-files.jpg)

###7.  Add these files to be tracked:

In terminal, input:

`git add [FILENAME]`

to add these files one-at-a-time.

`git add .` (note the period)

will add all files at once.

###8.  Commit these changes.

A commit should be thought of as a batch of files that you want track at once. A commit must include a short, useful description of files included.

Input:

`git commit -m 'tonight's homework'`

![why no commit!?](http://imgs.xkcd.com/comics/git_commit.png)

###9.  Push these changes to Github.

Throughout our cohort, you push these changes to our class repository by inputting:

`submit_hw`

Homework is completed when you submit it.  Always submit something!

![hw](https://akshaybhende.files.wordpress.com/2011/12/homework.jpg)

Happy Git.


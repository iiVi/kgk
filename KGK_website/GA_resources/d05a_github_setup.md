# Setting Up a Remote Repository

Today we are going to be setting up our class repositories both locally and remotely. This is going to streamline our development workflow. Instead of having to slack out assignments and code snippets, submitting assignments through gists and emails, and making new folders each day to work in, we will work in one location that we can all access and utilize.

The first step is...

## Forking

Forking is the process of making a copy of a _remote_ repository on `Github`. This is going to make a 1-to-1 copy of our main class repository `WDI_McClane` on your github account. Currently the repository belongs to and lives on the GA github account. In order for you to be able to edit and make changes to the files in the repository without affecting the stable, main copy you must __fork__ the repository. Go to: [WDI_McClane](https://github.com/ga-students/WDI_McClane). On the main page of the repository you will see a button that says `Fork` in the upper right corner.

When the fork button is clicked it will ask you if you would like to add it to your own github account. Select that option and now you should be redirected to the the copy that exists on your github account.

The name of the repository should now look like `YOUR_GITHUB_NAME/WDI_McClane`. This is an easy way of knowing whether or not you are on your FORKED copy or on the MAIN copy.

## Cloning

Once you have forked a repository you must make a copy of it locally so that you can edit and change the files. The process of copying a remote repository to a local machine is called `Cloning`. This will make a 1-to-1 copy of the remote repository onto your local computer. The remote repository exists on the internet so in order to copy it to our computers we need to make use of a url that github provides that will point to the repository.

We are going to make use of the `SSH` url. During Installfest we added some SSH keys to your computer and github account. These are used to authenticate yourself to the github server, and removes the need to type your username and password when interacting with the repository. To find this link look on the lower right hand corner of your forked repository's website. Click the tab that says `SSH` and click the button next to the link to copy it to your clipboard.

Now go to your terminal, _cd_ into the `~/wdi` directory and type the following command: `git clone LINK_YOU_COPIED_TO_YOUR_CLIPBOARD`

You should see a slew of text from github, then if you type _ls_ you should see a directory named `WDI_McClane`. If you _cd_ into that directory and _ls_ then you should see all of the files and folders in our class repository.

## Remotes

There is one more thing that we need to do. Currently we have a link between our local repositories (the files we cloned from github) and our remote repository (the copy your forked from the main repository). But there is no link between your local repository and the main repository that belongs to GA. These links between local and remote repositories are called `Remotes` for lack of a better word. They are a URL that points to a specific location on github where your repository is located.

To make the link between the main repo and your local machine go to the main repository on Github. The name at the top should say `ga-students/WDI_McClane` if you see your github name next to WDI_McClane then you should click the url immediately under the repository name. DO NOT copy the ssh link from your fork again. Next, copy the SSH link from the bottom right side of the screen on the main repository to your clipboard. Go to terminal and make sure that you are in the directory of the local copy of the repository.

To make sure you are type `git status` and you should get a message:

```
On branch master
Your branch is up-to-date with 'origin/master'.
nothing to commit, working directory clean
```

Type the following command: `git remote add upstream LINK_YOU_COPIED_TO_YOUR_CLIPBOARD`

Now if you type `git remote -v` you should see two _remotes_: one labeled **upstream**, the other labeled **origin**

```
$ git remote -v
origin	git@github.com:[YOUR GITHUB NAME]/WDI_McClane.git (fetch)
origin	git@github.com:[YOUR GITHUB NAME]/WDI_McClane.git (push)
upstream	git@github.com:ga-students/WDI_McClane.git (fetch)
upstream	git@github.com:ga-students/WDI_McClane.git (push)
```

Origin is a convention used to indicate a remote repository that belongs to you. Upstream is a convention that we follow to indicate a remote repository that you wish to interact with but does not belong to you. We need to have two remotes so that you can **pull** down changes from the main repository (upstream) and **push** your local changes to your remote repository (origin).

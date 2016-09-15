# Extract Git Commit Info

A CLI that gathers the current commits information without you having to include the whole GIT repository.
Here is an example of how the content retrieved by the tool looks like:

```
{ commitId: '1487705',
  commitAuthor: 'Hedgehog <hedgehog@ali.dj>',
  commitMsg: 'added Dockerfile to build base image',
  commitDateTime: '2016-09-15T08:44:44.000Z' }
```


## Installation

Via NPM:
```
npm install -g extract-git-commit-info
```

When you use this tool in a CI workflow with Docker and you've a line like `.git` in your `.dockerignore` file please replace it with these lines:

```
.git/*/*
!.git/logs/HEAD
```

## Usage

```
extract-git-commit-info [options]
```

### Options

```
-d, --directory [projectroot]
```
Project root where the commit information should be extracted from. Can be absolute or relative

Default: Current folder

```
-o, --output [outputPath]
```
Path where the result JSON file should be written to. Can be absolute or relative

Default: Current folder

```
-f, --filename [outputFilename]
```
Filename of result file

Default: `commit.json`

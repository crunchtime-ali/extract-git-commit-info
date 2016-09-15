# Extract Git Commit Info

A CLI that gathers the current commits information without you having to include the whole GIT repository.

## Installation

Via NPM:
```
npm install -g extract-git-commit-info
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

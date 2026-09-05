# Agent Rules

## No comments

Do not add explanatory comments in the code. The code should be self-explanatory.

## Unit tests

Whenever create new utility functions, create unit tests for them too.

## Single function per file

Each file must only contain one function not more.
It can contain its related types, interfaces, or constants.

## Function syntax

Use arrow function syntax for all utilities.

## File import order

When importing files inside files, follow the following order:

1. System/framework files

2. External packages

3. Internal Package

4. Local files

## Barrel indexes

When a folder contains multiple utility modules, create an index.ts that exports them all. Import utilities through the folder path rather than referencing individual utility files directly.

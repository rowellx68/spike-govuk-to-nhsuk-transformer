# GOVUK to NHSUK Frontend

This is a quick spike to show how you can use code transformers to convert GOVUK frontend.

It is using `postcss` to convert the SCSS files into its Abstract Syntax Tree (AST) and then updating and adding values.

## Assumptions

- we have copied the `govuk-frontend` files into the `nhsuk-frontend` folder
- we have copied replaced all instances of `govuk` with `nhsuk` in the files and paths

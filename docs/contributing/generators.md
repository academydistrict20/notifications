# Generators

[hygen](https://www.hygen.io/) is used in the project to for generating files based on templates (scaffolding). These templates live in the `/_templates` directory.

## Using the generators

Generators can be used from the root of the project by using the `hygen` CLI.

```bash
# Install hygen
npm i -g hygen

# Create a new package called @asd20/notifications-ui
hygen package new --pkg ui --desc "A UI package"
```

# Scaffolding

[hygen](https://www.hygen.io/) is used in the project to for generating files based on templates (scaffolding). These templates live in the `/_templates` directory.

## Using the generators

Generators can be used from the root of the project by using the `hygen` CLI.

```bash
# Create a new package called @academydistrict20/notifications-ui
npx hygen package new --pkg ui --desc "A UI package"
```

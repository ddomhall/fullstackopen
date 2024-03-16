# 11.1 - CI/CD info for an example app built with Python

### Some common steps in a CI setup include linting, testing, and building. What are the specific tools for taking care of these steps in the ecosystem of the language you picked? You can search for the answers by google.
For linting you could use any Prettier, Pylint, flake8, mypy, ruff or black.
For testing you could use Pytest, PyUnit (Unittest), TestProject, Doctest, Behave, Robot, Lettuce or Testify
For building you could use Webpack, PyBuilder, pynt, platformio core, scons, buildout or bitbake

### What alternatives are there to set up the CI besides Jenkins and GitHub Actions? Again, you can ask google!
For CI alternatives to Jenkins/GitHub Actions, you could use JetBrains TeamCity, AWS CodePipeline, Atlassian Bamboo, CircleCI, TravisCI or Buildkite.

### Would this setup be better in a self-hosted or a cloud-based environment? Why? What information would you need to make that decision?
Since this is a personal project, a cloud based solution is best as you can avoid the hassle of setting up a server.
You also get all the most common features out the box, again without having to set them up yourself, you will probably need to configure them though.

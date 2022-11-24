# Must be run in the same directory as .git
yarn add husky -D && cd .. && npx husky install api/.husky && npx husky add .husky/pre-commit "yarn test && yarn lint"

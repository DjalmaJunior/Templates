# Must be run in the same directory as .git
yarn add husky -D && cd .. && npx husky install api/.husky && npx husky add api/.husky/pre-commit "cd api && yarn test-husky && yarn lint"

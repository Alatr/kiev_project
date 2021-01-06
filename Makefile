install:
	npm install
lint:
	npx eslint ./src/assets/scripts/**/*.js
lint-w:
	npx eslint ./src/assets/scripts/**/*.js --fix
prettier:
	npx prettier --write ./src/assets/scripts/**/*.js
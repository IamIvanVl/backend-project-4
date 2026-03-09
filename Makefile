install: 
		@npm ci
lint: 
		@npx eslint .
test:
		@npx vitest --coverage --outputFile=./coverage/lcov.info --coverage.reporter=lcov --coverage.provider=v8
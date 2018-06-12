scope ?= .

# COLORS
GREEN  := $(shell tput -Txterm setaf 2)
YELLOW := $(shell tput -Txterm setaf 3)
WHITE  := $(shell tput -Txterm setaf 7)
RESET  := $(shell tput -Txterm sgr0)

TARGET_MAX_CHAR_NUM=20
## Show help
help:
	@echo ''
	@echo 'Usage:'
	@echo '  ${YELLOW}make${RESET} ${GREEN}<target>${RESET}'
	@echo ''
	@echo 'Targets:'
	@awk '/^[a-zA-Z\-\_0-9]+:/ { \
		helpMessage = match(lastLine, /^## (.*)/); \
		if (helpMessage) { \
			helpCommand = substr($$1, 0, index($$1, ":")-1); \
			helpMessage = substr(lastLine, RSTART + 3, RLENGTH); \
			printf "  ${YELLOW}%-$(TARGET_MAX_CHAR_NUM)s${RESET} ${GREEN}%s${RESET}\n", helpCommand, helpMessage; \
		} \
	} \
	{ lastLine = $$0 }' $(MAKEFILE_LIST)

## Make a new release of the monorepo. Usage: make release BUMP_TYPE=patch PUBLISH=true
release:
	scripts/release.sh $(BUMP_TYPE) $(PUBLISH)

## Run lint, units and integration tests. Usage: make test scope=.
test:
	scripts/test.sh $(scope)

## Run lint, units and integration tests with fail fast. Usage: make test scope=.
test-ff:
	scripts/test.sh $(scope) 1 true

## Run the unit test. Usage: make test scope=. concurrency=4
units:
	scripts/units.sh $(scope) $(concurrency)

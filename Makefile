include .env

start:
	make check-dotenv;
	make set-deployment-name;

# ========================================
# DEPLOY AUTOMATIONS
# ========================================
up:
	make check-dotenv;
	docker-compose -f docker-compose.yml up -d --build

down:
	docker-compose -f docker-compose.yml down


up-prod:
	make check-dotenv;
	docker-compose -f docker-compose-prod.yml up -d --build

down-prod:
	make check-dotenv;
	docker-compose -f docker-compose-prod.yml down

# ========================================
# UTILITY AUTOMATIONS
# ========================================
set-deployment-name:
	sed -i '' -e "s/nuxt-basic-frontend/${DEPLOYMENT_NAME}/g" docker-compose*.yml

check-dotenv:
	@test -e .env || (echo "[ ERROR ] - .env file not found!"; exit 1)
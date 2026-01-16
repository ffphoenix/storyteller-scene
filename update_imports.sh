#!/bin/bash
find backend/src backend/test -type f -exec sed -i 's/jwt-tokens-response/jwtTokensResponse/g' {} +
find backend/src backend/test -type f -exec sed -i 's/refresh-token-payload/refreshTokenPayload/g' {} +
find backend/src backend/test -type f -exec sed -i 's/token-payload/tokenPayload/g' {} +
find backend/src backend/test -type f -exec sed -i 's/jwt-refresh.strategy/jwtRefresh.strategy/g' {} +
find backend/src backend/test -type f -exec sed -i 's/jwt-refresh.guard/jwtRefresh.guard/g' {} +
find backend/src backend/test -type f -exec sed -i 's/jwt-auth.guard/jwtAuth.guard/g' {} +
find backend/src backend/test -type f -exec sed -i 's/google-login.dto/googleLogin.dto/g' {} +
find backend/src backend/test -type f -exec sed -i 's/update-user.dto/updateUser.dto/g' {} +
find backend/src backend/test -type f -exec sed -i 's/create-user.dto/createUser.dto/g' {} +
find backend/src backend/test -type f -exec sed -i 's/game-status.enum/gameStatus.enum/g' {} +
find backend/src backend/test -type f -exec sed -i 's/value-objects/valueObjects/g' {} +
find backend/src backend/test -type f -exec sed -i 's/game-query.handlers/gameQuery.handlers/g' {} +
find backend/src backend/test -type f -exec sed -i 's/game-command.handlers/gameCommand.handlers/g' {} +
find backend/src backend/test -type f -exec sed -i 's/modify-game.command/modifyGame.command/g' {} +
find backend/src backend/test -type f -exec sed -i 's/start-game.command/startGame.command/g' {} +
find backend/src backend/test -type f -exec sed -i 's/delete-game.command/deleteGame.command/g' {} +
find backend/src backend/test -type f -exec sed -i 's/create-game.command/createGame.command/g' {} +
find backend/src backend/test -type f -exec sed -i 's/game-scene.module/gameScene.module/g' {} +
find backend/src backend/test -type f -exec sed -i 's/game-scene.repository.interface/gameScene.repository.interface/g' {} +
find backend/src backend/test -type f -exec sed -i 's/game-scene-layer.entity/gameSceneLayer.entity/g' {} +
find backend/src backend/test -type f -exec sed -i 's/scene-object.events/sceneObject.events/g' {} +
find backend/src backend/test -type f -exec sed -i 's/game-scene.types/gameScene.types/g' {} +
find backend/src backend/test -type f -exec sed -i 's/game-scene.aggregate/gameScene.aggregate/g' {} +
find backend/src backend/test -type f -exec sed -i 's/game-created.handlers/gameCreated.handlers/g' {} +
find backend/src backend/test -type f -exec sed -i 's/game-scene-query.handlers/gameSceneQuery.handlers/g' {} +
find backend/src backend/test -type f -exec sed -i 's/game-scene.queries/gameScene.queries/g' {} +
find backend/src backend/test -type f -exec sed -i 's/scene-object.handlers/sceneObject.handlers/g' {} +
find backend/src backend/test -type f -exec sed -i 's/scene-layer.handlers/sceneLayer.handlers/g' {} +
find backend/src backend/test -type f -exec sed -i 's/game-scene.handlers/gameScene.handlers/g' {} +
find backend/src backend/test -type f -exec sed -i 's/add-scene-object.command/addSceneObject.command/g' {} +
find backend/src backend/test -type f -exec sed -i 's/delete-scene-object.command/deleteSceneObject.command/g' {} +
find backend/src backend/test -type f -exec sed -i 's/update-game-scene.command/updateGameScene.command/g' {} +
find backend/src backend/test -type f -exec sed -i 's/delete-scene-layer.command/deleteSceneLayer.command/g' {} +
find backend/src backend/test -type f -exec sed -i 's/modify-scene-object.command/modifySceneObject.command/g' {} +
find backend/src backend/test -type f -exec sed -i 's/create-game-scene.command/createGameScene.command/g' {} +
find backend/src backend/test -type f -exec sed -i 's/delete-game-scene.command/deleteGameScene.command/g' {} +
find backend/src backend/test -type f -exec sed -i 's/create-scene-layer.command/createSceneLayer.command/g' {} +
find backend/src backend/test -type f -exec sed -i 's/update-scene-layer.command/updateSceneLayer.command/g' {} +
find backend/src backend/test -type f -exec sed -i 's/game-scene.repository/gameScene.repository/g' {} +
find backend/src backend/test -type f -exec sed -i 's/game-scene.entity/gameScene.entity/g' {} +
find backend/src backend/test -type f -exec sed -i 's/game-scene.controller/gameScene.controller/g' {} +
find backend/src backend/test -type f -exec sed -i 's/game-scene.dtos/gameScene.dtos/g' {} +
find backend/src backend/test -type f -exec sed -i 's/game-scene.gateway/gameScene.gateway/g' {} +

# Specific replacements for test files and configs
find backend -type f \( -name "package.json" -o -name "nest-cli.json" -o -name "tsconfig.json" -o -name "*.ts" -o -name "*.json" \) -exec sed -i 's/jest-e2e.json/jestE2e.json/g' {} +
find backend -type f \( -name "*.ts" -o -name "*.json" \) -exec sed -i 's/app.e2e-spec/app.e2eSpec/g' {} +
find backend -type f \( -name "*.ts" -o -name "*.json" \) -exec sed -i 's/app.controller.unit-spec/app.controller.unitSpec/g' {} +
find backend -type f \( -name "*.ts" -o -name "*.json" \) -exec sed -i 's/auth.service.unit-spec/auth.service.unitSpec/g' {} +
find backend -type f \( -name "*.ts" -o -name "*.json" \) -exec sed -i 's/auth.controller.unit-spec/auth.controller.unitSpec/g' {} +
find backend -type f \( -name "*.ts" -o -name "*.json" \) -exec sed -i 's/users.controller.unit-spec/users.controller.unitSpec/g' {} +
find backend -type f \( -name "*.ts" -o -name "*.json" \) -exec sed -i 's/users.service.unit-spec/users.service.unitSpec/g' {} +
find backend -type f \( -name "package.json" -o -name "*.ts" -o -name "*.json" \) -exec sed -i 's/jest-unit.json/jestUnit.json/g' {} +

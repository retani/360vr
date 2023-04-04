# Dockerfile for deployment
# source: https://github.com/disney/meteor-base/blob/master/example/default.dockerfile

# The tag here should match the Meteor version of your app, per .meteor/release
FROM geoffreybooth/meteor-base:2.11.0 AS meteor-base

# Copy app package.json and package-lock.json into container
COPY ./package*.json $APP_SOURCE_FOLDER/

# install meteor app dependencies
RUN bash $SCRIPTS_FOLDER/build-app-npm-dependencies.sh

# Copy app source into container
COPY . $APP_SOURCE_FOLDER/

RUN bash $SCRIPTS_FOLDER/build-meteor-bundle.sh

# Use the specific version of Node expected by your Meteor release, per https://docs.meteor.com/changelog.html; this is expected for Meteor 2.0
FROM node:14.21.3-alpine

ENV APP_BUNDLE_FOLDER /opt/bundle
ENV SCRIPTS_FOLDER /docker

# Runtime dependencies; if your dependencies need compilation (native modules such as bcrypt) or you are using Meteor <1.8.1, use app-with-native-dependencies.dockerfile instead
RUN apk --no-cache add \
  bash \
  ca-certificates

# Copy in entrypoint
COPY --from=meteor-base $SCRIPTS_FOLDER $SCRIPTS_FOLDER/

# Copy in app bundle
COPY --from=meteor-base $APP_BUNDLE_FOLDER/bundle $APP_BUNDLE_FOLDER/bundle/

RUN bash $SCRIPTS_FOLDER/build-meteor-npm-dependencies.sh

# install ffmpeg (no cache)
RUN apk add ffmpeg --no-cache

# Start app
ENTRYPOINT ["/docker/entrypoint.sh"]

CMD ["node", "main.js"]

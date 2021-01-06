#############
# Dogsbook #
###########

FROM node:12-slim

LABEL maintainer="Yosnier Samon"

ENV USER dockerfileUser

# Copy our App dependencies and credentials
# This is done early so deps can be cached by docker
WORKDIR /home/$USER

COPY package.json package.json

# Change to non-root user
RUN groupadd --system $USER --gid 433 && \
    useradd --uid 431 --system --gid $USER --shell /sbin/nologin --comment "User inside Docker container" $USER && \
    chown -R $USER:$USER /home/$USER
USER $USER

# Install Node dependencies and remove NPM cache
RUN npm install --production && \
    npm cache clean -f && \
    rm -rf /home/$user/.node-gyp && \
    rm -rf /tmp/npm-*

# Add the rest of the app
COPY . .


EXPOSE 3000

# Log debugging variables
ENV DEBUG *
ENV NODE_ENV production

CMD [ "node", "dist/app.js" ]

# ______  ____    ____    __  __      ______                     _____
#/\__  _\/\  _`\ /\  _`\ /\ \/\ \    /\__  _\   /'\_/`\  /'\_/`\/\  __`\
#\/_/\ \/\ \,\L\_\ \ \L\_\ \ `\\ \   \/_/\ \/  /\      \/\      \ \ \/\ \
#   \ \ \ \/_\__ \\ \  _\L\ \ , ` \     \ \ \  \ \ \__\ \ \ \__\ \ \ \ \ \
#    \_\ \__/\ \L\ \ \ \L\ \ \ \`\ \     \_\ \__\ \ \_/\ \ \ \_/\ \ \ \_\ \
#    /\_____\ `\____\ \____/\ \_\ \_\    /\_____\\ \_\\ \_\ \_\\ \_\ \_____\
#    \/_____/\/_____/\/___/  \/_/\/_/    \/_____/ \/_/ \/_/\/_/ \/_/\/_____/
#
###############################################################################
#Pulling node+yarn docker image
FROM kkarczmarczyk/node-yarn:latest

MAINTAINER nd4pa <antoine.blondeau@isen-bretagne.fr>

#Create App dir
RUN mkdir -p /usr/src/api-isen-immo
WORKDIR /usr/src/api-isen-immo

#Set JWT environment
ENV JWT_ISSUER issuer
ENV JWT_AUDIENCE audience
ENV JWT_SECRET secret

# Install deps
COPY package.json /usr/src/api-isen-immo/
COPY yarn.lock /usr/src/api-isen-immo/
RUN yarn install --prod

#Copy app
COPY . /usr/src/api-isen-immo

EXPOSE 80

CMD ["yarn", "start"]

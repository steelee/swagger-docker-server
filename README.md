# swagger-docker-server
An extension of [swagger-ui](https://github.com/swagger-api/swagger-ui) that adds a complete containerized backend powered by Docker, written primarily in PHP and incorporating a SQL server. The goal was to take the ease-of-use provided by the Swagger-Ui repository and extend it to an easily-deployable container set to allow organizations to easily manage API documentation.
## SwaggerUi
To use swagger-ui you should take a look at the [source of swagger-ui](https://github.com/swagger-api/swagger-ui/) Which forms the core of this project.
## Apache-PHP
Thanks to tutum's [apache-php container](https://github.com/tutumcloud/apache-php) it was easy to setup. It's incorporated into this project for the web server.
### Usage - Install
Simply clone the repo and run the provided setup script "run.sh". Make sure you have Docker installed and running! As soon as the script is done, just navigate to your host in a web browser and start adding Swagger files.
### Usage - Adding
You can add Swagger YAML or JSON files straight from your own machine or by using a remote link. Use the "+ Add API" button to get started. There's more information under the "Help" tab.
### License
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at [apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

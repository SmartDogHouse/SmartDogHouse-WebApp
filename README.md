# SmartDogHouse-WebApp

This is the front-end of the WebApp, hosted on **AWS Aplify** at: [Website](https://main.dju9luq0cgrv7.amplifyapp.com/).

The WebApp uses **VueJS**, that runs on **nodeJS**.


![smart doghouse logo](./src/main/python/output/dogs_S.png "Smart DogHouse Logo")

It is possible to run the application in local, the version of nodeJS used is: v4.17.3.
## Install all dependencies
Use **NPM** to download all dependencies
```bash
npm install
```
## To lauch the local vueJS instance use:
```bash
npm run serve
```

## Tests
The tests are launched using **Cypress**, these tests are **e2e** tests.
It can be launched using **NPX** 
```bash
npx cypress run
```
For the interactive version use:
```bash
npx vue-cli-service test:e2e
```

## License

This project is under a License - see the [LICENSE](LICENSE) file for details

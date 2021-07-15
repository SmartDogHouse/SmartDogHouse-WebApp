<template>
<!-- Represent the classic login form with user and password, no registrarion is possible-->
  <v-card class="elevation-12">
    <v-toolbar dark color="primary">
      <v-toolbar-title>Login form</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field
          prepend-icon="mdi-account"
          name="login"
          label="Login"
          type="text"
        ></v-text-field>
        <v-text-field
          id="password"
          prepend-icon="mdi-map-marker"
          name="password"
          label="Password"
          type="password"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" v-on:click="tryLogIn">Login</v-btn>
      <v-btn color="primary" v-on:click="tryLogIn1">Test</v-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  components: {},
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
  }),
  methods: {
    tryLogIn() {
      this.$router.push("/Home").catch(() => {});

     /* this.axios.get("/req/auth",{ crossdomain: true }).then((response) => {
        console.log(response.data);
      });*/
    },
    async tryLogIn1() {
   //   this.$router.push("/Home").catch(() => {});

    const testNum = 7;
    /*const config  = {
                    method: 'post',
                    url: '/set/schedule/size',
                    //data: JSON.stringify({'size': 3}),
                    //headers: { 'content-type': 'application/json' },
                };*/
    var res;
    var payload;
    switch (testNum) {
      case 1: //test env logs
        res= this.axios.get("/view/logs/env",{ crossdomain: true }).then((response) => {
          response.data.forEach(el => {
            console.log(`secondo for ${el.SK} ${el.val}`)
          });
        })
        break;
      case 2: //test dog logs
        res = await this.axios.get("/view/logs/dog",{ 
          params: {
            'type': "temp",
            'dog': "c02",
            'lowerT': "2021-01-01T00:00",
            'upperT': "2021-12-31T22:00"
          }
        })
        break;
      case 3:   //test total of a dog consumption given range of time      
        res = await this.axios.get("/view/logs/dog/total",{ 
          params: {
            'dog': 'c01', 
            'lowerT': "2021-01-01T00:00",
            'upperT': "2021-12-31T22:00"
          }
        })
        break;
      case 4:   //test last temp and hb retrieval     
        res = await this.axios.get("/view/logs/dog/last",{ 
          params: {
            'dog': 'c03'
          }
        })
        break;
      case 5: //roles by user
        res = await this.axios.get("/view/user/roles",{ 
          params: {
            username: 'ciccio01'
          }
        })  
        break;
      case 6: //users by role        
          res = await this.axios.get("/view/roles/user",{ 
          params: {
            role: 'vet'
          }
        })  
        break;
      case 7: //test set schedule (size)
          payload = {
                "size": 2,
                "time": '13:00',
                "grams": 274
          }
        res = await this.axios.post("/set/schedule/size", payload)              
        break;
      case 8: //test set schedule (dog)
        payload = {
              "chip_id": 'c02',
              "time": '12:00',
              "grams": 320
        }
        res = await this.axios.post("/set/schedule/dog", payload)  
        break;        
      case 9: //set cons ranges by dog
       
              payload = {
                    "chip_id": 'c02',
                    "time": '12:00',
                    "grams": 320
              }
        res = await this.axios.post("/set/ranges/cons/dog ", payload)  
        break;
      default:
        break;
    }

    console.log(res.data);

        
        //console.log(JSON.parse(`${response.data}`));
      

       /*     this.axios.get("/req/auth",{ crossdomain: true }).then((response) => {
        console.log(response.data);
      });*/
    },
  },
};
</script>

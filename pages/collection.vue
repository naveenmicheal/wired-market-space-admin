<template>
    <div>
        <TopBar/>
        <v-row class=px-6>
            <v-col cols="6" >
                <v-text-field v-model="newparent" maxlength ="40" counter="40" background-color="blue lighten-5" prepend-icon="mdi-dns" outlined label="Creat a New Collection"></v-text-field>
            </v-col>
            <v-col cols="2">
                <v-btn @click="createparentcategory" outlined block large class="mt-1">
                    Create New Collection
                </v-btn>
            </v-col>
        </v-row>

        <v-row wrap class="px-6">
            <v-col v-for="item in categories" :key="item._id" cols=4>
                <v-card >
                    <v-row>
                        <v-col cols="12" class="px-6">
                           <v-card-title style="background-color: lightgrey" class="text-h5  text-center">{{item.parentcategory}}  
                           </v-card-title>

                           <v-btn @click="parentdeleteprompt(item.parentcategory)" class="ma-3" tile outlined color="red"> Delete Collection<v-icon color="red">mdi-delete</v-icon>
                           </v-btn>
                       </v-col>
                   </v-row>
               </v-card>
           </v-col>
       </v-row> 


       <!-- Dialouge form-->
   <!--     <v-dialog
       v-model="dialog"
       persistent
       max-width="500"
       >
       <v-card class="pa-6">
        <h1 class="pa-4">Add a new Chid Category</h1>
        <p class="pa-2" style="color: red">[Temprourarly Disabled]</p>
        <v-text-field
        v-model="newchild"
        maxlength="30"
        :counter="30"
        label="New Child Category"
        outlined
        background-color="blue lighten-5"
        required
        ></v-text-field>
    <v-btn @click="createchildcategory" outlined color="green" class="mx-3">
        Add Category
    </v-btn>
    <v-btn disabled outlined color="green" class="mx-3">
        Add Category 
    </v-btn>
    <v-btn @click="childopenprompt" outlined color="black">
        Cancel 
    </v-btn>
</v-card>
</v-dialog> -->

<!-- Dialouge form-->
<v-dialog
v-model="test"
persistent
max-width="1000"
>
<v-card class="pa-6">
    <h1 class=" text-h2 pa-4 text-center">[Temprourarly Disabled]</h1>
    <div class="text-center">
             <v-btn @click="goto" outlined color="black">
        Go to Dashboard 
    </v-btn>
    </div>
   
    <!-- <p class="pa-2" style="color: red">[Temprourarly Disabled]</p> -->
</v-card>
</v-dialog>

<!-- Overlay -->

<!-- Parent Collection Remove -->
<v-dialog v-model="dialog" persistent  max-width="400">
    <v-card>
        <v-card-title color="red">Are you sure want to remove <br> 
            <code>{{this.currentparent}}</code> collection?</v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text tile @click="removeparentcollection(currentparent)">Yes</v-btn>
                <v-btn text tile @click="dialog = !dialog">No</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

</div>
</template>

<script type="text/javascript">
    import TopBar from "~/components/basics/topbar"
    export default{
        data(){
            return{
                overlay:false,
                dialog: false,
                newparent:'',
                categories:[],
                currentparent:'',
                newchild:"",

                test:true,

            }
        },
        components:{TopBar},

        methods:{
            async createparentcategory(){
                this.overlay = !this.overlay
                let token = document.cookie.split(";")[0].split("=")[1]
                this.$axios.setHeader('Authorization', 'Bearer '+token)
                let data = await this.$axios
                .$post("https://wiredapi.herokuapp.com/category/newparent",
                {
                    "parentcategory":this.newparent
                })
                console.log(data)
                this.overlay = !this.overlay
            },
            async createchildcategory(e){
                this.overlay = !this.overlay
                let token = document.cookie.split(";")[0].split("=")[1]
                this.$axios.setHeader('Authorization', 'Bearer '+token)
                let data = await this.$axios
                .$post("https://wiredapi.herokuapp.com/category/newchild",
                {
                    "parentcategory":this.currentparent,
                    "childcategory":[this.newchild]
                })
                console.log(data)
                this.overlay = !this.overlay

            },
            // childopenprompt(e){

            //     this.currentparent = e
            //     this.dialog = !this.dialog
            //     console.log(this.currentparent)

            // },
            parentdeleteprompt(e){
                console.log(e)
                this.currentparent = e
                this.dialog = !this.dialog
            },
            goto(){
                this.$router.push('/dashboard')
            },
            async removeparentcollection(e){
                console.log("Deleted",e)
                this.dialog = !this.dialog
                this.overlay = !this.overlay
                let token = document.cookie.split(";")[0].split("=")[1]
                this.$axios.setHeader('Authorization', 'Bearer '+token)
                let data = await this.$axios
                .$delete("https://wiredapi.herokuapp.com/category/parent",
                {
                    "parentcategory":e,
                })
                console.log(data)
                this.overlay = !this.overlay
            }
        },


        async _mounted(){
            if(false){
                return
            }
            else{
                this.overlay = !this.overlay
                let token = document.cookie.split(";")[0].split("=")[1]
                this.$axios.setHeader('Authorization', 'Bearer '+token)
                let res = await this.$axios
                .$get("https://wiredapi.herokuapp.com/category/getall")

                console.log(res.data)
                this.categories.push(res.data)
                this.overlay = !this.overlay
            }

        },
        // computed:{
        //     categories(){
        //         return this.$store.getters["products/getcategory"]
        //     },
        // }
    }
</script>


<!--         <v-row wrap class="px-6">
            <v-col v-for="item in categories" :key="item._id" cols=12>
                <v-card >
                    <v-row>
                        <v-col cols="4">
                           <v-card-title style="background-color: lightgrey" class="text-h4  text-center">{{item.parentcategory}}  
                           </v-card-title>

                           <v-btn @click="parentdeleteprompt(item.parentcategory)" class="ma-3" tile outlined color="red"> Delete Collection<v-icon color="red">mdi-delete</v-icon>
                           </v-btn>


                           
                       </v-col>

                       <v-col cols="6">
                        <span v-for="child in item.childcategory" >
                         <v-btn class="mx-2" tile outlined>
                            {{child}}   
                            <v-icon right color="red">mdi-close-thick</v-icon>
                        </v-btn>

                    </span>
                    <div class="ma-2">
                    <v-btn @click="childopenprompt(item.parentcategory)"tile outlined color="blue"> Add New Child<v-icon color="blue">mdi-plus</v-icon>
                           </v-btn>
                           </div>
                </v-col>
                <v-col cols="2">

                </v-col>
            </v-row>

        </v-card>
    </v-col>
</v-row> -->

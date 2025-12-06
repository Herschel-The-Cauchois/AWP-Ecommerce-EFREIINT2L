<template>

    <main>
        <h1>Add a new Event</h1>

        <form action="javascript:;" @submit.prevent="tryCreate" enctype="multipart/form-data">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" v-model="name"></input><br/>
            <small v-if="EmptyName" class="error-msg">Name field is empty.</small><br v-if="EmptyName"/>
            <label for="category">Category</label>
            <input type="text" id="category" name="category" v-model="category"></input><br/>
            <small v-if="EmptyCategory" class="error-msg">Category field is empty.</small><br v-if="EmptyCategory"/>
            <label for="description">Description</label>
            <input type="text" id="description" name="description" v-model="description"></input><br/>
            <small v-if="EmptyDescription" class="error-msg">Description field is empty.</small><br v-if="EmptyDescription"/>
            <label for="price">Price</label>
            <input type="text" id="price" name="price" v-model="price"></input><br/>
            <small v-if="EmptyPrice" class="error-msg">Price field is empty</small>
            <small v-else-if="WrongFormat" class="error-msg">Price is not a float number.</small> <!-- Do float conversion check -->
            <label for="start">Starting date and time</label>
            <input type="datetime-local" id="start" name="start" v-model="start"></input><br/>
            <small v-if="EmptyStart" class="error-msg">Starting Date and Time field is empty.</small><br v-if="EmptyStart"/>
            <label for="end">Ending date and time</label>
            <input type="datetime-local" id="end" name="end" v-model="end"></input><br/>
            <small v-if="EmptyEnd" class="error-msg">End Date and Time field is empty.</small><br v-if="EmptyEnd"/>
            <small v-else-if="IncorrectDate" class="error-msg">End date is before Start date.</small><br v-else-if="IncorrectDate"/>
            <label for="provname">Provider Name</label>
            <input type="text" id="provname" name="provname" v-model="provname"></input><br/>
            <small v-if="EmptyProvname" class="error-msg">Provider name field is empty.</small><br v-if="EmptyProvname"/>
            <label for="imgurl">Image URL</label>
            <input type="text" id="imgurl" name="imgurl" v-model="imgurl"></input><br/>
            <small v-if="EmptyImgurl" class="error-msg">Image URL field is empty.</small><br v-if="EmptyImgurl"/>
            <small v-else-if="NotAnImage" class="error-msg">Image URL is invalid.</small><br v-if="NotAnImage"/>
            <small v-if="InternalError" class="error-msg">Internal Server Error. Please try later or contact us.</small>
            <small v-else-if="MissingError" class="error-msg">Missing or corrupt information. If this is repeated behavior, contact developers.</small>
            <small v-else-if="IncorrectCredentials" class="error-msg">You are not permitted to do this operation.</small><br/>
            <input type="submit" value="Submit"></input>
        </form>
    </main>

</template>

<script setup>
import { useRouter } from 'vue-router'
import axios from 'axios'
import { ref } from 'vue'

const EmptyDescription = ref(false)
const EmptyName = ref(false)
const InternalError = ref(false)
const EmptyPrice = ref(false)
const WrongFormat = ref(false)
const EmptyCategory = ref(false)
const EmptyProvname = ref(false)
const EmptyImgurl = ref(false)
const EmptyStart = ref(false)
const EmptyEnd = ref(false)
const IncorrectDate = ref(false)
const NotAnImage = ref(false)
const MissingError = ref(false)
const Forbidden = ref(false)
const IncorrectCredentials = ref(false)
var ErrorVariables = [EmptyName, EmptyPrice, EmptyDescription, WrongFormat, EmptyCategory, InternalError, EmptyProvname, EmptyImgurl, EmptyStart, EmptyEnd, IncorrectDate, MissingError, Forbidden, IncorrectCredentials]

const name = defineModel('name')
const price = defineModel('price')
const category = defineModel('category')
const provname = defineModel('provname')
const imgurl = defineModel('imgurl')
const start = defineModel('start')
const end = defineModel('end')
const description = defineModel('description')
const router = useRouter()

function checkImage(url) {
    var image = new Image();
    image.onload = function() {
        if (this.width > 0) {
            return true;
        }
    }
    image.onerror = function() {
        return false;
    }
    image.src = url;
}

function tryCreate() {
    console.log(name.value)
    ErrorVariables.forEach((elem) => elem.value = false) //Sets to false every error flag before attempting new request

    if (name.value === "" | name.value === undefined) {
        EmptyName.value = true
        return
    }
    if (category.value === "" | category.value === undefined) {
        EmptyCategory.value = true
        return
    }
    if (description.value === "" | description.value === undefined) {
        EmptyDescription.value = true
        return
    }
    if (price.value === "" | price.value === undefined) {
        EmptyPrice.value = true
        return
    } 
    if (isNaN(parseFloat(price.value))) {
        WrongFormat.value = true
        return
    }
    if (start.value === "" | start.value === undefined) {
        EmptyStart.value = true
        return
    }
    if (end.value === "" | end.value === undefined) {
        EmptyEnd.value = true
        return
    }
    if (new Date(end.value) < new Date(start.value)) {
        IncorrectDate.value = true
        return
    }
    if (provname.value === "" | provname.value === undefined) {
        EmptyProvname.value = true
        return
    }
    if (imgurl.value === "" | imgurl.value === undefined) {
        EmptyImgurl.value = true
        return
    }
    if (checkImage(imgurl.value)) {
        NotAnImage.value = true
        return
    }

    axios({
        method: "put",
        url: "http://localhost:5000/products",
        data: {
            name: name.value,
            category: category.value,
            price: price.value,
            description: description.value,
            start: start.value,
            end: end.value,
            providerName: provname.value,
            imgurl: imgurl.value,
            rating: 3,
            token: localStorage.getItem("user")
        },
    }).then(res => {
        console.log(res.data); 
        router.push("/provider-dashboard")
    }).catch (err => {
        console.error(err);
        console.log(err.response.data)
        console.log(err.response.status)
        switch (err.response.status) {
            case 500:
                InternalError.value = true
                break
            case 400:
                MissingError.value = true
                break
            case 403: //Normally, if routing works correctly, these last two shouldn't be triggered. this is more like a fail-safe.
                Forbidden.value = true
                break
            case 401:
                IncorrectCredentials.value = true
            default:
                console.error("Invalid HTTP response status")
                break
        }
    })

}

</script>

<style scoped>

main {
    border: solid black;
    border-radius: 5px;
    margin-top: 3em;
    margin-bottom: 1em;
    padding-bottom: 2rem;
    padding-left: 2rem;
    text-align: left;
}

.error-msg {
    color:red;
    text-decoration: underline;
}

input[type=submit] {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.25s ease;
  margin-top: 1rem;
}

input[type=submit]:hover {
  background: #4338ca;
  transform: scale(1.03);
}

input[type=submit]:active {
  transform: scale(0.98);
}

input[type=password], input[type=text], input[type=email], input[type="datetime-local"] {
    width: 80%;
    padding: 1em;
}

label {
    margin-bottom: 1em;
    margin-top: 1em;
    display: block;
}


</style>
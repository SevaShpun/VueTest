<template>
  <div id="app">
    <h2>Create User Form</h2>
    <UserForm/>

    <h2>Edit User Form</h2>
    <UserForm :id="1"/>
  </div>
</template>

<script>
// import { required } from "vuelidate/lib/validators";

import FormBuilder from "./builders/FormBuilder";
import FormDirector from "./builders/FormDirector";

// import UserForm from "./components/UserForm.vue";
// import UserProvider from "./components/UserProvider.vue";
// import FormInput from "./components/FormInput.vue";
// import FormTextarea from "./components/FormTextarea.vue";

export default {
  name: "App",
  components: {
    // UserForm
    // UserForm: new FormBuilder()
    //   .withProvider(UserProvider)
    //   .addField({
    //     component: FormInput,
    //     label: "Name",
    //     name: "name",
    //     options: {
    //       attrs: {
    //         placeholder: "Your name"
    //       }
    //     },
    //     validation: {
    //       required
    //     }
    //   })
    //   .addField({
    //     component: FormTextarea,
    //     label: "Description",
    //     name: "description",
    //     options: {
    //       attrs: {
    //         placeholder: "About you"
    //       }
    //     }
    //   })
    //   .build()
    UserForm: new FormDirector(new FormBuilder()).makeUserForm()
  }
};
</script>

<style>
#app {
  padding: 1em;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

h2 {
  font-size: 2em;
  margin-bottom: 0.75em;
}

h2:not(:first-child) {
  margin-top: 0.75em;
}

input,
textarea {
  border-radius: 0.25em;
  padding: 0.75em;
  border: 1px solid #999;
}
</style>

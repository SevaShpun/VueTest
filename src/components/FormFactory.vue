<template>
  <form class="form-factory" @submit.prevent="submit">
    <div v-if="success" class="form-factory-success">Success!</div>
    <template v-else>
      <FormGroup v-for="field in fieldsWithDefaults" :key="field.name">
        <FormLabel :for="`${_uid}-${field.name}`">
          {{ field.label }}
          <template v-if="field.validation.required">*</template>
        </FormLabel>
        <Component
          v-model="data[field.name]"
          :is="field.component"
          v-bind="{ ...field.options.props, ...field.options.attrs }"
          :id="`${_uid}-${field.name}`"
          @input="$v.data[field.name].$touch()"
        />
        <FormInlineMessage v-if="$v.data[field.name].$error">Please fill in this field correctly.</FormInlineMessage>
      </FormGroup>
      <button>Submit</button>
    </template>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";

import FormGroup from "./FormGroup.vue";
import FormInlineMessage from "./FormInlineMessage.vue";
import FormLabel from "./FormLabel.vue";

const defaultField = {
  component: null,
  label: "",
  name: "",
  options: {},
  validation: {}
};

export default {
  name: "FormFactory",
  mixins: [validationMixin],
  // Injecting dependencies makes it
  // possible or reuse this component
  // for all kinds of content types.
  inject: ["fetch", "post"],
  components: {
    FormGroup,
    FormInlineMessage,
    FormLabel
  },
  props: {
    fields: {
      default: () => [],
      type: Array
    },
    id: {
      default: null,
      type: [Number, String]
    }
  },
  data() {
    return {
      data: {},
      success: false
    };
  },
  computed: {
    // Apply default field configuration
    // to make sure all properties we rely
    // on in the template do exist.
    fieldsWithDefaults() {
      return this.fields.map(x => ({ ...defaultField, ...x }));
    }
  },
  async created() {
    if (this.id) {
      this.data = await this.fetch(this.id);
    }
  },
  methods: {
    async submit() {
      this.$v.$touch();
      if (this.$v.$error) return;

      const { success } = await this.post(this.data);
      this.success = success;
    }
  },
  // The vuelidate validation configuration is
  // automatically generated for us.
  validations() {
    const data = this.fieldsWithDefaults
      .filter(x => x.validation)
      .reduce(
        (prev, field) => ({
          ...prev,
          [field.name]: field.validation
        }),
        {}
      );
    return { data };
  }
};
</script>

<style>
.form-factory > :not(:first-child) {
  margin-top: 1em;
}

.form-factory-success {
  color: green;
}
</style>

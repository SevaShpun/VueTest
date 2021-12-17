import FormFactory from "../components/FormFactory.vue";

export default class FormBuilder {
  constructor() {
    this.props = {
      fields: []
    };
  }

  withProvider(provider) {
    this.provider = provider;
    return this;
  }

  addField(field) {
    this.props.fields.push(field);
    return this;
  }

  build() {
    const Provider = this.provider;
    const props = this.props;

    return {
      props: {
        id: {
          default: null,
          type: [Number, String]
        }
      },
      render(h) {
        return h(Provider, [
          h(FormFactory, { props: { id: this.id, ...props } })
        ]);
      }
    };
  }
}

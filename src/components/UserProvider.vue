<script>
const users = [
  { id: 1, name: "Jane Doe", description: "Nice person" },
  { id: 2, name: "John Doe", description: "Nice person" }
];

export default {
  name: "UserProvider",
  provide: {
    fetch: id => Promise.resolve(users.find(x => x.id === id)),
    post: user => users.push(user) && Promise.resolve({ success: true })
  },
  render() {
    return this.$slots.default;
  }
};
</script>
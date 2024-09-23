# CASL Stencil

This package allows to integrate `@casl/ability` with Stencil component. It provides Can component that allow to hide or show UI elements based on user ability to see them.

## Installation

```sh
bun install @casl/ability casl-stencil
```

## Can component

It accepts children and 6 properties:

- `do` - name of the action (e.g., `read`, `update`). Has an alias `I`
- `on` - checked subject. Has `a`, `an`, `this` aliases
- `field` - checked field

  ```jsx
  export default ({ post }) => (
    <Can I="read" this={post} field="title">
      Yes, you can do this! ;)
    </Can>
  );
  ```

- `not` - inverts ability check and show UI if user cannot do some action:

  ```jsx
  export default () => (
    <Can not I="create" a="Post">
      You are not allowed to create a post
    </Can>
  );
  ```

- `passThrough` - renders children in spite of what `ability.can` returns. This is useful for creating custom components based on `Can`. For example, if you need to disable button based on user permissions:

  ```jsx
  export default () => (
    <Can I="create" a="Post" passThrough>
      {(allowed) => <button disabled={!allowed}>Save</button>}
    </Can>
  );
  ```

- `ability` - an instance of `Ability` which will be used to check permissions
- `children` - elements to hide or render. May be either a render function:

  ```jsx
  export default () => (
    <Can I="create" a="Post" ability={ability}>
      {() => <button onClick={this.createPost}>Create Post</button>}
    </Can>
  );
  ```

  or JSX elements:

  ```jsx
  export default () => (
    <Can I="create" a="Post" ability={ability}>
      <button onClick={this.createPost}>Create Post</button>
    </Can>
  );
  ```

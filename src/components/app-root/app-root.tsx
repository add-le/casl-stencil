import { defineAbility } from "@casl/ability";
import { Component, h, Host } from "@stencil/core";
import { Can, CASL } from "../casl";

@Component({
  tag: "app-root",
  styleUrl: "app-root.css",
})
export class AppRoot {
  public constructor() {
    const defaultAbility = defineAbility((can, cannot) => {
      can("manage", "all");
      cannot("delete", "User");
    });

    CASL.loadAbility(defaultAbility);
  }

  render() {
    return (
      <Host>
        <Can I="create" a="Todo">
          <p>Yes I can do that!</p>
        </Can>

        <Can I="delete" a="User">
          <p>This text won't show up!</p>
        </Can>
      </Host>
    );
  }
}

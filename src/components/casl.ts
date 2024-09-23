import { type AnyAbility } from "@casl/ability";
import type { FunctionalComponent, VNode } from "@stencil/core";

/** CASL Stencil factory to configure components behavior. */
export class CASL {
  /** Represents the default CASL Ability. */
  public static readonly defaultAbility: AnyAbility;
  /** Load a CASL Ability to be used by the factory and all `Can` components. */
  public static loadAbility(ability: AnyAbility): void {
    (this.defaultAbility as any) = ability;
  }
}

interface CanProps {
  /** Checked subject. Has `an`, `of`, `on`, `this` aliases. */
  a?: string;
  /** An instance of `Ability` which will be used to check permissions. */
  ability?: AnyAbility;
  /** Checked subject. Has `a`, `of`, `on`, `this` aliases. */
  an?: string;
  /** Name of the action (e.g., `read`, `update`). Has an alias `I`. */
  do?: string;
  /** 
   * Checked field.
   * @example 
   * ```tsx
    export default ({ post }) => <Can I="read" this={post} field="title">
      Yes, you can do this!
    </Can>;
   * ```
   */
  field?: string;
  /** Name of the action (e.g., `read`, `update`). Has an alias `do`. */
  I?: string;
  /** 
   * Inverts ability check and show UI if user cannot do some action.
   * @example
   * ```tsx
    export default () => <Can not I="create" a="Post">
      You are not allowed to create a post!
    </Can>
   * ```
   */
  not?: boolean;
  /** Checked subject. Has `a`, `an`, `on`, `this` aliases. */
  of?: string;
  /** Checked subject. Has `a`, `an`, `of`, `this` aliases. */
  on?: string;
  /** 
   * Renders children in spite of what `ability.can` returns. This is useful for creating custom components based on `Can`. For example, if you need to disable button based on user permissions.
   * @example
   * ```tsx
    export default () => (
      <Can I="create" a="Post" passThrough>
        {allowed => <button disabled={!allowed}>Save</button>}
      </Can>
    )
   * ```
   */
  passThrough?: boolean;
  /** Checked subject. Has `a`, `an`, `of`, `on` aliases. */
  this?: string;
}

/** CASL Stencil component provides useful interface  that allow to hide or show UI elements based on user ability to see them. */
export const Can: FunctionalComponent<CanProps> = (props, children) => {
  const ability = props.ability || CASL.defaultAbility;
  if (!ability) return null;

  const subject = props.of || props.a || props.an || props.this || props.on;
  if (!subject || (!props.I && !props.do)) return null;

  const can = props.not ? "cannot" : "can";
  const canRender = ability[can](props.I || props.do, subject, props.field);

  const firstChild = children[0] as Function | VNode;
  if (props.passThrough || canRender) {
    return typeof firstChild === "function"
      ? firstChild(canRender, ability)
      : children;
  }

  return null;
};

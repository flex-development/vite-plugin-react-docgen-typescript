/**
 * @file Fixtures - List
 * @module fixtures/List
 */

import type { LiHTMLAttributes, OlHTMLAttributes, Ref } from 'react'
import s, { css } from 'styled-components'

interface ListProps<
  T extends HTMLOListElement | HTMLUListElement =
    | HTMLOListElement
    | HTMLUListElement
> extends OlHTMLAttributes<T> {
  /**
   * List items to render.
   *
   * @default []
   */
  $items?: LiHTMLAttributes<HTMLLIElement>[]

  /**
   * Type of list to render.
   *
   * @default 'ul'
   */
  as?: 'ol' | 'ul'

  /**
   * Reference to inner list element.
   */
  ref?: Ref<T>
}

/**
 * Renders an HTML `<ol>` or `<ul>` element.
 *
 * Pass `props.as` to change the list type.
 *
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/ol
 * @see https://developer.mozilla.org/docs/Web/HTML/Element/ul
 * @see https://developer.mozilla.org/docs/Web/API/HTMLOListElement
 * @see https://developer.mozilla.org/docs/Web/API/HTMLUListElement
 */
const List = s.ul.attrs<ListProps>(p => ({
  'aria-hidden': p.hidden ?? undefined,
  children: (() => {
    if (!p.$items || p.$items.length === 0) return p.children
    return p.$items.map((item, i) => <li {...item} key={i} />)
  })()
}))<ListProps>(() => css``)

List.displayName = 'List'
List.defaultProps = {
  $items: [],
  as: 'ul'
}

export default List
export { type ListProps }

import type { ReactElement, JSXElementConstructor } from "react";
import { memo, Fragment, useLayoutEffect, useRef, useState } from "react";
// 工具类函数
import { equals, isNil, map, filter, not } from "ramda";
import { useUpdate } from "@/hooks/libs";
// 组件
import { KeepAliveComponent } from "./KeepAliveComponent";

export * from "./KeepAliveComponent";
export type Children = ReactElement<
  any,
  string | JSXElementConstructor<any>
> | null;

interface Props {
  activeName?: string;
  isAsyncInclude?: boolean; // 是否异步添加 Include  如果不是又填写了 true 会导致重复渲染
  include?: Array<string>;
  exclude?: Array<string>;
  maxLen?: number;
  children: Children;
}
const KeepAlive = (props: Props) => {
  const {
    activeName,
    children,
    exclude,
    include,
    isAsyncInclude = false,
    maxLen = 10,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const components = useRef<Array<{ name: string; ele: Children }>>([]);
  const [asyncInclude] = useState(isAsyncInclude);
  const update = useUpdate();

  useLayoutEffect(() => {
    if (isNil(activeName)) {
      return;
    }
    // 缓存超过上限的 干掉第一个缓存
    if (components.current.length >= maxLen) {
      components.current = components.current.slice(1);
    }
    // 检索缓存中是否有匹配的组件
    const component = components.current.find((res) =>
      equals(res.name, activeName)
    );
    // 判断是否有匹配的组件，如果没有，则添加
    // 如果已经有匹配 key 了，则不执行操作
    if (isNil(component)) {
      components.current = components.current.concat({
        name: activeName,
        ele: children,
      });
      if (not(asyncInclude)) {
        update();
      }
    }
    // 当组件卸载时（即依赖发生变化时），移除缓存中的黑名单组件
    return () => {
      // 处理 黑白名单
      if (isNil(exclude) && isNil(include)) {
        return;
      }
      components.current = filter(({ name }) => {
        if (exclude && exclude.includes(name)) {
          return false;
        }
        if (include) {
          return include.includes(name);
        }
        return true;
      }, components.current);
    };
  }, [children, activeName, exclude, maxLen, include, update, asyncInclude]);

  return (
    <Fragment>
      <div ref={containerRef} className="keep-alive" />
      {map(
        ({ name, ele }) => (
          <KeepAliveComponent
            active={equals(name, activeName)}
            renderDiv={containerRef}
            name={name}
            key={name}
          >
            {ele}
          </KeepAliveComponent>
        ),
        components.current
      )}
    </Fragment>
  );
};
export default memo(KeepAlive);

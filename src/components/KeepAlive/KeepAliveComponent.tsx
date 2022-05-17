import ReactDOM from "react-dom";
import type { RefObject } from "react";
import { memo, Fragment, useEffect, useRef, useState } from "react";

// 类型
import type { Children } from ".";

interface ComponentProps {
  active: boolean;
  children: Children;
  name: string;
  renderDiv: RefObject<HTMLDivElement>;
}
// 渲染 当前匹配的路由 不匹配的 利用createPortal 移动到 document.createElement('div') 里面
function Component({ active, children, name, renderDiv }: ComponentProps) {
  const [targetElement] = useState(() => document.createElement("div"));
  const activatedRef = useRef(false);
  activatedRef.current = activatedRef.current || active;
  useEffect(() => {
    if (active) {
      // 渲染匹配的组件
      renderDiv.current?.appendChild(targetElement);
    } else {
      try {
        // 移除不渲染的组件
        renderDiv.current?.removeChild(targetElement);
      } catch (e) {}
    }
  }, [active, name, renderDiv, targetElement]);
  useEffect(() => {
    // 添加一个id 作为标识 并没有什么太多作用
    targetElement.setAttribute("id", name);
  }, [name, targetElement]);
  // 把vnode 渲染到document.createElement('div') 里面
  return (
    <Fragment>
      {activatedRef.current && ReactDOM.createPortal(children, targetElement)}
    </Fragment>
  );
}
export const KeepAliveComponent = memo(Component);

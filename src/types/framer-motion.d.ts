import * as React from 'react';
import { MotionProps, MotionStyle, Variants, Transition } from 'framer-motion';

declare module 'framer-motion' {
  export interface MotionProps {
    as?: keyof JSX.IntrinsicElements;
    children?: React.ReactNode | MotionValue<number> | MotionValue<string> | MotionValue<any>;
    style?: MotionStyle;
    initial?: boolean | string | TargetAndTransition | VariantLabels;
    animate?: AnimationControls | TargetAndTransition | VariantLabels | boolean;
    exit?: TargetAndTransition | VariantLabels;
    variants?: Variants;
    transition?: Transition;
    custom?: any;
    inherit?: boolean;
    layout?: boolean | "position" | "size" | "preserve-aspect" | undefined;
    layoutId?: string;
    onUpdate?: (latest: { [key: string]: string | number }) => void;
    onAnimationStart?: () => void;
    onAnimationComplete?: () => void;
    onHoverStart?: (event: MouseEvent, info: EventInfo) => void;
    onHoverEnd?: (event: MouseEvent, info: EventInfo) => void;
    onDragStart?: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
    onDrag?: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
    onDragEnd?: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
    onViewportEnter?: (entry: IntersectionObserverEntry) => void;
    onViewportLeave?: (entry: IntersectionObserverEntry) => void;
    viewport?: ViewportOptions;
  }

  export const motion: {
    [key in keyof JSX.IntrinsicElements]: React.ForwardRefExoticComponent<
      MotionProps & React.RefAttributes<HTMLElement>
    >;
  };

  export function motion<T extends keyof JSX.IntrinsicElements>(
    component: T
  ): React.ForwardRefExoticComponent<MotionProps & React.RefAttributes<HTMLElement>>;

  export function motion<T>(
    component: React.ComponentType<T>
  ): React.ForwardRefExoticComponent<MotionProps & T & React.RefAttributes<HTMLElement>>;

  export * from 'framer-motion';
  export { default } from 'framer-motion';
}

// Export the types for use in your application
export type { MotionProps, MotionStyle, Variants, Transition };

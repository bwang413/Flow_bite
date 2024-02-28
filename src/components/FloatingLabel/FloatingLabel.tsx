import type { ComponentPropsWithoutRef } from 'react';
import { forwardRef, useId } from 'react';
import { twMerge } from 'tailwind-merge';
import { mergeDeep } from '../../helpers/merge-deep';
import { getTheme } from '../../theme-store';
import type { DeepPartial } from '../../types';
fix/disable-eslint-warning-on-floating-label
import type { FlowbiteColors, FlowbiteSizes } from '../Flowbite';

export interface FlowbiteFloatingLabelHelperText extends Partial<FlowbiteColors> {
  default: string
  success: string
  error: string
}

export interface FlowbiteFloatingLabelTheme {
  input: {
    [key: string]: {
      [key: string]: {
        [key: string]: string
      }
    }
  };
  label: {
    [key: string]: {
      [key: string]: {
        [key: string]: string
      }
    }
  };
  helperText: FlowbiteFloatingLabelHelperText;
}

export interface FlowbiteFloatingLabelSizes extends Pick<FlowbiteSizes, 'sm' | 'md' | 'lg'> {
  [key: string]: string;
}

export interface FloatingLabelProps extends ComponentPropsWithoutRef<'input'> {
  label: string;
  helperText?: string;
  color?: FloatingLabelColor;
  sizing?: FloatingLabelSizing;
  variant: FloatingLabelVariant;
  disabled?: boolean;
  theme?: DeepPartial<FlowbiteFloatingLabelTheme>;
}

export const FloatingLabel = forwardRef<HTMLInputElement, FloatingLabelProps>(
  (
    {
      label,
      helperText,
      color = 'default',
      sizing = 'md',
      variant,
      disabled = false,
      theme: customTheme = {},
      className,
      ...props
    },
    ref,
  ) => {
    const randomId = useId();
    const theme = mergeDeep(getTheme().floatingLabel, customTheme);

    return (
      <div>
        <div className={twMerge('relative', variant === 'standard' ? 'z-0' : '')}>
          <input
            type="text"
            id={props.id ? props.id : 'floatingLabel' + randomId}
            aria-describedby="outlined_success_help"
            className={twMerge(theme.input[color][variant][sizing], className)}
            placeholder=" "
            data-testid="floating-label"
            disabled={disabled}
            {...props}
            ref={ref}
          />
          <label
            htmlFor={props.id ? props.id : 'floatingLabel' + randomId}
            className={twMerge(theme.label[color][variant][sizing], className)}
          >
            {label}
          </label>
        </div>
        <p id={'outlined_helper_text' + randomId} className={twMerge(theme.helperText[color], className)}>
          {helperText}
        </p>
      </div>
    );
  },
);

FloatingLabel.displayName = 'FloatingLabel';

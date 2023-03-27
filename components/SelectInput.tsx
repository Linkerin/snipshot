import React, {
  Children,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState
} from 'react';
import {
  BoxProps,
  Card,
  chakra,
  LayoutProps,
  List,
  ListItemProps,
  Text
} from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

import ArrowDownIcon from './Icons/ArrowDownIcon';
import ArrowUpIcon from './Icons/ArrowUpIcon';
import CenteredListItem from './CenteredListItem';

const SelectContainer = chakra('div', {
  baseStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    h: 10,
    minWidth: 0,
    outline: 0,
    position: 'relative',
    appearance: 'none',
    transitionProperty: 'common',
    transitionDuration: 'normal',
    _disabled: {
      opacity: 0.4,
      cursor: 'not-allowed'
    },
    border: '1px solid',
    borderColor: 'inherit',
    borderRadius: 'md',
    bg: 'inherit',
    paddingLeft: 4,
    paddingRight: 2,
    _hover: {
      borderColor: mode('gray.300', 'whiteAlpha.400')
    },
    _readOnly: {
      boxShadow: 'none !important',
      userSelect: 'all'
    },
    _focus: {
      borderColor: 'blue.500',
      borderWidth: '2px'
    }
  }
});

interface SelectOptionProps extends Omit<ListItemProps, 'value'> {
  value: string | number | readonly string[] | undefined;
}

export function SelectOption(props: SelectOptionProps) {
  return (
    <CenteredListItem
      cursor="pointer"
      tabIndex={0}
      _hover={{ bgColor: 'gray.200' }}
      p={3}
      {...props}
    />
  );
}

interface SelectInputProps extends Omit<BoxProps, 'children' | 'onChange'> {
  children:
    | React.ReactElement<SelectOptionProps>
    | React.ReactElement<SelectOptionProps>[];
  name: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  optionsListHeight?: LayoutProps['maxHeight'];
  value?: string | number | readonly string[];
}

interface OptionsPositionState {
  top?: number;
  bottom?: number;
}

function SelectInput({
  children,
  id,
  name,
  onChange,
  optionsListHeight,
  title,
  value,
  ...props
}: SelectInputProps) {
  const [open, setOpen] = useState(false);
  const [optionsPosition, setOptionsPosition] = useState<OptionsPositionState>({
    top: undefined,
    bottom: undefined
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelectClick = () => {
    // Set which direction options list will be opened regarding to the select container
    if (typeof window !== 'undefined') {
      const top = containerRef?.current?.getBoundingClientRect().top;
      if (top && window.innerHeight / 2 < top) {
        setOptionsPosition({ bottom: 12, top: undefined });
      } else {
        setOptionsPosition({ bottom: undefined, top: 12 });
      }
    }

    setOpen(prevState => !prevState);
  };

  const handleOutClick = (e: MouseEvent) => {
    if (e.target instanceof Element && containerRef.current?.contains(e.target))
      return;

    setOpen(false);
  };

  const handleKeyUp: KeyboardEventHandler = e => {
    e.preventDefault();

    switch (e.key) {
      case 'Enter':
      case ' ':
        handleSelectClick();
        break;

      case 'ArrowDown':
        if (!open) handleSelectClick();
        break;

      case 'ArrowUp':
        if (open) handleSelectClick();
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleOutClick);
    } else {
      document.removeEventListener('mousedown', handleOutClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutClick);
    };
  }, [open]);

  useEffect(() => {
    const handler = (e: any) => {
      onChange(e);
    };

    const container = containerRef?.current;
    container?.addEventListener('change', handler);

    return () => {
      container?.removeEventListener('change', handler);
    };
  }, [onChange]);

  return (
    <SelectContainer
      ref={containerRef}
      id={id}
      title={title}
      onClick={handleSelectClick}
      onKeyUp={handleKeyUp}
      aria-haspopup="listbox"
      aria-expanded={open}
      tabIndex={0}
      position="relative"
      zIndex={1}
      {...props}
    >
      {value ? (
        <List sx={{ li: { p: 0 } }}>
          {Children.map(children, child => {
            if (child.props.value === value) return child;
          })}
        </List>
      ) : (
        <Text fontSize="sm" color="gray.600" noOfLines={1}>
          {props.placeholder ?? 'Select'}
        </Text>
      )}
      {open ? <ArrowUpIcon /> : <ArrowDownIcon />}
      {open && (
        <Card
          position="absolute"
          bottom={optionsPosition.bottom}
          top={optionsPosition.top}
          left="0"
          maxHeight={optionsListHeight ?? '30vh'}
          overflowY="scroll"
          w="100%"
        >
          <List display="flex" flexDirection="column" alignItems="flex-start">
            {Children.map(children, child => {
              const handleClick: React.MouseEventHandler<HTMLLIElement> = e => {
                e.preventDefault();

                Object.defineProperties(e.target, {
                  name: { value: name, writable: false },
                  value: { value: child.props.value, writable: false }
                });

                e.target.dispatchEvent(new Event('change', { bubbles: true }));

                if (child.props.onClick) {
                  child.props.onClick(e);
                }
                return;
              };

              return React.cloneElement(
                child,
                { onClick: handleClick },
                child.props.children
              );
            })}
          </List>
        </Card>
      )}
    </SelectContainer>
  );
}

export default SelectInput;

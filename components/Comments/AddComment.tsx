import { useRef, useState } from 'react';
import {
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Textarea
} from '@chakra-ui/react';

import SendIcon from '@/components/Icons/SendIcon';

function AddComment() {
  const [comment, setComment] = useState('');
  const [helper, setHelper] = useState('');

  const sendBtnRef = useRef<HTMLButtonElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value[0] === ' ') {
      setHelper("A comment can't start with space 🤔");
      return;
    }

    if (value.length > 512) {
      setHelper('Oh, seems you are writing too much. 512 symbols is a limit. ');
      return;
    }

    if (helper) setHelper('');
    setComment(value);
  };

  const handleInputKeyDown: React.KeyboardEventHandler<
    HTMLInputElement
  > = e => {
    if (e.code === 'Enter' && e.shiftKey) {
      e.preventDefault();
      sendBtnRef?.current?.click();
    }
  };

  return (
    <FormControl>
      <InputGroup>
        <Input
          name="comment"
          aria-label="Your comment"
          placeholder="Your comment"
          maxLength={513}
          value={comment}
          resize="vertical"
          onChange={handleChange}
          onKeyDown={handleInputKeyDown}
        />
        <InputRightElement>
          <IconButton
            ref={sendBtnRef}
            icon={<SendIcon />}
            aria-label="Publish your comment"
            isDisabled={!comment}
            variant="outline"
            size="sm"
          />
        </InputRightElement>
      </InputGroup>
      <FormHelperText ml={4}>{helper}</FormHelperText>
    </FormControl>
  );
}

export default AddComment;

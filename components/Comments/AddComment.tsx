import { MouseEventHandler, useContext, useRef, useState } from 'react';
import {
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue
} from '@chakra-ui/react';

import { AuthContext } from '@/context/AuthContext';
import fetchIsPostingAllowed from '@/services/redis/services/fetchIsPostingAllowed';
import SendIcon from '@/components/Icons/SendIcon';
import { SnippetIdContext } from '../Pages/SnippetPage';

function AddComment() {
  const [comment, setComment] = useState('');
  const [helper, setHelper] = useState('');
  const [isSavingComment, setIsSavingComment] = useState(false);

  const snippetId = useContext(SnippetIdContext);
  const user = useContext(AuthContext);

  const sendBtnRef = useRef<HTMLButtonElement | null>(null);

  const sendBtnColor = useColorModeValue(
    'primary-light-theme',
    'primary-dark-theme'
  );

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

  const handleSave: MouseEventHandler<HTMLButtonElement> = async e => {
    e.preventDefault();
    if (isSavingComment || comment.length === 0 || !snippetId || !user?.id)
      return;

    if (helper) setHelper('');
    setIsSavingComment(true);
    try {
      const postingPermission = await fetchIsPostingAllowed(user?.id);

      if (postingPermission.allowed) {
        const supabase = (await import('@/services/supabase')).default;
        const { error } = await supabase.from('comments').insert({
          user_id: user?.id,
          snippet_id: snippetId,
          parent: null,
          comment
        });
        if (error) throw error;

        setComment('');

        return;
      } else {
        setHelper(postingPermission.message);
      }
    } catch (err) {
      console.error(err);
      setHelper('Something went wrong. Please, try again later.');
    } finally {
      setIsSavingComment(false);
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
          isDisabled={isSavingComment}
          onChange={handleChange}
          onKeyDown={handleInputKeyDown}
        />
        <InputRightElement>
          <IconButton
            ref={sendBtnRef}
            icon={<SendIcon />}
            aria-label="Publish your comment"
            isDisabled={!comment}
            isLoading={isSavingComment}
            variant="outline"
            colorScheme={sendBtnColor}
            size="sm"
            onClick={handleSave}
          />
        </InputRightElement>
      </InputGroup>
      <FormHelperText ml={4}>{helper}</FormHelperText>
    </FormControl>
  );
}

export default AddComment;

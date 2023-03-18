import { MouseEventHandler, useContext, useRef, useState } from 'react';
import {
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';

import { AuthContext } from '@/context/AuthContext';
import SendIcon from '@/components/Icons/SendIcon';
import { SnippetIdContext } from '@/pages/snippets/[lang]/[snippet]';

function AddComment() {
  const [comment, setComment] = useState('');
  const [helper, setHelper] = useState('');
  const [isSavingComment, setIsSavingComment] = useState(false);

  const snippetId = useContext(SnippetIdContext);
  const user = useContext(AuthContext);

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

  const handleSave: MouseEventHandler<HTMLButtonElement> = async e => {
    e.preventDefault();
    if (isSavingComment || comment.length === 0 || !snippetId) return;

    setIsSavingComment(true);
    try {
      const supabase = (await import('../../services/supabase')).default;

      const { data, error } = await supabase.rpc('create_comment', {
        comment_content: comment,
        user_key: user?.id,
        parent_comment_key: null,
        snippet_key: snippetId
      });
      if (error) throw error;

      setComment('');
    } catch (err) {
      console.error(err);
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

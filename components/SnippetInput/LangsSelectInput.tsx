import { ListIcon } from '@chakra-ui/react';

import LangIcon from '@/components/Icons/LangIcons/LangIcon';
import { LANGS } from '@/services/constants';
import { LangsType } from '@/services/types';
import SelectInput, { SelectOption } from '@/components/SelectInput';

interface LangsSelectInputProps {
  onChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >;
  langValue: LangsType;
}

function LangsSelectInput({ onChange, langValue }: LangsSelectInputProps) {
  return (
    <SelectInput
      id="lang"
      name="lang"
      placeholder="Select language"
      h={{ base: 12, lg: 10 }}
      value={langValue}
      onChange={onChange}
    >
      {LANGS.map(lang => {
        return (
          <SelectOption key={lang} value={lang}>
            <ListIcon boxSize={6}>
              <LangIcon lang={lang} />
            </ListIcon>
            {lang}
          </SelectOption>
        );
      })}
    </SelectInput>
  );
}

export default LangsSelectInput;

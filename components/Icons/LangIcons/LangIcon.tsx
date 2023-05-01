import dynamic from 'next/dynamic';
import { IconProps } from '@chakra-ui/react';

import { LangsType } from '@/services/types';

const BashIcon = dynamic(() => import('./BashIcon'));
const CIcon = dynamic(() => import('./CIcon'));
const CPlusPlusIcon = dynamic(() => import('./CPlusPlusIcon'));
const CSharpIcon = dynamic(() => import('./CSharpIcon'));
const CssIcon = dynamic(() => import('./CssIcon'));
const GoIcon = dynamic(() => import('./GoIcon'));
const HaskellIcon = dynamic(() => import('./HaskellIcon'));
const HtmlIcon = dynamic(() => import('./HtmlIcon'));
const JavaIcon = dynamic(() => import('./JavaIcon'));
const JavaScriptIcon = dynamic(() => import('./JavaScriptIcon'));
const KotlinIcon = dynamic(() => import('./KotlinIcon'));
const NextIcon = dynamic(() => import('./NextIcon'));
const OtherLangIcon = dynamic(() => import('./OtherLangIcon'));
const PhpIcon = dynamic(() => import('./PhpIcon'));
const PythonIcon = dynamic(() => import('./PythonIcon'));
const RIcon = dynamic(() => import('./RIcon'));
const ReactIcon = dynamic(() => import('./ReactIcon'));
const RubyIcon = dynamic(() => import('./RubyIcon'));
const RustIcon = dynamic(() => import('./RustIcon'));
const SqlIcon = dynamic(() => import('./SqlIcon'));
const SwiftIcon = dynamic(() => import('./SwiftIcon'));
const TypeScriptIcon = dynamic(() => import('./TypeScriptIcon'));

interface LangIconProps extends IconProps {
  lang: LangsType;
  disabled?: boolean;
}

function LangIcon({ lang, disabled, ...props }: LangIconProps) {
  switch (lang) {
    case 'Bash':
      return <BashIcon disabled={disabled} {...props} />;

    case 'C':
      return <CIcon disabled={disabled} {...props} />;

    case 'C++':
      return <CPlusPlusIcon disabled={disabled} {...props} />;

    case 'C#':
      return <CSharpIcon disabled={disabled} {...props} />;

    case 'CSS':
      return <CssIcon disabled={disabled} {...props} />;

    case 'Go':
      return <GoIcon disabled={disabled} {...props} />;

    case 'Haskell':
      return <HaskellIcon disabled={disabled} {...props} />;

    case 'HTML':
      return <HtmlIcon disabled={disabled} {...props} />;

    case 'Java':
      return <JavaIcon disabled={disabled} {...props} />;

    case 'JavaScript':
      return <JavaScriptIcon disabled={disabled} {...props} />;

    case 'Kotlin':
      return <KotlinIcon disabled={disabled} {...props} />;

    case 'NextJS':
      return <NextIcon disabled={disabled} {...props} />;

    case 'PHP':
      return <PhpIcon disabled={disabled} {...props} />;

    case 'Python':
      return <PythonIcon disabled={disabled} {...props} />;

    case 'R':
      return <RIcon disabled={disabled} {...props} />;

    case 'React':
      return <ReactIcon disabled={disabled} {...props} />;

    case 'Ruby':
      return <RubyIcon disabled={disabled} {...props} />;

    case 'Rust':
      return <RustIcon disabled={disabled} {...props} />;

    case 'SQL':
      return <SqlIcon disabled={disabled} {...props} />;

    case 'Swift':
      return <SwiftIcon disabled={disabled} {...props} />;

    case 'TypeScript':
      return <TypeScriptIcon disabled={disabled} {...props} />;

    case 'Other':
      return <OtherLangIcon disabled={disabled} {...props} />;

    default:
      return <></>;
  }
}

export default LangIcon;

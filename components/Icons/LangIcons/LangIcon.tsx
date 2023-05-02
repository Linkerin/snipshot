import dynamic from 'next/dynamic';
import { IconProps } from '@chakra-ui/react';

import { LangsType } from '@/services/types';

const BashIcon = dynamic(() => import('./BashIcon'), { ssr: false });
const CIcon = dynamic(() => import('./CIcon'), { ssr: false });
const CPlusPlusIcon = dynamic(() => import('./CPlusPlusIcon'), { ssr: false });
const CSharpIcon = dynamic(() => import('./CSharpIcon'), { ssr: false });
const CssIcon = dynamic(() => import('./CssIcon'), { ssr: false });
const GoIcon = dynamic(() => import('./GoIcon'), { ssr: false });
const HaskellIcon = dynamic(() => import('./HaskellIcon'), { ssr: false });
const HtmlIcon = dynamic(() => import('./HtmlIcon'), { ssr: false });
const JavaIcon = dynamic(() => import('./JavaIcon'), { ssr: false });
const JavaScriptIcon = dynamic(() => import('./JavaScriptIcon'), {
  ssr: false
});
const KotlinIcon = dynamic(() => import('./KotlinIcon'), { ssr: false });
const NextIcon = dynamic(() => import('./NextIcon'), { ssr: false });
const OtherLangIcon = dynamic(() => import('./OtherLangIcon'), { ssr: false });
const PhpIcon = dynamic(() => import('./PhpIcon'), { ssr: false });
const PythonIcon = dynamic(() => import('./PythonIcon'), { ssr: false });
const RIcon = dynamic(() => import('./RIcon'), { ssr: false });
const ReactIcon = dynamic(() => import('./ReactIcon'), { ssr: false });
const RubyIcon = dynamic(() => import('./RubyIcon'), { ssr: false });
const RustIcon = dynamic(() => import('./RustIcon'), { ssr: false });
const SqlIcon = dynamic(() => import('./SqlIcon'), { ssr: false });
const SwiftIcon = dynamic(() => import('./SwiftIcon'), { ssr: false });
const TypeScriptIcon = dynamic(() => import('./TypeScriptIcon'), {
  ssr: false
});

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

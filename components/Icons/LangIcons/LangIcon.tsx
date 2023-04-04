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

function LangIcon(props: LangIconProps) {
  switch (props.lang) {
    case 'Bash':
      return <BashIcon disabled={props.disabled} {...props} />;

    case 'C':
      return <CIcon disabled={props.disabled} {...props} />;

    case 'C++':
      return <CPlusPlusIcon disabled={props.disabled} {...props} />;

    case 'C#':
      return <CSharpIcon disabled={props.disabled} {...props} />;

    case 'CSS':
      return <CssIcon disabled={props.disabled} {...props} />;

    case 'Go':
      return <GoIcon disabled={props.disabled} {...props} />;

    case 'Haskell':
      return <HaskellIcon disabled={props.disabled} {...props} />;

    case 'HTML':
      return <HtmlIcon disabled={props.disabled} {...props} />;

    case 'Java':
      return <JavaIcon disabled={props.disabled} {...props} />;

    case 'JavaScript':
      return <JavaScriptIcon disabled={props.disabled} {...props} />;

    case 'Kotlin':
      return <KotlinIcon disabled={props.disabled} {...props} />;

    case 'NextJS':
      return <NextIcon disabled={props.disabled} {...props} />;

    case 'PHP':
      return <PhpIcon disabled={props.disabled} {...props} />;

    case 'Python':
      return <PythonIcon disabled={props.disabled} {...props} />;

    case 'R':
      return <RIcon disabled={props.disabled} {...props} />;

    case 'React':
      return <ReactIcon disabled={props.disabled} {...props} />;

    case 'Ruby':
      return <RubyIcon disabled={props.disabled} {...props} />;

    case 'Rust':
      return <RustIcon disabled={props.disabled} {...props} />;

    case 'SQL':
      return <SqlIcon disabled={props.disabled} {...props} />;

    case 'Swift':
      return <SwiftIcon disabled={props.disabled} {...props} />;

    case 'TypeScript':
      return <TypeScriptIcon disabled={props.disabled} {...props} />;

    case 'Other':
      return <OtherLangIcon disabled={props.disabled} {...props} />;

    default:
      return <></>;
  }
}

export default LangIcon;

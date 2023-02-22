import { IconProps } from '@chakra-ui/react';

import { LangsType } from '@/services/types';
import BashIcon from './BashIcon';
import CIcon from './CIcon';
import CPlusPlusIcon from './CPlusPlusIcon';
import CSharpIcon from './CSharpIcon';
import CssIcon from './CssIcon';
import GoIcon from './GoIcon';
import HaskellIcon from './HaskellIcon';
import HtmlIcon from './HtmlIcon';
import JavaIcon from './JavaIcon';
import JavaScriptIcon from './JavaScriptIcon';
import KotlinIcon from './KotlinIcon';
import NextIcon from './NextIcon';
import OtherLangIcon from './OtherLangIcon';
import PhpIcon from './PhpIcon';
import PythonIcon from './PythonIcon';
import RIcon from './RIcon';
import ReactIcon from './ReactIcon';
import RubyIcon from './RubyIcon';
import RustIcon from './RustIcon';
import SqlIcon from './SqlIcon';
import SwiftIcon from './SwiftIcon';
import TypeScriptIcon from './TypeScriptIcon';

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

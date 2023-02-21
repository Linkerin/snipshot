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

interface LangIconProps {
  lang: LangsType;
  disabled?: boolean;
}

function LangIcon({ lang, disabled }: LangIconProps) {
  switch (lang) {
    case 'Bash':
      return <BashIcon disabled={disabled} />;

    case 'C':
      return <CIcon disabled={disabled} />;

    case 'C++':
      return <CPlusPlusIcon disabled={disabled} />;

    case 'C#':
      return <CSharpIcon disabled={disabled} />;

    case 'CSS':
      return <CssIcon disabled={disabled} />;

    case 'Go':
      return <GoIcon disabled={disabled} />;

    case 'Haskell':
      return <HaskellIcon disabled={disabled} />;

    case 'HTML':
      return <HtmlIcon disabled={disabled} />;

    case 'Java':
      return <JavaIcon disabled={disabled} />;

    case 'JavaScript':
      return <JavaScriptIcon disabled={disabled} />;

    case 'Kotlin':
      return <KotlinIcon disabled={disabled} />;

    case 'NextJS':
      return <NextIcon disabled={disabled} />;

    case 'PHP':
      return <PhpIcon disabled={disabled} />;

    case 'Python':
      return <PythonIcon disabled={disabled} />;

    case 'R':
      return <RIcon disabled={disabled} />;

    case 'React':
      return <ReactIcon disabled={disabled} />;

    case 'Ruby':
      return <RubyIcon disabled={disabled} />;

    case 'Rust':
      return <RustIcon disabled={disabled} />;

    case 'SQL':
      return <SqlIcon disabled={disabled} />;

    case 'Swift':
      return <SwiftIcon disabled={disabled} />;

    case 'TypeScript':
      return <TypeScriptIcon disabled={disabled} />;

    case 'Other':
      return <OtherLangIcon disabled={disabled} />;

    default:
      return <></>;
  }
}

export default LangIcon;

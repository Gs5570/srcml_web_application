import Header from '../components/Header';
import '../styles/tutorial.css';
import { CopyBlock } from 'react-code-blocks';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

import YoutubeEmbed from '../components/YoutubeVideo';

import '../styles/header.css';

const embedID = 'McvFUVSGg-g?si=V70qslrX33jzN7OH';
export default function Tutorial() {
  return (
    <div className="tutorial-container">
      <Header />
      <h1>Demonstration</h1>
      <YoutubeEmbed embedID={embedID} />
      <h2>How to use srcml form the terminal</h2>
      <div>
        <h3>Help command:</h3>
        <SyntaxHighlighter
          language="xml"
          style={dracula}
          customStyle={{ margin: '0', paddingLeft: 15 }}
        >
          srcml --help
        </SyntaxHighlighter>

        <p>
          Provide an overview of all available commands along with their
          respective descriptions.
        </p>

        <h3>Convert file and out put to terminal:</h3>
        <SyntaxHighlighter
          language="xml"
          style={dracula}
          customStyle={{ margin: '0', paddingLeft: 15 }}
        >
          srcml [source file]
        </SyntaxHighlighter>
        <p>
          To transform a file to the srcML format, execute srcml on the command
          in the directory where the file is located or with the path the file.
          Using srmcl directly form the terminal without the redirecting the
          output of the conversion to file with display the output straight to
          the command line
        </p>

        <h3>Convert file and how put to a file:</h3>
        <SyntaxHighlighter
          language="xml"
          style={dracula}
          customStyle={{ margin: '0', paddingLeft: 15 }}
        >
          srcml [source file] -o [destination file.extension]
        </SyntaxHighlighter>
        <p>
          {' '}
          To transform a source file file to the srcML format and have the
          output appended to file you ue the -o option. Note that it is
          important to not forget the .extension of the file.{' '}
        </p>
      </div>
    </div>
  );
}

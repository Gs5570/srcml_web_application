import { CopyBlock } from 'react-code-blocks';
import { FaClipboard } from 'react-icons/fa';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism';
import xml from 'react-syntax-highlighter/dist/esm/languages/prism/xml-doc';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from 'react';
import { IoCheckmarkDone } from 'react-icons/io5';
import axios from 'axios';

SyntaxHighlighter.registerLanguage('xml', xml);

import '../styles/header.css';

const downloadURL = 'http://localhost:3000/downloadsrcmlfile';

export default function SrcMLCode({ convertedSrc, reset }) {
  const [copy, setCopy] = useState(false);

  const downloadSrcmlFile = async () => {
    try {
      const response = await axios.get(downloadURL, {
        responseType: 'blob',
      });

      // Check if the 'Content-Disposition' header is present
      if ('content-disposition' in response.headers) {
        const contentDisposition = response.headers['content-disposition'];

        // Extract filename from Content-Disposition header
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        const filename = filenameMatch ? filenameMatch[1] : 'srcmlfile.xml';

        // Create a blob from the response data
        const blob = new Blob([response.data], {
          type: 'application/xml',
        });

        // Create a link to download the blob
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;

        // Trigger a click on the link to start the download
        link.click();
      } else {
        console.error(
          'Error downloading file: Content-Disposition header not found'
        );
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }

    reset();
  };

  return (
    <div className="srcML-container">
      <div className="srcML-codes">
        <div className="button-container">
          <button type="submit" onClick={() => downloadSrcmlFile()}>
            Download Srcml
          </button>
          {copy != true ? (
            <button
              type="submit"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(convertedSrc);

                  setCopy(true);

                  //   alert('Text copied to clipboard:', convertedSrc);
                } catch (error) {
                  alert('Error copying to clipboard:', error);
                }
              }}
            >
              {<FaClipboard size={20} />}
              <span>copy</span>
            </button>
          ) : (
            <span>
              {' '}
              <IoCheckmarkDone size={20} />
              Copied
            </span>
          )}
        </div>

        <SyntaxHighlighter
          language="xml"
          showLineNumbers="true"
          style={dracula}
          customStyle={{ margin: '0', paddingLeft: 0 }}
        >
          {convertedSrc}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

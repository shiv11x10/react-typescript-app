import { useRef, useEffect } from "react";
import "./preview.css";

interface PreviewProps {
  code: string;
}

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();

  // To reset iframe on each execution

  useEffect(() => {
    iframe.current.srcdoc = html;
    // adding setTimeout so that iframe gets time to set srcDoc
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        ref={iframe}
        title="iFrame1"
        sandbox="allow-scripts"
        srcDoc={html}
      />
    </div>
  );
};

const html = `
    <html>
        <head>
          <style>html { background-color: white; }</style>
        </head>
        <body>
            <div id="root"></div>
            <script>
                window.addEventListener('message', (event) => {
                    try {
                        eval(event.data);
                    } catch (err) {
                        const root = document.querySelector('#root');
                        root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>'
                        console.error(err);    
                    }
                }, false);
            </script>
        </body>
    </html>
  `;

export default Preview;
